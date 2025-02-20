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
    res.write(`data: ${time}\n\n`); // det er ikke som send or end // dvs. at det stopper ikke. 
};

const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// tre ting som man kan brug Server send evnent
// brower HTML js , dirkte i borwseren , API client PostMand , 