import express from "express"
const app = express()
app.listen(8080,()=>console.log("Server started"))
// app.use(express.static("images"))
// app.use("/images",express.static("images"))
app.use("/public",express.static("public"))

