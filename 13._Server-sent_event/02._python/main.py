#  poetry init -n  
#  poetry add fastapi uvicorn
# poetry shell
# uvicorn main:app --reload
# test connection : localhost:8000


# vi bruger ikk response fra fastapi for vi skal bruge header fx text/event-stream derofr bruger vi StreamingResponse
from fastapi import FastAPI, Request # der skrives fra fastapi importeres FastAPI som er en klasse
from fastapi.templating import Jinja2Templates # vi bruger denne så vi kan få adgang til vores templates og ved hvor det ligger
from fastapi.responses import StreamingResponse
from datetime import datetime
import asyncio

# hvorfor bruger vi jinja vs node.? 
# i node.js : --> det gør tilganglige for public at kunne bruge disse koder
    # app.use(express.static('public')); kigger på 01._node.js  i samme mappe
# i pyhton kan ikke


app = FastAPI()
# templates fortæller hvor vores templates ligger
templates =  Jinja2Templates(directory="templates")


@app.get("/")
# here der skal laves en requsest som ligner node.js som call back funkc. (req, res)
def serve_root_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# here data bliver sendt som SEE derfor bruger vi f"data: {}\n\n"
# en funktion som generere datoer fx yeiled data 
async def date_generator():
    while True:
        now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
        yield f"data: {now}\n\n"
        await asyncio.sleep(1)


@app.get("/sse")
def sse():
    return StreamingResponse(date_generator(), media_type="text/event-stream")


@app.get("/name_generator")
def array_generator():
    return StreamingResponse(name_generator(), media_type="text/event-stream")

# create wiored name generator
# create a generator that yields names
async def name_generator():
    names = ["Alice", "Bob", "Charlie", "David", "Eve"]
    while True:
        for name in names:
            yield f"data: {name}\n\n"
            await asyncio.sleep(1)

