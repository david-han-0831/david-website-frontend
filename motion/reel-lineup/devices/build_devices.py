"""Lineup 릴용 기기 모델 (노트북 · POS 태블릿 · 모니터) → devices.glb

    blender -b --factory-startup --python motion/reel-lineup/devices/build_devices.py

단위는 휴대폰 릴과 같다 (휴대폰 높이 1.6). 바닥이 Z=0.
최상위 빈 오브젝트 이름(Laptop · Tablet · Monitor)으로 three.js 에서 찾고,
각 기기의 화면 메시는 <기기>Screen 이름에 0..1 UV 를 가진다.
"""
import math
import os
import sys

import bpy

here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(here, "..", "..")))
import blender_kit as K  # noqa: E402

K.reset()
OUT = os.path.join(here, "devices.glb")

M = {
    "alu": K.material("Aluminium", "#8a8f99", metallic=1.0, roughness=0.3),
    "alu_dark": K.material("AluminiumDark", "#3b3f48", metallic=1.0, roughness=0.34),
    "bezel": K.material("Bezel", "#050507", roughness=0.05, coat=1.0),
    "screen": K.material("Screen", "#0b0d12", roughness=0.1),
    "key": K.material("Key", "#15171c", roughness=0.55),
    "well": K.material("KeyWell", "#0c0d10", roughness=0.7),
    "pad": K.material("Trackpad", "#2a2e36", roughness=0.25, coat=0.5),
    "matte": K.material("MatteBack", "#16181d", metallic=0.2, roughness=0.6),
    "cam": K.material("Webcam", "#000000", roughness=0.1, coat=1.0),
}

# ── 노트북 (16:10, 뚜껑 108° 열림) ────────────────────
LW, LD, LT = 3.0, 2.05, 0.07  # 폭 · 깊이 · 바닥 두께
laptop = K.empty("Laptop")
K.slab("LaptopBase", LW, LD, 0.1, 0, LT, M["alu"], plane="XY", parent=laptop, bevel=0.012)
K.panel("LaptopWell", 2.62, 0.98, 0.05, LT + 0.0006, M["well"], plane="XY", facing=1, parent=laptop, center=(0, 0.42))
key_mesh = K.box("_key", (0.155, 0.155, 0.012), (0, 0, 0), M["key"], bevel=0.02).data
for row in range(5):
    for col in range(14):
        k = bpy.data.objects.new(f"Key{row}_{col}", key_mesh)
        k.location = (-1.27 + col * 0.1955, 0.8 - row * 0.185, LT + 0.006)
        bpy.context.scene.collection.objects.link(k)
        k.parent = laptop
bpy.data.objects.remove(bpy.data.objects["_key"])
K.panel("LaptopTrackpad", 1.1, 0.62, 0.05, LT + 0.0006, M["pad"], plane="XY", facing=1, parent=laptop, center=(0, -0.5))

# 뚜껑: 경첩(바닥 뒤쪽 윗모서리)을 원점으로 세운 뒤 뒤로 18° 젖힌다
lid = K.empty("LaptopLid", loc=(0, LD / 2 - 0.04, LT), rot=(math.radians(-18), 0, 0), parent=laptop)
LH, LLT = 1.95, 0.035
K.slab("LaptopShell", LW, LH, 0.1, -LLT / 2, LLT / 2, M["alu"], plane="XZ", parent=lid, bevel=0.008, center=(0, LH / 2))
K.panel("LaptopBezel", LW - 0.02, LH - 0.02, 0.09, -LLT / 2 - 0.0006, M["bezel"], plane="XZ", parent=lid, center=(0, LH / 2))
K.panel("LaptopScreen", 2.84, 1.775, 0.03, -LLT / 2 - 0.0012, M["screen"], plane="XZ", uv=True, parent=lid, center=(0, LH / 2 + 0.03))
K.cylinder("LaptopWebcam", 0.012, 0.002, (0, -LLT / 2 - 0.0014, LH - 0.045), M["cam"], parent=lid, verts=16)

# ── POS 태블릿 (가로, 스탠드에 거치) ───────────────────
tablet = K.empty("Tablet")
K.cylinder("TabletStandBase", 0.42, 0.045, (0, 0.1, 0.0225), M["alu_dark"], axis="Z", parent=tablet)
K.box("TabletStandNeck", (0.14, 0.09, 0.62), (0, 0.16, 0.33), M["alu_dark"], parent=tablet, bevel=0.03)
tab = K.empty("TabletBody", loc=(0, 0.1, 0.62), rot=(math.radians(-16), 0, 0), parent=tablet)
TW, TH, TT = 2.3, 1.58, 0.06
K.slab("TabletShell", TW, TH, 0.12, -TT / 2, TT / 2, M["alu"], plane="XZ", parent=tab, bevel=0.01)
K.panel("TabletBezel", TW - 0.012, TH - 0.012, 0.114, -TT / 2 - 0.0006, M["bezel"], plane="XZ", parent=tab)
K.panel("TabletScreen", 2.16, 1.44, 0.07, -TT / 2 - 0.0012, M["screen"], plane="XZ", uv=True, parent=tab)

# ── 모니터 (얇은 베젤, 스탠드) ──────────────────────
monitor = K.empty("Monitor")
K.slab("MonitorFoot", 1.15, 0.72, 0.16, 0, 0.04, M["alu"], plane="XY", parent=monitor, bevel=0.01, center=(0, 0.12))
K.box("MonitorNeck", (0.34, 0.08, 1.05), (0, 0.3, 0.55), M["alu"], parent=monitor, bevel=0.03)
MW, MH, MT, MZ = 3.6, 2.15, 0.05, 0.5
K.slab("MonitorPanel", MW, MH, 0.04, -MT / 2, MT / 2, M["matte"], plane="XZ", parent=monitor, bevel=0.006, center=(0, MZ + MH / 2))
K.panel("MonitorBezel", MW - 0.006, MH - 0.006, 0.037, -MT / 2 - 0.0006, M["bezel"], plane="XZ", parent=monitor, center=(0, MZ + MH / 2))
K.panel("MonitorScreen", 3.52, 1.98, 0.012, -MT / 2 - 0.0012, M["screen"], plane="XZ", uv=True, parent=monitor, center=(0, MZ + MH / 2 + 0.035))

# 기기끼리 겹치지 않게 벌려 둔다 (배치는 three.js 에서 다시 잡는다)
laptop.location.x, tablet.location.x, monitor.location.x = -4, 0, 4

K.export_glb(OUT)
print("EXPORTED", OUT, os.path.getsize(OUT))
