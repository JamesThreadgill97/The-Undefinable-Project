const cors = require("cors");
const express = require("express");
const app = express();
const logger = require("./logger");
// const port = 3000
const historicalFigures = require("./historicalFigures.json");

app.use(cors());
app.use(express.json());
app.use(logger);

// app.get("/", (req, res) => {
//     res.send("Hello Figures!");    
// });

// app.get("/all", (req, res) => {
//     res.send(historicalFigures);    
// });

app.get("/", (req, res) => {
    const randIdX=Math.floor(Math.random()*historicalFigures.length)
    res.send(historicalFigures[randIdX]);  
});

app.post("/Create", (req, res) => {
    const newFigure = req.body; 
    historicalFigures.push(newFigure)
    //console.log(historicalFigures);
    res.status(201).send(newFigure);
    
})

// app.listen(port, () => {
//     console.log(`API listening on port ${port}.`);
// })

module.exports = app;
