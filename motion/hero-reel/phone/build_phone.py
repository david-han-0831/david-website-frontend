"""히어로 릴용 휴대폰 모델을 Blender 로 만들어 GLB 로 내보낸다.

    blender -b --factory-startup --python motion/hero-reel/phone/build_phone.py

치수는 릴 장면 단위(폭 0.78 · 높이 1.6 · 두께 0.085)와 같다.
Blender 는 Z 가 위이므로 높이를 Z, 두께를 Y 로 두고 앞면이 -Y 를 보게 만든다.
glTF 로 내보내면 Y 가 위, 앞면이 +Z 가 되어 three.js 장면과 방향이 맞는다.

오브젝트 이름이 곧 역할이다 (three.js 에서 이름으로 찾는다):
  Frame · FrontGlass · Screen · Island · BackGlass · CameraBump · Lens* · Flash · Buttons · Ports
"""
import math
import os

import bmesh
import bpy

W, H, D, R = 0.78, 1.6, 0.085, 0.12
SCR_W, SCR_H, SCR_R = 0.72, 1.54, 0.095
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "phone.glb")

# ── 초기화 ───────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def material(name, color, metallic=0.0, roughness=0.5, coat=0.0, emission=None):
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*color, 1)
    p.inputs["Metallic"].default_value = metallic
    p.inputs["Roughness"].default_value = roughness
    p.inputs["Coat Weight"].default_value = coat
    if emission:
        p.inputs["Emission Color"].default_value = (*emission, 1)
        p.inputs["Emission Strength"].default_value = 1.0
    return m


def srgb(hex_):
    """#rrggbb → 선형 RGB (Blender 색 입력은 선형)"""
    c = [int(hex_[i:i + 2], 16) / 255 for i in (1, 3, 5)]
    return tuple(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c)


MAT = {
    "titanium": material("Titanium", srgb("#4a4e58"), metallic=1.0, roughness=0.26),
    "front": material("FrontGlass", srgb("#050507"), roughness=0.04, coat=1.0),
    "screen": material("Screen", srgb("#0b0d12"), roughness=0.1),
    "island": material("Island", srgb("#000000"), roughness=0.2),
    "back": material("BackGlass", srgb("#23262e"), roughness=0.42, coat=0.3),
    "bump": material("BumpGlass", srgb("#2a2d35"), roughness=0.18, coat=1.0),
    "lens": material("LensGlass", srgb("#020204"), roughness=0.02, coat=1.0),
    "ring": material("LensRing", srgb("#6b7080"), metallic=1.0, roughness=0.18),
    "flash": material("Flash", srgb("#f3eee0"), roughness=0.3),
    "port": material("Port", srgb("#050506"), roughness=0.6),
}


def link(obj, mat):
    obj.data.materials.clear()
    obj.data.materials.append(mat)
    scene.collection.objects.link(obj)
    return obj


def rounded_rect(w, h, r, seg=16):
    """XZ 평면의 둥근 사각형 꼭짓점 (반시계)"""
    pts = []
    for cx, cz, a0 in ((w / 2 - r, h / 2 - r, 0), (-w / 2 + r, h / 2 - r, 90), (-w / 2 + r, -h / 2 + r, 180), (w / 2 - r, -h / 2 + r, 270)):
        for i in range(seg + 1):
            a = math.radians(a0 + 90 * i / seg)
            pts.append((cx + math.cos(a) * r, cz + math.sin(a) * r))
    return pts


def slab(name, w, h, r, y0, y1, mat, seg=16, bevel=0.0, bevel_seg=3):
    """둥근 사각형을 Y 방향으로 y0 → y1 만큼 두께를 준 판"""
    bm = bmesh.new()
    outline = rounded_rect(w, h, r, seg)
    front = bm.faces.new([bm.verts.new((x, y0, z)) for x, z in outline])
    ext = bmesh.ops.extrude_face_region(bm, geom=[front])
    moved = [e for e in ext["geom"] if isinstance(e, bmesh.types.BMVert)]
    bmesh.ops.translate(bm, verts=moved, vec=(0, y1 - y0, 0))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    obj = bpy.data.objects.new(name, me)
    if bevel:
        mod = obj.modifiers.new("bevel", "BEVEL")
        mod.width = bevel
        mod.segments = bevel_seg
        mod.limit_method = "ANGLE"
        mod.angle_limit = math.radians(40)
    for p in me.polygons:
        p.use_smooth = True
    return link(obj, mat)


