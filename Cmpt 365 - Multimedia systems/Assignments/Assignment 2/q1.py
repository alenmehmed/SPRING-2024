inputtext = open(r'q1_input.txt', 'r').read()

# Input Y, Co and Cg individually 
YCoCgstring = inputtext.split(',')
YCoCg = [0, 0, 0]
for i in range(3):
    YCoCg[i] = int(YCoCgstring[i])

# Translate to RGB, use lower case as RGB is protected python constant
rgb = [0, 0, 0]
# R = Y + Co - Cg
rgb[0] = YCoCg[0] + YCoCg[1] - YCoCg[2]
# G = Y + Cg
rgb[1] = YCoCg[0] + YCoCg[2]
# B = Y - Co - Cg 
rgb[2] = YCoCg[0] - YCoCg[1] - YCoCg[2]

# Now that we have the RGB value, we can convert to YUV
yuv = [0, 0, 0]
# Y = 0.299*R + 0.587*G + 0.114*B 
yuv[0] = int(0.299*rgb[0] + 0.587*rgb[1] + 0.114*rgb[2])
# U = -0.299*R - 0.587*G + 0.886*B 
yuv[1] = int(-0.299*rgb[0] - 0.587*rgb[1] + 0.886*rgb[2])
# V = 0.701*R - 0.587*G - 0.114*B 
yuv[2] = int(0.701*rgb[0] - 0.587*rgb[1] - 0.114*rgb[2])

print(yuv)