const express = require('express');
const app = express();
const hbs = require('hbs');
app.set("view engine", "hbs");
const bodyParser = require('body-parser');
//middleware
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fs = require('fs');
//generate unique id
let id = () => {
    return new Date().getTime();
}
app.get("", (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //the representation of weekday possible values are "long": Thursday / "short":Thu  / "narrow": T
    //the representation of month possible values are "long": October / "short":Oct  / "narrow": O
    let today = new Date();
    let currentDate = today.toLocaleDateString("en-US", options);
    res.render("index", { currentDate })
})
app.post("", (req, res) => {
    let obj = {
        'id': id(),
        'task': req.body.task
    }
    const json = JSON.stringify(obj)
    // console.log(json)
    let input = fs.readFileSync("input.json", "utf-8")
    //    console.log(input)
    input = input.slice(0, -1)
    // console.log(input)
    input = input + "," + json + "]"
    // console.log(input)
    fs.writeFileSync("input.json", input);
    // console.log(json)
    const parseObj = JSON.parse(input);

    res.render("tasks", { parseObj })
})
app.post('/details', (req, res) => {
    let detailObject = req.body.id
    let prev = fs.readFileSync('input.json', 'utf-8')
    prev = JSON.parse(prev);
    let found = prev.find(a => a.id == detailObject)
    res.render('show', { found })
})
app.listen(3000, () => {
    console.log("Listen to the port number 3000")
})