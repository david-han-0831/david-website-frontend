"""홈 히어로 키캡 모델 → keycaps.glb (Key1u · Key2u)

    blender -b --factory-startup --python motion/keycap/build_keycap.py

1u 키캡 바닥이 1×1, 높이 0.62. 윗면은 앞뒤로 휜 원통형 오목면(OEM 느낌).
메시마다 재질 두 개: Body(옆면) · Top(윗면, 0..1 UV — three.js 에서 글자 텍스처를 입힌다).
좌표: Blender Z 가 위 → glTF 로 내보내면 Y 가 위.
"""
import math
import os

import bmesh
import bpy

here = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(here, "..", "..", "public", "models", "keycaps.glb"))
os.makedirs(os.path.dirname(OUT), exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)


def mat(name):
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except Exception:
        pass
    p = m.node_tree.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (0.9, 0.9, 0.92, 1)
    p.inputs["Roughness"].default_value = 0.35
    return m


BODY, TOP = mat("Body"), mat("Top")


def rrect(w, d, r, seg=6):
    """XY 평면 둥근 사각형 (반시계, 시작점 +X 쪽)"""
    pts = []
    for cx, cy, a0 in ((w / 2 - r, d / 2 - r, 0), (-w / 2 + r, d / 2 - r, 90), (-w / 2 + r, -d / 2 + r, 180), (w / 2 - r, -d / 2 + r, 270)):
        for i in range(seg + 1):
            a = math.radians(a0 + 90 * i / seg)
            pts.append((cx + math.cos(a) * r, cy + math.sin(a) * r))
    return pts


def keycap(name, units):
    W = units  # 바닥 폭 (1u = 1)
    D = 1.0
    H = 0.62
    TW, TD = W - 0.26, 0.74  # 윗면 크기
    TOFF = 0.05  # 윗면을 뒤(+Y)로 살짝 밀어 앞면이 더 기울게
    DISH = 0.045
    RINGS = 2  # 옆면은 곧게

    def dish(y):
        # 앞뒤(Y) 방향으로 휜 원통형 오목면 깊이
        return DISH * (1 - min(1.0, (y / (TD / 2)) ** 2))

    bm = bmesh.new()
    n = len(rrect(W, D, 0.12))
    loops = []
    for k in range(RINGS + 1):
        t = k / RINGS
        e = t  # 곧은 테이퍼
        w = W + (TW - W) * e
        d = D + (TD - D) * e
        r = 0.12 + (0.16 - 0.12) * e
        off = TOFF * e
        z = H * t
        pts = rrect(w, d, r)
        ring = []
        for x, y in pts:
            zz = z
            if k == RINGS:
                # 원통형 오목면: 테두리도 앞뒤 끝은 높고 가운데로 갈수록 내려간다
                zz = H - dish(y)
            ring.append(bm.verts.new((x, y + off, zz)))
        loops.append(ring)
    # 옆면
    for a, b in zip(loops, loops[1:]):
        for i in range(n):
            j = (i + 1) % n
            bm.faces.new((a[i], a[j], b[j], b[i]))
    # 바닥
    bm.faces.new(list(reversed(loops[0])))
    side_faces = list(bm.faces)

    # 윗면: 테두리에서 중심까지 고리를 줄여 가며 오목하게
    top = loops[-1]
    prev = top
    TR = 6
    uv_pts = {}
    for k in range(1, TR + 1):
        s = 1 - k / TR
        ring = []
        for v in top:
            x, y = v.co.x, v.co.y - TOFF
            nx, ny = x * s, y * s
            ring.append(bm.verts.new((nx, ny + TOFF, H - dish(ny))))
        if s == 0:
            centre = ring[0]
            for extra in ring[1:]:
                bm.verts.remove(extra)
            for i in range(n):
                j = (i + 1) % n
                bm.faces.new((prev[i], prev[j], centre))
        else:
            for i in range(n):
                j = (i + 1) % n
                bm.faces.new((prev[i], prev[j], ring[j], ring[i]))
            prev = ring

    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)

    # 재질·UV: 윗면(옆면 목록에 없는 면) = Top
    uv = bm.loops.layers.uv.new("UVMap")
    for f in bm.faces:
        is_top = f not in side_faces
        f.material_index = 1 if is_top else 0
        f.smooth = True
        for loop in f.loops:
            x, y = loop.vert.co.x, loop.vert.co.y - TOFF
            loop[uv].uv = ((x + TW / 2) / TW, (y + TD / 2) / TD) if is_top else ((x + W / 2) / W, loop.vert.co.z / H)

    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    me.materials.append(BODY)
    me.materials.append(TOP)
    obj = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(obj)
    # 윗면 테두리 모서리를 살짝 굴린다
    bev = obj.modifiers.new("edge", "BEVEL")
    bev.width = 0.022
    bev.segments = 3
    bev.limit_method = "ANGLE"
    bev.angle_limit = math.radians(35)
    obj.modifiers.new("wn", "WEIGHTED_NORMAL")
    return obj


k1 = keycap("Key1u", 1)
k2 = keycap("Key2u", 2.25)
k2.location.x = 2.5

bpy.ops.export_scene.gltf(filepath=OUT, export_format="GLB", export_apply=True, export_yup=True,
                          export_texcoords=True, export_normals=True, export_materials="EXPORT")
print("EXPORTED", OUT, os.path.getsize(OUT))
