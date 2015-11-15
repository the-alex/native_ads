import os
from os import walk
from PIL import Image
import sys

SIZE = int(sys.argv[1]), int(sys.argv[2])

files = []
for (dirpath, dirnames, filenames) in walk("./"):
    files.extend(filenames)
    break

files.remove("resize.py")

for fileName in files:
    if ".jpg" in fileName:
        im = Image.open(fileName)
        im.thumbnail(SIZE, Image.ANTIALIAS)
        im.save(fileName, "JPEG")
    else:
        continue
