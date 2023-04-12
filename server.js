//Variables for the app
const express = require("express");
const app = express();
const PORT = 3001;

//GET Method for api/notes
const getNotesCall = app.get("/api/notes", (req, res) => {
    res.send("GET request called!");
});

//POST Method for /api/notes
const getNotesPost = app.post("/api/notes", (req, res) => {
    res.send("POST request called!? IDK I'll need to use postman");
    console.log("Yay? -> POST Call made");
})

const getNotesDelete = app.delete("/api/notes", (req, res) => {
    res.send("DELETE request made dawg");
    console.log("We done made a DELETE call");
})


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server listening on ${PORT}`);
});