"""모델 확인용 미리보기: build_phone.py 로 모델을 만든 뒤 세 각도에서 렌더한다.

    blender -b --factory-startup --python motion/hero-reel/phone/preview.py

결과: motion/hero-reel/out/phone-*.png
"""
import math
import os

import bpy
from mathutils import Vector

here = os.path.dirname(os.path.abspath(__file__))
exec(open(os.path.join(here, "build_phone.py"), encoding="utf8").read())

out_dir = os.path.join(here, "..", "out")
os.makedirs(out_dir, exist_ok=True)
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x, scene.render.resolution_y = 1200, 1200
scene.render.film_transparent = False

world = bpy.data.worlds.new("w")
scene.world = world
try:
    world.use_nodes = True
except Exception:
    pass
world.node_tree.nodes["Background"].inputs[0].default_value = (0.02, 0.022, 0.03, 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 1.0

for name, loc, energy, color in (("key", (-2, -3, 3), 400, (1, 1, 1)), ("rim", (3, 2, 1.5), 300, (0.45, 0.55, 1)), ("top", (0, 0, 4), 150, (1, 1, 1))):
    light = bpy.data.lights.new(name, "AREA")
    light.energy, light.color, light.size = energy, color, 2.5
    obj = bpy.data.objects.new(name, light)
    obj.location = loc
    obj.rotation_euler = (Vector((0, 0, 0)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    scene.collection.objects.link(obj)

cam_data = bpy.data.cameras.new("cam")
cam_data.lens = 70
cam = bpy.data.objects.new("cam", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam

for label, (yaw, pitch, dist) in {"front": (-20, 8, 4.6), "side": (-70, 5, 4.2), "back": (150, 12, 4.6), "bottom": (-25, -35, 3.2)}.items():
    y, p = math.radians(yaw), math.radians(pitch)
    # 앞면이 -Y 이므로 yaw 0 이 정면
    cam.location = (math.sin(y) * math.cos(p) * dist, -math.cos(y) * math.cos(p) * dist, math.sin(p) * dist)
    target = Vector((0, 0, -0.55 if label == "bottom" else 0))
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(out_dir, f"phone-{label}.png")
    bpy.ops.render.render(write_still=True)
    print("RENDERED", scene.render.filepath)
