# Alen Mehmedbegovic - Feburary 3rd, 2024
# CMPT 365 - question 2

import tkinter
import PIL
import PIL.Image
from PIL import ImageTk
from tkinter import *
from tkinter.filedialog import askopenfilename

def openfileExec():
    filename = askopenfilename()
    if filename:  # Check for empty string
        image = PIL.Image.open(filename) 
        photoimage = ImageTk.PhotoImage(image)

        for previmage in window.winfo_children(): # Delete previous image 
            if isinstance(previmage, Label):
                previmage.destroy()

        imagelabel = Label(window, image = photoimage)
        imagelabel.image = photoimage       # Without this it won't work (for some reason)
        imagelabel.pack()

window = tkinter.Tk()
window.geometry("750x750")
window.title("Question 2")

text = Text(window)
Openfile = Button(window, text = "Open file", command = openfileExec)
Openfile.place(x = 350, y = 700)

Exit = Button(window, text = "Exit", command = window.destroy)
Exit.place(x = 700, y = 700)

window.mainloop()