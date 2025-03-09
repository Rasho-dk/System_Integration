# from websockets.asyncio.client import connect
# # husk run poetry shell

# def send_message(message):
#      with connect("ws://localhost:8000") as websocket:
#         websocket.send("Hello world!")
#         message = websocket.recv()
#         print(f"Received message: {message}")

# send_message()
        
import websockets
import asyncio

async def send_message():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        await websocket.send("This is my message")
        print(await websocket.recv())

# asyncio.get_event_loop().run_until_complete(send_message())
# efter python 3.7 you can do the follwoing instead:
asyncio.run(send_message()) # new version       