//Variables for the app
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3001;

//GET calls
const getNotesCall = app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    console.log("GET request called!");
});

const getApiNotesCall = app.get("/api/notes", (req, res) => {
    //this guy needs to read the db.json file
    res.sendFile(path.join(__dirname, "./db/db.json"));
    console.log("getApiNotesCall worked!");
})

const getAstrickCall = app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    console.log("GetAstrickCall worked");
})

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