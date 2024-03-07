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

OccuranceArray = [Acount, Bcount, Ccount, Dcount, Ecount]
ProbabilityArray = [Acount/len(inputtext), Bcount/len(inputtext), Ccount/len(inputtext), Dcount/len(inputtext), Ecount/len(inputtext)]
