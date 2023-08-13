const express = require("express");
const app = express();

const port = 3001;

app.get('/', (req, res) => {
    res.json({ message: "Hello world" })
})

// setup some basic routes
app.get("/users", (req, res) => {
    res.json({ message: "Information of all users" })
})
app.get("/user/:id", (req, res) => {
    res.json({ message: `Information of user no ${req.params.id}` })
})
app.post("/users", (req, res) => {
    res.json({ message: "Information of user is created" })
})
app.put("/user/:id", (req, res) => {
    res.json({ message: `Information of user no ${req.params.id} is updated` })
})
app.delete("/user/:id", (req, res) => {
    res.json({ message: `Information of user ${req.params.id} is deleted` })
})
app.listen(port, () => {
    console.log(`Express Framework is running on port ${port}`)
})