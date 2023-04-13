//Variables for the app
const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = 3001;

// Middleware for parsing application/json and urlencoded data (taken from 11-Express Body Parsing activity)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//POST Call
const getNotesPost = app.post("/api/notes", (req, res) => {
    let response;

    if (req.body.title && req.body.text) {
        response = {
            status: "success",
            data: req.body,
        };
        fs.readFile("./db/db.json", (err, data) => {
            if (err) {
                console.log(err);
            };
            let parsedData = JSON.parse(data);
            parsedData = parsedData.push(response.data);
            fs.writeFile("./db/db.json", (JSON.stringify(parsedData), (err) => {
                if (err) {
                    console.log("FAILURE");
                };
            }))
        });
        res.json(`The note titled ${req.body.title} had been added!`);
    } else {
        res.json(`Something went wrong...`);
    }
});

// DELETE command that I probably will not get to
/*const getNotesDelete = app.delete("/api/notes", (req, res) => {
    console.log("We made a DELETE call");
});*/


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server listening on ${PORT}`);
});