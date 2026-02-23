//sending status code
import express from "express";
const app = express();
app.listen(8080, () => console.log("Server started"));
app.get("/", (req, res) => {
  res.status(201).json({ message: "Hello World" });
});
