from fastapi import FastAPI



app = FastAPI()

from routers import spacecraftes_router

app.include_router(spacecraftes_router)



# https://fastapi.tiangolo.com/reference/apirouter/#fastapi.APIRouter--example 
# https://docs.pydantic.dev/latest/ 