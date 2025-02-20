// i package bruger vi type module, så vi kan bruge import og export der vi arbjeder med SI
/**
 * short polling 
 over head for HTTP request
 */
import express from 'express';

const app = express();

// definerer vores public mappe
app.use(express.static('public'));

const randomNumber = [1, 25, 5324];

// det er ikke godt 
// For meget http request
// spiller resourcer på Client og Server
// Data er ikke real time da vi i index.html har sat en interval på 1 sekund
// overhead på serveren 
app.get("/randomnumbers", (req, res) => {
    // res.send(randomNumber); det er ikke godt der vi sender en array men vi ønsker at sende Json for andre server
    res.json({data: randomNumber});
});


app.get("/simulatenewnumbers", (req, res) => {
    const newNumber = getRandomInt(1, 100);
    randomNumber.push(newNumber);
    res.json({data: newNumber});
});

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






const PORT = 8080;
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

// public 
/*
    denne indeholder vores static filer, som vi kan hente fra vores server
*/