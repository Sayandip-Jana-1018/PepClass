import express from "express"
const app = express();
// const PORT = 8080;
const PORT = process.argv[2];
app.listen(PORT, () => {
    console.log(`Server Started on Port ${PORT}`);
});

app.get("/", (req, res) => {
    res.send(`This server is running on port ${PORT}`);
});