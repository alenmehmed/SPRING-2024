import numpy as np
import math

# From COLab 
def a(i, N):
    if i == 0:
        return math.sqrt(1/N)
    else:
        return math.sqrt(2/N)

def get_DCT_matrix(N):
    matrix = np.zeros((N, N))
    # Definition for each entry in the DCT transform matrix
    for i in range(N):
        for j in range(N):
            matrix[i, j] = a(i, N) * math.cos( ((2*j+1)*i*math.pi)/(2*N) )
    return matrix

inputtext0DCT = open(r'q2_(1)_input_0.txt', 'r').read()
inputtext1DCT = open(r'q2_(1)_input_1.txt', 'r').read()
inputtext2DCT = open(r'q2_(1)_input_2.txt', 'r').read()

# Question 1 
print("Question 1")
inputlistDCT = [inputtext0DCT, inputtext1DCT, inputtext2DCT]

for inputtextDCT in inputlistDCT:
    print("For input N =", inputtextDCT, "DCT matrix is")
    print(get_DCT_matrix(N=int(inputtextDCT)))


inputtext0vector = open(r'q2_(2)_input_0.txt', 'r').read()
inputtext1vector = open(r'q2_(2)_input_1.txt', 'r').read()
inputtext2vector = open(r'q2_(2)_input_2.txt', 'r').read()

# Question 2 
print("Question 2")
inputlistvector = [inputtext0vector, inputtext1vector, inputtext2vector]

for inputtextvector in inputlistvector:
    # Need to get inputtextvector into a vector form for numpy matrix multipilcation
    inputtextvectornosquare = inputtextvector.replace('[','').replace(']','') # Remove square brackets
    inputvector = list(map(int, inputtextvectornosquare.split(","))) # Map to integer list 
    size = len(inputvector)

    print("For input vector =", inputvector, "of size N =",size,"DCT transform result is")
    dct_matrix = get_DCT_matrix(N=size)
    x = np.array(inputvector, dtype=float)
    transformed = dct_matrix @ x.T  
    print(np.round(transformed, 2))


# Question 3
print("Question 3")

highfreqvector = np.array([0, 1, 0, -1, 0, 1, 0, -1])
print("For high freq input vector =", highfreqvector, "of size N = 8 DCT transform result is")
dct_matrix = get_DCT_matrix(N=8)
transformed = dct_matrix @ highfreqvector.T
print(np.round(transformed, 2))