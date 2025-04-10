#pip freeze > requirements.txt  

# vi har ikke sættet denne rigtigt header i cors derfor det virker ikke i browser

from fastapi import FastAPI
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# tilføre til router så router.app for cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_methods=["Get"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
    allow_credentials=True,  # Allows cookies to be sent
)

@app.get("/timestamp")
def get_timestamp():
    return {"data" : datetime.now()} 