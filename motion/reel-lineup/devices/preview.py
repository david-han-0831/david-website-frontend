"""기기 모델 미리보기: build_devices.py 실행 후 두 각도에서 렌더 → motion/reel-lineup/out/devices-*.png

    blender -b --factory-startup --python motion/reel-lineup/devices/preview.py
"""
import math
import os

import bpy
from mathutils import Vector

here = os.path.dirname(os.path.abspath(__file__))
exec(open(os.path.join(here, "build_devices.py"), encoding="utf8").read())

out_dir = os.path.join(here, "..", "out")
os.makedirs(out_dir, exist_ok=True)
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x, scene.render.resolution_y = 1600, 900
world = bpy.data.worlds.new("w")
scene.world = world
world.node_tree.nodes["Background"].inputs[0].default_value = (0.02, 0.022, 0.03, 1)

for name, loc, energy, color in (("key", (-4, -7, 6), 1500, (1, 1, 1)), ("rim", (6, 5, 3), 900, (0.45, 0.55, 1)), ("top", (0, 0, 8), 500, (1, 1, 1))):
    light = bpy.data.lights.new(name, "AREA")
    light.energy, light.color, light.size = energy, color, 5
    obj = bpy.data.objects.new(name, light)
    obj.location = loc
    obj.rotation_euler = (Vector((0, 0, 1)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    scene.collection.objects.link(obj)

cam = bpy.data.objects.new("cam", bpy.data.cameras.new("cam"))
cam.data.lens = 40
scene.collection.objects.link(cam)
scene.camera = cam
for label, (yaw, pitch, dist) in {"front": (-15, 14, 13), "high": (25, 35, 12)}.items():
    y, p = math.radians(yaw), math.radians(pitch)
    cam.location = (math.sin(y) * math.cos(p) * dist, -math.cos(y) * math.cos(p) * dist, 1 + math.sin(p) * dist)
    cam.rotation_euler = (Vector((0, 0, 1.1)) - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = os.path.join(out_dir, f"devices-{label}.png")
    bpy.ops.render.render(write_still=True)
    print("RENDERED", scene.render.filepath)
