const express = require("express");
// const gradient = require("gradient-string");
const ansi = require("./formats/ansi");
const {printGradientText,interpolateColor} = require("./gradient");

const app = express();
const port = 8080;

app.get("/ansi", (req, res) => {
    try {
        const startColor = req?.query?.start || "6366f1";
        const endColor = req?.query?.end || "7e22ce";
        const text = req?.query?.text || "Hello, World!";
        const padding = req?.query?.padding || 0;
        const steps = 20;

        // const output = gradient(
        //     gradientStart,
        //     gradientEnd
        // )(ansi(text, padding));

        if(text.length > 20) return res.send("Text too long (max 20 characters)");

        
        const colors = interpolateColor(startColor, endColor, steps);
        const output = printGradientText(ansi(text, padding), colors);

        return res.send(output);
    } catch (e) {
        return res.send(e.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
