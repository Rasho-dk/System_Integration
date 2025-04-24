import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/githubwebhookjson', (req, res) => {
    console.log(req.body);
    res.sendStatus(204); // vi sender ikke res send fordi github forsåt ikke
});

app.post('/githubwebhookform', (req, res) => {
    console.log(req.body);
    res.sendStatus(204); 
});


const port = process.env.PORT || 8080;

app.listen(port, console.log("Server is running on port" ,port));


// lt --port 8080 --s rasho : brug samme port som i app.js