def panel(name, w, h, r, y, mat, facing=-1, uv=False):
    """얇은 판 한 장 (facing=-1 이면 앞(-Y), +1 이면 뒤)"""
    bm = bmesh.new()
    pts = rounded_rect(w, h, r, 16)
    if facing > 0:
        pts = pts[::-1]
    face = bm.faces.new([bm.verts.new((x, y, z)) for x, z in pts])
    # 면 법선이 facing 방향을 보도록
    bm.normal_update()
    if (face.normal.y > 0) != (facing > 0):
        face.normal_flip()
    if uv:
        layer = bm.loops.layers.uv.new("UVMap")
        for loop in face.loops:
            x, _, z = loop.vert.co
            loop[layer].uv = ((x + w / 2) / w, (z + h / 2) / h)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    return link(bpy.data.objects.new(name, me), mat)


def rounded_box(name, size, loc, radius, mat, seg=4):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = size
    bpy.ops.object.transform_apply(scale=True)
    mod = obj.modifiers.new("round", "BEVEL")
    mod.width = radius
    mod.segments = seg
    for p in obj.data.polygons:
        p.use_smooth = True
    obj.data.materials.append(mat)
    return obj


def cylinder(name, r, depth, loc, mat, verts=48):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc, rotation=(math.radians(90), 0, 0))
    obj = bpy.context.active_object
    obj.name = name
    for p in obj.data.polygons:
        p.use_smooth = True
    obj.data.materials.append(mat)
    return obj


FY, BY = -D / 2, D / 2  # 앞면 · 뒷면 Y

# ── 본체 ─────────────────────────────────────────
slab("Frame", W, H, R, FY, BY, MAT["titanium"], bevel=0.007)
panel("FrontGlass", W - 0.012, H - 0.012, R - 0.006, FY - 0.0006, MAT["front"])
panel("Screen", SCR_W, SCR_H, SCR_R, FY - 0.0012, MAT["screen"], uv=True)
# 얇은 형상은 베벨이 두께에 막혀 둥글어지지 않으므로 둥근 윤곽으로 직접 만든다
island = panel("Island", 0.19, 0.052, 0.026, FY - 0.0018, MAT["island"])
island.location.z = SCR_H / 2 - 0.058
panel("BackGlass", W - 0.012, H - 0.012, R - 0.006, BY + 0.0006, MAT["back"], facing=1)

# ── 카메라 범프 (뒷면 위쪽, 앞에서 보면 오른쪽 위) ─────────
bx, bz = W / 2 - 0.21, H / 2 - 0.21
bump = slab("CameraBump", 0.34, 0.34, 0.075, BY, BY + 0.012, MAT["bump"], bevel=0.004)
bump.location = (bx, 0, bz)
for i, (dx, dz) in enumerate(((-0.075, 0.075), (-0.075, -0.075), (0.075, 0.0))):
    cylinder(f"LensRing{i}", 0.058, 0.016, (bx + dx, BY + 0.014, bz + dz), MAT["ring"])
    cylinder(f"Lens{i}", 0.044, 0.018, (bx + dx, BY + 0.016, bz + dz), MAT["lens"])
cylinder("Flash", 0.016, 0.004, (bx + 0.075, BY + 0.013, bz + 0.1), MAT["flash"], verts=24)

# ── 측면 버튼 ────────────────────────────────────
side = W / 2 + 0.002
rounded_box("ButtonPower", (0.012, 0.03, 0.2), (side, 0, 0.26), 0.006, MAT["titanium"])
rounded_box("ButtonVolUp", (0.012, 0.03, 0.12), (-side, 0, 0.36), 0.006, MAT["titanium"])
rounded_box("ButtonVolDown", (0.012, 0.03, 0.12), (-side, 0, 0.2), 0.006, MAT["titanium"])
rounded_box("ButtonAction", (0.012, 0.03, 0.06), (-side, 0, 0.52), 0.006, MAT["titanium"])

# ── 하단 포트 · 스피커 ─────────────────────────────
bottom = -H / 2 - 0.0015
rounded_box("PortUSB", (0.1, 0.03, 0.006), (0, 0, bottom), 0.0029, MAT["port"])
for i in range(6):
    for sx in (-1, 1):
        bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.0065, depth=0.004, location=(sx * (0.12 + i * 0.022), 0, bottom))
        h = bpy.context.active_object
        h.name = f"Speaker{sx}_{i}"
        h.data.materials.append(MAT["port"])

# ── 내보내기 ─────────────────────────────────────
bpy.ops.export_scene.gltf(
    filepath=OUT,
    export_format="GLB",
    export_apply=True,
    export_yup=True,
    export_texcoords=True,
    export_normals=True,
    export_materials="EXPORT",
)
print("EXPORTED", OUT, os.path.getsize(OUT))
