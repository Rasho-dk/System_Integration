import { WebSocket } from "ws";
// vi skal lave kun websocket forbindelse
// her laver vi en websocket forbindelse til serveren 
const websocketClient = new WebSocket("ws://localhost:8080");

websocketClient.on("open", () => {

    websocketClient.send("Sending a client message from Node.js");

    websocketClient.on("message", (message) => {
        console.log(`Received a message from the server: ${message}`);

        // websocketClient.close();
    });
});
