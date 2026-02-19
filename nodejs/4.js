import express from 'express' 
const app = express()
app.listen(8080, () => console.log("Server Started"))

// app.get("/:id/:email", (req, res) => {
//     console.log(req.url)
//     console.log(req.params)
//     res.send(req.params.id + req.params.email);
// });

// app.get("/id/:id/email/:email", (req, res) => {
//     console.log(req.url)
//     console.log(req.params)
//     res.send(req.params.id + req.params.email);
// });

app.get("/home", (req, res) => {
    res.send("Hello World")
});

app.get("/:num1/:num2", (req, res) => {

    const num1 = Number(req.params.num1);
    const num2 = Number(req.params.num2);

    const sum = num1 + num2;

    res.send(`Sum = ${sum}`);
});

app.get("/x/:a/y/:b/z/:c", (req, res) => {

    const a = Number(req.params.a);
    const b = Number(req.params.b);
    const c = Number(req.params.c);

    const sum = a + b + c;

    res.send(`Sum = ${sum}`);
});

app.get(":a/:b/:c", (req, res) => {
    res.send("Hello Students");
});


