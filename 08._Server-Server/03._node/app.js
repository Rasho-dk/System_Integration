import express from 'express';

const app = express();

app.get('/hobby/:hobby', (req, res) => {
    console.log(req.params.hobby);
    res.send("Your hobbies are: " + req.params.hobby);

});



const PORT = 8080;
//callback function
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
