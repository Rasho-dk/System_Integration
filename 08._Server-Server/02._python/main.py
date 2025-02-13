from fastapi import FastAPI
import requests

app = FastAPI()


@app.get("/fastapiData")
def fastapiData():
    # det er en dictionary
    return {"data": "FastAPI Data"}

@app.get("/requsestExpressData")
def getRequestExpressData():
    response = requests.get("http://localhost:127.0.0.1:8080/expressData")
    return response.json()



# my_dict = { "data": "FastAPI Data" }
# print(my_dict["data"])   



# // poetry init
# // poetry add uvicorn fastapi
# // peotry shell
# poetry uviorn main:app --reload
# poetry run uvicorn main:app --reload