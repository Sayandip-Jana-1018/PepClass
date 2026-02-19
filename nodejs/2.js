import express from 'express'
const app = express()
app.listen(8080, () => {
    console.log("Server Started");
});

app.get("/", (req, res) => {
    console.log(req.url)
    res.send("response from server for /")
});

app.get("/home", (req, res) => {
    console.log(req.url)
    res.send("response from server for /home")
});