inputtext0 = open(r'q1_(1)_(2)_input_0.txt', 'r').read()
inputtext1 = open(r'q1_(1)_(2)_input_1.txt', 'r').read()
inputtext2 = open(r'q1_(1)_(2)_input_2.txt', 'r').read()
inputtext3 = open(r'q1_(1)_(2)_input_3.txt', 'r').read()

# Question 1 
print("Question 1")
inputlist = [inputtext0, inputtext1, inputtext2, inputtext3]

for inputtext in inputlist:
    low = 0.0
    high = 1.0
    range = high - low
    
    ACounter = inputtext.count('A')
    BCounter = inputtext.count('B')

    AProb = ACounter/(ACounter + BCounter)
    BProb = BCounter/(ACounter + BCounter)

    # CDF of A will be AProb
    # CDF of B will be 1.0

    for character in inputtext:
        if character == 'A':
            range = high - low
            high = low + range*AProb
            low = low + range*0.0
        if character == 'B':
            range = high - low
            high = low + range*1.0
            low = low + range*AProb

    print("For input string ", inputtext)
    print("We have final ranges of low:", low, " high:", high)

# Question 2

print("Question 2")

low = 0.0
high = 1.0
range = high - low

outputlist = [] # put in list to get no new lines in print and have form like example in assignment page

for inputtext in inputlist:
    low = 0.0
    high = 1.0
    range = high - low
    
    ACounter = inputtext.count('A')
    BCounter = inputtext.count('B')

    AProb = ACounter/(ACounter + BCounter)
    BProb = BCounter/(ACounter + BCounter)

    # CDF of A will be AProb
    # CDF of B will be 1.0
    for character in inputtext:
        if character == 'A':
            range = high - low
            high = low + range*AProb
            low = low + range*0.0
        if character == 'B':
            range = high - low
            high = low + range*1.0
            low = low + range*AProb
        
        while(high < 0.5):
            low = 2*low
            high = 2*high
            outputlist += ['E1']
        while(low >= 0.5):
            low = 2*(low - 0.5)
            high = 2*(high - 0.5)
            outputlist += ['E2']
    print("For input string ", inputtext)
    print(outputlist)
 