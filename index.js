const express = require("express");
const gradient = require("gradient-string");
const ansi = require("./formats/ansi");

const app = express();
const port = 8080;

app.get("/ansi", (req, res) => {
    try{
        const gradientStart = req?.query?.start || "6366f1";
        const gradientEnd = req?.query?.end || "7e22ce";
        const text = req?.query?.text || "Hello, World!";
        const padding = req?.query?.padding || 0;
        
        const output = gradient(gradientStart, gradientEnd)(ansi(text, padding));
        return res.send(output);
    }catch(e){
        return res.send(e.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
