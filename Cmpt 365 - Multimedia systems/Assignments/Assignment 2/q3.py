import math

inputtext = open(r'q3_input.txt', 'r').read()

Acount = 0
Bcount = 0
Ccount = 0
Dcount = 0
Ecount = 0

for i in range(len(inputtext)):
    if(inputtext[i] == 'A'):
        Acount = Acount + 1
    if(inputtext[i] == 'B'):
        Bcount = Bcount + 1
    if(inputtext[i] == 'C'):
        Ccount = Ccount + 1
    if(inputtext[i] == 'D'):
        Dcount = Dcount + 1
    if(inputtext[i] == 'E'):
        Ecount = Ecount + 1

ProbabilityArray = [Acount/len(inputtext), Bcount/len(inputtext), Ccount/len(inputtext), Dcount/len(inputtext), Ecount/len(inputtext)]


firstorderEntropy = 0

for i in range(0, 4):
    if (ProbabilityArray[i] != 0.0): # We need this if as math.log2(0) breaks it 
        firstorderEntropy = firstorderEntropy - (ProbabilityArray[i])*(math.log2(ProbabilityArray[i]))
    
print("First order entropy:",firstorderEntropy, "\n")

# For second order entropy we need joint prob distribution, so let's make a 2D list
   
JointProbabilityArray = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0],  [0, 0, 0, 0, 0],  [0, 0, 0, 0, 0],  [0, 0, 0, 0, 0]] # Initalize for all zeros 

for i in range(0,4):
    for j in range(0,4):
        JointProbabilityArray[i][j] = ProbabilityArray[i]*ProbabilityArray[j]

# Now calculate second order entropy 
secondorderEntropy = 0
for i in range(0, 4):
    for j in range(0,4):
        if (JointProbabilityArray[i][j] != 0.0): # We need this if as math.log2(0) breaks it 
            secondorderEntropy = secondorderEntropy - (JointProbabilityArray[i][j])*(math.log2(JointProbabilityArray[i][j]))

print("Second order entropy:",secondorderEntropy, "\n")

# Per symbol is char so 1 byte per symbol, 8 bits per symbol for each A to E

AveragecodewordLength = 0

for i in range(0, 4):
    AveragecodewordLength += 8*ProbabilityArray[i]

print("Average single Codeword length:", AveragecodewordLength, "bits per symbol \n")

# Now for dual symbol, our probabilities have changed. We now have 25 symbols 

AAcount = 0
ABcount = 0
ACcount = 0
ADcount = 0
AEcount = 0
BAcount = 0
BBcount = 0
BCcount = 0
BDcount = 0
BEcount = 0
CAcount = 0
CBcount = 0
CCcount = 0
CDcount = 0
CEcount = 0
DAcount = 0
DBcount = 0
DCcount = 0
DDcount = 0
DEcount = 0
EAcount = 0
EBcount = 0
ECcount = 0
EDcount = 0
EEcount = 0

for i in range(len(inputtext) - 1): 
    if inputtext[i] == 'A':
        if inputtext[i + 1] == 'A':
            AAcount += 1
        elif inputtext[i + 1] == 'B':
            ABcount += 1
        elif inputtext[i + 1] == 'C':
            ACcount += 1
        elif inputtext[i + 1] == 'D':
            ADcount += 1
        elif inputtext[i + 1] == 'E':
            AEcount += 1

    elif inputtext[i] == 'B':
        if inputtext[i + 1] == 'A':
            BAcount += 1
        elif inputtext[i + 1] == 'B':
            BBcount += 1
        elif inputtext[i + 1] == 'C':
            BCcount += 1
        elif inputtext[i + 1] == 'D':
            BDcount += 1
        elif inputtext[i + 1] == 'E':
            BEcount += 1

    elif inputtext[i] == 'C':
        if inputtext[i + 1] == 'A':
            CAcount += 1
        elif inputtext[i + 1] == 'B':
            CBcount += 1
        elif inputtext[i + 1] == 'C':
            CCcount += 1
        elif inputtext[i + 1] == 'D':
            CDcount += 1
        elif inputtext[i + 1] == 'E':
            CEcount += 1

    elif inputtext[i] == 'D':
        if inputtext[i + 1] == 'A':
            DAcount += 1
        elif inputtext[i + 1] == 'B':
            DBcount += 1
        elif inputtext[i + 1] == 'C':
            DCcount += 1
        elif inputtext[i + 1] == 'D':
            DDcount += 1
        elif inputtext[i + 1] == 'E':
            DEcount += 1

    elif inputtext[i] == 'E':
        if inputtext[i + 1] == 'A':
            EAcount += 1
        elif inputtext[i + 1] == 'B':
            EBcount += 1
        elif inputtext[i + 1] == 'C':
            ECcount += 1
        elif inputtext[i + 1] == 'D':
            EDcount += 1
        elif inputtext[i + 1] == 'E':
            EEcount += 1
        
# Total amount of pairs will be len(inputtext) - 1

DualProbabilityArray = [[AAcount/(len(inputtext) - 1), ABcount/(len(inputtext) - 1), ACcount/(len(inputtext) - 1), ADcount/(len(inputtext) - 1), AEcount/(len(inputtext) - 1)],
                        [BAcount/(len(inputtext) - 1), BBcount/(len(inputtext) - 1), BCcount/(len(inputtext) - 1), BDcount/(len(inputtext) - 1), BEcount/(len(inputtext) - 1)],
                        [CAcount/(len(inputtext) - 1), CBcount/(len(inputtext) - 1), CCcount/(len(inputtext) - 1), CDcount/(len(inputtext) - 1), CEcount/(len(inputtext) - 1)],
                        [DAcount/(len(inputtext) - 1), DBcount/(len(inputtext) - 1), DCcount/(len(inputtext) - 1), DDcount/(len(inputtext) - 1), DEcount/(len(inputtext) - 1)],
                        [EAcount/(len(inputtext) - 1), EBcount/(len(inputtext) - 1), ECcount/(len(inputtext) - 1), EDcount/(len(inputtext) - 1), EEcount/(len(inputtext) - 1)]]

# Now that we have our dual symbol probability array, we can estimate the two symbol joint huffman coding average codeword length
# Two characters is 2 bytes or 16 bits

AveragedualcodewordLength = 0 

for i in range(0,4):
    for j in range(0,4):
        AveragedualcodewordLength += 16*DualProbabilityArray[i][j]

print("Average dual Codeword length:", AveragedualcodewordLength, "bits per symbol \n")


# Number 3: Because the probabilities of each symbol (for single and dual) all add up to 1, the average codeword length will always be the bits of the char's needed to represent the symbol
# As the codeword length calculation will sum all the probabilites multiplied by the bits needed for the amount of chars used. 
# Another observation is that since the input string will always be length 2, our implementation that reads it from left to right will also be the same reading it from right to left
# as because there are only even strings, there will never be a character cut off with an odd length string. So all possible dual symbols remain the same. 
