import express from 'express';
// when the server receive the server close unit new request
const app = express();

// client subscribe
// keep alive connection 
let clients = [];
app.get("/events/subscribe", (req, res) => {
    // vi sætter fordi vi sender json
    res.setHeader("Content-Type", "application/json"); 
    // vi vil ikke have at browseren(client) cacher vores data
    res.setHeader("Cache-Control", "no-cache"); 
    // vi vil have at browseren(client) holder forbindelsen
    // her bruger vi ikke send fordi vi vil holde forbindelsen åben
    res.setHeader("Connection", "keep-alive"); 

    clients.push(res);
    req.on("close", () => {
        // when the client close the browser som remove the client from the array
        clients = clients.filter(client => client !== res);
    });
});

app.get("/events/publish", (req, res) => {
    const message = {data: "This is a new message"};

    clients.forEach((res) => {
        res.send(message);
    })
    
    clients = [];

    res.status(204).end();
});







// her sætter vi server op
const PORT = 8080;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
