import express from 'express';

const app = express();
app.use(express.json())

app.post("/mywebhook", (req, res) => {
    const payload = req.body;
    console.log("Received webhook payload:", JSON.stringify(payload, null, 2));  
    res.status(200).send({ status: "ok" });
});


fetch("https://webhook.realkoder.com/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        webhookCallbackUrl: "https://rasho.loca.lt/mywebhook",
        }),
});

fetch("https://webhook.realkoder.com/ping");


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port`, PORT);
});