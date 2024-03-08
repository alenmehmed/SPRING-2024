import numpy as np

inputtext = open(r'q2_input.txt', 'r').read()
splitnewline  = inputtext.split('\n')
length = len(splitnewline)

# New half tone dithered matrix will be 2*length dim, ordered will be length 

# print(splitnewline[1].split(','))

# Get image matrix in array
image = np.diag(range(length)) # matrix of appropiate size 


for i in range(0, length):
    splitrow = splitnewline[i].split(',')
    for j in range(0, length):
        image[i,j] = splitrow[j]

# Image is in array now 
# Get dither matrix
dither = np.array([[0,3],[2,1]])

# Half-tone dither
hfdithered = np.diag(range(2*length)) # matrix of appropiate size 

for i in range(0, length*2, 2):
    for j in range(0, length*2, 2):
        hfditheredtopleft = dither[0,0] < image[i//2, j//2]
        hfdithered[i, j] = int(hfditheredtopleft)
        hfditheredtopright = dither[0,1] < image[i//2, j//2]
        hfdithered[i + 1, j] = int(hfditheredtopright)
        hfditheredbottomleft = dither[1,0] < image[i//2, j//2]
        hfdithered[i, j + 1] = int(hfditheredbottomleft)
        hfditheredbottomright = dither[1,1] < image[i//2, j//2]
        hfdithered[i + 1, j + 1] = int(hfditheredbottomright)

print("Half tone dither: ")
print(hfdithered)

# Ordered dither 
orderdither = np.diag(range(length))
print("\n Ordered dither: ")
for x in range(0, length):
    for y in range(0, length):
        i = x % 2
        j = y % 2
        if(image[x, y] > dither[i, j]): 
            orderdither[x, y] = 1
        else: 
            orderdither[x, y] = 0

print(orderdither)