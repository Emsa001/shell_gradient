const express = require("express");
const gradient = require("gradient-string");
const ansi = require("./formats/ansi");

const app = express();
const port = 5555;

app.get("/ansi", (req, res) => {
    const gradientStart = req.query.start;
    const gradientEnd = req.query.end;
    const text = req.query.text;

    const output = gradient(gradientStart, gradientEnd)(ansi(text));
    res.send(output);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
