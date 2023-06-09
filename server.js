//Variables for the app
const express = require("express");
const db = require("./db/db.json");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing application/json and urlencoded data (taken from 11-Express Body Parsing activity)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.send(data);
        }
    });
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
    console.log("getNotesCalled executed!");
});


app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
    console.log("GetAstrickCall worked");
})

//POST Call
app.post("/api/notes", (req, res) => {
    let response;
    console.log(req.body.title, req.body.text);

    if (req.body.title && req.body.text) {
        response = {
            status: "success",
            data: req.body,
        };
        console.log(response);
        fs.readFile("./db/db.json", (err, data) => {
            if (err) {
                console.log(err);
            };
            let parsedData = JSON.parse(data);
            console.log("parsedData ->", parsedData)
            console.log("response.data ->", response.data);
            parsedData.push(response.data);
            console.log("new parsedData ->", parsedData);
            //Callback function not working
            fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
                if (err) {
                    console.log("FAILURE");
                };
            })
        });
        res.json(`The note titled ${req.body.title} had been added!`);
    } else {
        res.json(`Something went wrong...`);
    }
});


app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`Server listening on ${PORT}`);
});