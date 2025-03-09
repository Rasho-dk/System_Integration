/*
hvilken header der gør det virker
fx Content-Type: text/event-stream osv. 
sprøgsmål:
    om kode.
*/

import express from 'express';

const app = express();

// definde envriment veriabel PORT=9090 node app.js
// console.log(process.env.PORT);
// det gør tilganglige for public at kunne bruge disse koder
app.use(express.static('public'));

/*

*/

// server send evnet
app.get("/synchronizetime", (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    setInterval(() => sendTimeToClient(res), 1000);
});


//få fat i tid og sende til client
// \n\n send all data 
// det er protocol for server send event
function sendTimeToClient(res){
    const time = new Date().toISOString();
    /*
    hvis ikke bruger data og \n\n` så få vi 
    data line 1
    data line 2
    vi bruger eventsource til at få fat i data  kan bruge 3 events
    */
    res.write(`data: ${time}\n\n`); // det er ikke som send or end // dvs. at det stopper ikke. 
};

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// Eksamen spørgsmål:
// tre ting som man kan brug Server send evnent?
// brower HTML js , dirkte i borwseren , API client PostMan 