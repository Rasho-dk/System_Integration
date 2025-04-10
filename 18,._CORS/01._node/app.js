/*
# CORS findes kun i browseren (sikkhed futrue) - i post man virker
# cors : ideen er at gør det mere sikkert og giver the orgin der bliver defineret i headeren
    * ved at give samme origin policy (ogrin : protocol domain, port - to foskllige protokoller http; https)
# Headers;
    * Access-Control-Allow-Origin: <origin>
    * Access-Control-Allow-Credentials: true
    * Access-Control-Allow-Headers: <headers>
    * Access-Control-Allow-Methods: <methods>
    * 
# før post bruges man preflight request
# preflight request er ikke so tung fordi det ikke integrerer med serveren
# preflight request er en OPTIONS request altid kan gør det i browseren og borwsere altid lav preflight request

#  vi kan integrerer med en server hvor server har CORS ved at laver en server der henter data fra denne server som har CORS - og derfor sendes til browseren
# CROS-add-scripting derofr CORS er blevet oprettet
*/


// next() er en callback function der kaldes når middleware er færdig


import express from 'express';

const app = express();

import cors from 'cors';
// sætter vi op som middleware
// app.use(cors()); # golbal CORS for alle routes

// golbal CORS for alle requests
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// app.use(cors({ 
//     origin: "*",
//     methods: ["GET"],
//  })); 

// mere specifik CORS
app.get("/timestamp" , /*cors(), */ (req, res) => {
    res.send({ time: new Date() });
});


const PORT =  Number(process.env.PORT) || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
}); 