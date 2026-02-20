import express, { request, response } from "express";
const app = express();
app.listen(8080, () => {
  console.log("Server Started....");
});
app.use(express.json())
let users = [
  { id: 1, name: "avi", email: "avi@mail.com", role: "Student" },

  { id: 2, name: "satyam", email: "satyam@mail.com", role: "admin" },

  { id: 3, name: "vivaan", email: "vivaan@mail.com", role: "Student" },
];

app.get("/", (request, response) => {
  response.json(users);
});

app.post("/", (request, response) => {
//   console.log(request.body);
  const user = request.body
  users.push(user)
  response.json(users);
});

app.delete("/:id",(request,response)=>{

})

app.get("/:id", (request, response) => {
  const user = users.find((user) => user.id === Number(request.params.id));
  if (user) {
    response.json(user);
  }
});