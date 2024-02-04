# Alen Mehmedbegovic - Feburary 1st, 2024
# CMPT 365 - question 1

import tkinter
import struct
import os
from tkinter import *
from tkinter.filedialog import askopenfilename

def openfileExec():
   filename = askopenfilename()
   if filename:   # Check for empty string
      file = open(filename, 'rb')
      file.read(4)   # RIFF
      file.read(4)   # ChunkSize
      file.read(4)   # WAVE
      file.read(4)   # fmt[]
      file.read(4)   # SubchunksizeSize
      file.read(4)   # Audio format (1) and Num channels (2)

      # Sampling frequency   
      samprate = struct.unpack('<I', file.read(4))[0] # This struct call is needed to convert cp1252 to decimal
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
      # We have to do some approximating as we might get an odd number
      # Due to floating point and division rounding errors 
      if (int(numofsamples) % 2) == 1: # If odd, decrement by 1 
         # We might miss the last couple samples but we can't increment by 1
         # Or else we would go past the file samples and seg fault 
         numofsamples = numofsamples - 1
      text.insert(INSERT, "Number of samples: ")
      text.insert(INSERT, int(numofsamples))
      text.insert(INSERT, "\n")
      text.pack()

      # Now it's time to plot the waveform
      file.read(4)   # Data subchunk
      file.read(4)   # Subchunk2 size 

      i = 0 
      while i < numofsamples:
         # i will be our x-axis essentially
         # middle of our plot (y-baseline) will be 75, the middle of the canvas plot window
         # waveform will be plotted based on difference from 75 position (practically 0 volume value)

         sample = struct.unpack('<h', file.read(2))[0]
         fittedsample = int((sample / (1 << (bitspersample - 1)))*150) # fit sample to fit in plot window and multiply by 150 for upscaling y axis
         PlotC1.create_line(int(i/33), 75, int(i/33), 75 - fittedsample, fill = "white") # divide by 33 for x axis scaling 
         PlotC2.create_line(int(i/33), 75, int(i/33), 75 - fittedsample, fill = "white")

         i += 1
      PlotC1.pack()
      PlotC2.pack()

window = tkinter.Tk()
window.geometry("750x750")
window.title("Question 1")

text = Text(window)
PlotC1 = Canvas(window, background = "black", height = 150, width = 750)   # Two plots for stereo 2 audio channels 
PlotC2 = Canvas(window, background = "black", height = 150, width = 750)
B = Button(window, text = "Open file", command = openfileExec)
B.place(x=350,y=350)

window.mainloop()
