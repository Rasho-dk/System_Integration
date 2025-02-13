from fastapi import FastAPI
import requests

# poerty init -n
# poetry add requests

app = FastAPI()

@app.get("/requsestExpressData")
def getRequestExpressData():
    response = requests.get("http://localhost:127.0.0.1:8080/expressData")
    return response.json()

# poetry commad


# lt --port 8080
# lt --port 8080 --subdomain mysubdomain