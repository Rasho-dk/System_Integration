from fastapi import WebSocket # bruge til at give typen

# anders.loca.lt
class ConnectionManger:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept() 
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        '''
        '''
        self.active_connections.remove(websocket)

    async def send(self, message: str, websocket: WebSocket):
        '''
        '''
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        '''
        '''
        # vi kan gøre bedre ved at samle alle await i en liste og bruge asyncio.gather
        for connection in self.active_connections:
            await connection.send_text(message)
