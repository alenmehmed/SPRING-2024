# Alen Mehmedbegovic - Feburary 1st, 2024
# CMPT 365 - question 1

import tkinter
import struct
import os
import io
from tkinter import *
from tkinter.filedialog import askopenfile
from tkinter.filedialog import askopenfilename

filename = ""

window = tkinter.Tk()
window.geometry("500x500")

text = Text(window)

def openfileExec():
   global filename
   filename = askopenfilename()

   if filename:   # Check for empty string
      file = open(filename, 'rb')
      file.read(4)   # RIFF
      file.read(4)   # ChunkSize
      file.read(4)   # WAVE
      file.read(4)   # fmt[]
      file.read(4)   # SubchunksizeSize
      file.read(4)   # Audio format (1) and Num channels (2)

      # Also show the total number of the samples and sampling frequency on the screen  
      # Sampling frequency   
      samprate = struct.unpack('<I', file.read(4))[0] # This is needed to convert cp1252 to decimal
      text.insert(INSERT, "Sampling rate: ")
      text.insert(INSERT, samprate)
      text.insert(INSERT, "\n")

      file.read(4)   # ByteRate
      file.read(2)   # BlockAlign

      # Number of samples
      # NumSamples = NumBytes / (NumChannels * BitsPerSample / 8)
      bitspersample = struct.unpack('<H', file.read(2))[0]   # BitsPerSample
      filestats = os.stat(filename)
      filesize = filestats.st_size
      numofsamples = filesize/(2*bitspersample/8)
      text.insert(INSERT, "Number of samples: ")
      text.insert(INSERT, int(numofsamples))
      text.insert(INSERT, "\n")
      text.pack()


B = Button(window, text = "Open file", command = openfileExec)
B.place(x=225,y=225)

window.mainloop()
