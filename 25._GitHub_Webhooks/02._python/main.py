
from fastapi import FastAPI, Request, Response
import json 
import httpx

app = FastAPI()


@app.post("/githubwebhookjson")
async def github_webhook(request: Request):
    data = await request.body()
    print(json.loads(data))
    return

@app.post("/githubwebhookform")
async def github_webhook(request: Request, response: Response):
    if request.headers.get("content-type") == "application/x-www-form-urlencoded":
        form_data = await request.form()
        payload = form_data['payload']
        print(payload)
        response.status_code = 204
    else: 
        response.status_code = 400


@app.post("/mywebhook")
async def webhook(request: Request):
    data = await request.body()
    print(json.loads(data))
    return



@app.post("/register")
async def register():
    url = "https://webhoob20250501214221-cad2cdb4hncsg6bu.northeurope-01.azurewebsites.net/api/Webhooks"
    payload = {
        "callbackUrl": "https://rasho.loca.lt/mywebhook",
        "eventTypes": [
            "PaymentInitiated",
            "PaymentFailed"
        ]
    }        
    headers = {
        'Content-Type': 'application/json'
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json=payload)
        print(response.status_code)
        print(response.text)
    
 