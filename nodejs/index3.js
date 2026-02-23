import express from "express";
const app = express();
app.listen(8080, () => {
  console.log("Server started");
});
app.get("/", (req, res) => {
  console.log(req.url);
  res.send("response from server for /");
});
app.get("/home", (req, res) => {
  console.log(req.url);
  res.send("response from server for /home");
});
app.get("/home/page1", (req, res) => {
  console.log(req.url);
  console.log(req.method)
  console.log(req.body)
  console.log(req.headers.authorization)
  res.send("response from server for /home/page1");
});
