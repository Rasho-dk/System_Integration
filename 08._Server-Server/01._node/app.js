import express from 'express';


const app = express();



app.get('/expressData', (req, res) => {
    //data : "..." Det er ikke en json med javascript objekt
    // når vi sender data til klienten, så skal det være et javascript obj
    res.send({ data: "This is the data from Express" });

});

//hvor man interagerer med en anden server ? 
app.get('/requestFastAPIData', async (req, res) => {
    const response = await fetch("http://127.0.0.1:8000/fastapiData");
    // det er her der interagere man med en anden server
    const result = await response.json();
    res.send({data: result.data}); // res.send(result)
});


app.get('/requestFastAPIData', async(req, res) => {
    res.send({data: 'Data from FastAPI'});
});


app.get('/names/:name', (req, res) => {
    console.log(req.params.name);
    res.send("Your name is: " + req.params.name);
    res.send({data: "your name is: " + req.params.name});
    //http turenter
});

app.get('/hobby/:hobby', (req, res) => {
    // console.log(req.query);
    res.send("Your hobby are: " + req.query.hobbies);
    //http://localhost:8080/hobbies?hobbies=football
});


const PORT = 8080;
//callback function
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


// npm init -y
// npm i express
// fix npm i -g nodemon
