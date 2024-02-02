# Alen Mehmedbegovic - Feburary 1st, 2024
# CMPT 365 - question 1

import tkinter
from tkinter import *
from tkinter.filedialog import askopenfile
from tkinter.filedialog import askopenfilename

# import os
# import io

top = tkinter.Tk()
top.geometry("500x500")

def openfileExec():
   filename = askopenfilename()
   print(filename)
   file = open(filename, 'rb')
   print(file.read(4))
   print(file.read(4))
   print(file.read(4))
   print(file.read(4))


B = Button(top, text = "Open file", command = lambda:openfileExec())
B.place(x=225,y=225)

top.mainloop()