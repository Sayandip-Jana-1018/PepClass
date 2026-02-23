import express from "express"
import jwt from "jsonwebtoken"
const app = express()
const SECRET = "lpu"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiIsImVtYWlsIjoiam9obkBnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTc3MTgzNDE5NiwiZXhwIjoxNzcxODM3Nzk2fQ.L6T8-m9HL15h6MRwgqh5zQV1havse15E5Xcq5R8Kukg"
const user = jwt.verify(token,SECRET)
console.log(user)