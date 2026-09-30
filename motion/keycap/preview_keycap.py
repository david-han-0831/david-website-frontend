"""키캡 미리보기 렌더 → motion/out 이 아닌 이 폴더의 _preview.png (git 제외 아님, 확인 후 지울 것)"""
import math, os, bpy
from mathutils import Vector
here = os.path.dirname(os.path.abspath(__file__))
exec(open(os.path.join(here, "build_keycap.py"), encoding="utf8").read())
scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE"
scene.render.resolution_x, scene.render.resolution_y = 1400, 800
w = bpy.data.worlds.new("w"); scene.world = w
w.node_tree.nodes["Background"].inputs[0].default_value = (0.8, 0.82, 0.86, 1)
for name, loc, e in (("k", (-3, -4, 5), 800), ("r", (4, 3, 3), 400)):
    l = bpy.data.lights.new(name, "AREA"); l.energy, l.size = e, 3
    o = bpy.data.objects.new(name, l); o.location = loc
    o.rotation_euler = (Vector((1.2, 0, 0.3)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    scene.collection.objects.link(o)
cam = bpy.data.objects.new("c", bpy.data.cameras.new("c")); cam.data.lens = 60
scene.collection.objects.link(cam); scene.camera = cam
cam.location = (1.4, -5.2, 3.6)
cam.rotation_euler = (Vector((1.3, 0, 0.25)) - cam.location).to_track_quat("-Z", "Y").to_euler()
scene.render.filepath = os.path.join(os.environ.get("TEMP", here), "keycap_preview.png")
bpy.ops.render.render(write_still=True)
print("RENDERED", scene.render.filepath)
