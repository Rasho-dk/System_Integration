from fastapi import FastAPI, Form, File, UploadFile
from typing import Optional
from datetime import datetime
import aiofiles # bruges for at asyrion files
app = FastAPI()

@app.post("/from")
def basic_form( 
    username: str=Form(...),
    password: str=Form(defult=...,
    min_length=8)
    ):
    return {
        "username": username #,
        # "password": password
    }


# @app.post("/fileform")
# def file_form(
#     file: bytes = File(...),
#     description: Optional[str] = None,
# ):
#     # cons er at vi kan ikke brug file typen med 
#     with open("file", "wb") as f:
#         f.write(file)
#     return {
#        "message": "File received",
#     }

# # få fat i file name
# @app.post("/fileform")
# async def file_form(
#     file: UploadFile = File(...),
#     description: Optional[str] = None,
# ):
#     contents = await file.read()
#     print(contents)

#     return{"filename": file.filename}


## vi kan defindere here size på filer
## Hvis en anden bruger denne endpoit 
# @app.post("/fileform")
# async def file_form(
#     file: UploadFile = File(...),
#     description: Optional[str] = None,
# ):
#     safe_filename = file.filename.replace("/", "_").replace("\\", "_")
#     unique_filename = str(datetime.now()) + "__" + safe_filename
#     with open("./uploads/" + unique_filename, "wb") as f:
#         # := is the walrus operator, it allows us to assign a value to a variable as part of an expression
#         while content := await file.read(1024): # read in chunks of 1024
#             f.write(content)
    

@app.post("/fileform")
async def file_form(
    file: UploadFile = File(...),
    description: Optional[str] = None,
):
    safe_filename = file.filename.replace("/", "_").replace("\\", "_")
    unique_filename = str(datetime.now()) + "__" + safe_filename

    print("###########"+ "./uploads/" + unique_filename)

    async with aiofiles.open("./uploads/" + unique_filename, "wb") as f:
        # := is the walrus operator, it allows us to assign a value to a variable as part of an expression
        while content := await file.read(1024): # read in chunks of 1024
           await f.write(content)