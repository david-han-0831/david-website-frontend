"""모션 릴 기기 모델용 Blender 헬퍼 (Blender 5 헤드리스에서 import 해서 쓴다).

좌표 약속: Blender 는 Z 가 위, 기기 앞면은 -Y 를 본다.
glTF 로 내보내면 Y 가 위, 앞면이 +Z 가 되어 three.js 장면과 방향이 맞는다.
"""
import math

import bmesh
import bpy


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def srgb(hex_):
    """#rrggbb → 선형 RGB (Blender 색 입력은 선형)"""
    c = [int(hex_[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return tuple(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c)


def material(name, hex_, metallic=0.0, roughness=0.5, coat=0.0):
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*srgb(hex_), 1)
    p.inputs["Metallic"].default_value = metallic
    p.inputs["Roughness"].default_value = roughness
    p.inputs["Coat Weight"].default_value = coat
    return m


def rounded_rect(w, h, r, seg=16):
    """중심 기준 둥근 사각형 꼭짓점 (반시계, 2D)"""
    pts = []
    for cx, cy, a0 in ((w / 2 - r, h / 2 - r, 0), (-w / 2 + r, h / 2 - r, 90), (-w / 2 + r, -h / 2 + r, 180), (w / 2 - r, -h / 2 + r, 270)):
        for i in range(seg + 1):
            a = math.radians(a0 + 90 * i / seg)
            pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
    return pts


def _to3(p, plane, depth):
    a, b = p
    return (a, depth, b) if plane == "XZ" else (a, b, depth)


def _finish(name, bm, mat, parent, bevel=0.0, smooth=True):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    if bevel:
        mod = obj.modifiers.new("bevel", "BEVEL")
        mod.width = bevel
        mod.segments = 3
        mod.limit_method = "ANGLE"
        mod.angle_limit = math.radians(40)
    for p in me.polygons:
        p.use_smooth = smooth
    me.materials.append(mat)
    bpy.context.scene.collection.objects.link(obj)
    if parent:
        obj.parent = parent
    return obj


def slab(name, w, h, r, d0, d1, mat, plane="XZ", parent=None, bevel=0.0, center=(0, 0)):
    """둥근 사각형 판. plane=XZ 면 세운 판(두께 Y: d0→d1), XY 면 눕힌 판(두께 Z)."""
    bm = bmesh.new()
    pts = [(x + center[0], y + center[1]) for x, y in rounded_rect(w, h, r)]
    face = bm.faces.new([bm.verts.new(_to3(p, plane, d0)) for p in pts])
    ext = bmesh.ops.extrude_face_region(bm, geom=[face])
    moved = [e for e in ext["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=moved, vec=(0, d1 - d0, 0) if plane == "XZ" else (0, 0, d1 - d0))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _finish(name, bm, mat, parent, bevel)


def panel(name, w, h, r, depth, mat, plane="XZ", facing=-1, uv=False, parent=None, center=(0, 0)):
    """얇은 판 한 장. XZ 면 facing -1 이 앞(-Y), XY 면 facing +1 이 위(+Z). uv=True 면 0..1 UV."""
    bm = bmesh.new()
    pts = [(x + center[0], y + center[1]) for x, y in rounded_rect(w, h, r)]
    face = bm.faces.new([bm.verts.new(_to3(p, plane, depth)) for p in pts])
    bm.normal_update()
    axis = 1 if plane == "XZ" else 2
    if (face.normal[axis] > 0) != (facing > 0):
        face.normal_flip()
    if uv:
        layer = bm.loops.layers.uv.new("UVMap")
        for loop in face.loops:
            co = loop.vert.co
            a, b = (co.x, co.z) if plane == "XZ" else (co.x, co.y)
            loop[layer].uv = ((a - center[0] + w / 2) / w, (b - center[1] + h / 2) / h)
    return _finish(name, bm, mat, parent, smooth=False)


def empty(name, loc=(0, 0, 0), rot=(0, 0, 0), parent=None):
    obj = bpy.data.objects.new(name, None)
    obj.location = loc
    obj.rotation_euler = rot
    bpy.context.scene.collection.objects.link(obj)
    if parent:
        obj.parent = parent
    return obj


def box(name, size, loc, mat, parent=None, bevel=0.0):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    for v in bm.verts:
        v.co.x = v.co.x * size[0] + loc[0]
        v.co.y = v.co.y * size[1] + loc[1]
        v.co.z = v.co.z * size[2] + loc[2]
    return _finish(name, bm, mat, parent, bevel)


def cylinder(name, r, depth, loc, mat, axis="Y", parent=None, verts=48):
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r, radius2=r, depth=depth)
    rot = {"Y": ((1, 0, 0), math.radians(90)), "Z": ((0, 0, 1), 0), "X": ((0, 1, 0), math.radians(90))}[axis]
    from mathutils import Matrix
    bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=Matrix.Rotation(rot[1], 3, rot[0]))
    bmesh.ops.translate(bm, verts=bm.verts, vec=loc)
    return _finish(name, bm, mat, parent)


def export_glb(path):
    bpy.ops.export_scene.gltf(filepath=path, export_format="GLB", export_apply=True, export_yup=True,
                              export_texcoords=True, export_normals=True, export_materials="EXPORT")
