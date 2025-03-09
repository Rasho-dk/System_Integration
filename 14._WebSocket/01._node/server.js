// npm i -g npm
// npm init
// npm i ws 
// run : noddemon server.js

import { WebSocketServer } from "ws";

const PORT = process.env.PORT ?? 8080;



const server = new WebSocketServer({ port: PORT });

// to types of evnets (on , send)
// clients er en klasse der viser alle forbindelser dvs dem der konnekter til serveren
server.on("connection", (ws) => {
    console.log("New connection", server.clients.size);

    // server få besked fra klient
    ws.on("message", (message) => {
        // konsole det som string ved brug $ for at ikke skrive det som buffer ....
        console.log(`Received Message from the client", ${message}`);
        
        // send message to all clients
        server.clients.forEach((client) => {
            // send message to all clients
            client.send(String(message));
        });
    });
    
    ws.on("close", () => {
        console.log("Client disconnected", server.clients.size);
    });
});