import express, { response } from 'express';

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
})
.then(response => response.json())
.then(data => {
    console.log("Webhook registered successfully:", data);
})
.catch(error => {
    console.error("Error registering webhook:", error);
});

fetch("https://webhook.realkoder.com/ping")
.then(response => response.json())
.then(data => {
    console.log("Ping response:", data);
})
.catch(error => {
    console.error("Error pinging webhook:", error);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port`, PORT);
});