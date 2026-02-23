import express from "express";
const app = express();
const token = Math.round(Math.random() * 100000 ).toString()
app.use(express.json());

const auth = (req, res, next) => {
    const val = req.headers.authorization
    const tokenValue = val.split(" ")
    if(tokenValue[1] === token) next()
    else res.send("unauthrized")
};
app.get("/", auth,(req, res) => {
    res.send("Welcome");
});
app.post("/login", (req, res) => {
        res.send(token)
})
app.listen(8080, () => {
  console.log("server is live");
});