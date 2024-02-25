const express = require("express");
// const gradient = require("gradient-string");
const ansi = require("./formats/ansi");
const {printGradientText,interpolateColor} = require("./gradient");

const app = express();
const port = 8080;
const url = `http://141.148.244.146:${port}`;

const getPadding = (padding) => {
    let output = '';
    for (let i = 0; i < padding; i++) output += ' ';
    return output;
}

app.get("/ansi", (req, res) => {
    try {
        const startColor = req?.query?.start || "6366f1";
        const endColor = req?.query?.end || "7e22ce";
        const text = req?.query?.text || "Hello, World!";
        const padding = req?.query?.padding || 0;
        const steps = 20;

        if(padding > 200) return res.send("Padding too long (max 200)");
        if(text.length > 100) return res.send("Text too long (max 100 characters)");

        
        const colors = interpolateColor(startColor, endColor, steps);
        const output = printGradientText(ansi(text, padding), colors);

        return res.send(output);
    } catch (e) {
        return res.send(e.message);
    }
});

app.get("/normal", (req, res) => {
    try {
        const startColor = req?.query?.start || "6366f1";
        const endColor = req?.query?.end || "7e22ce";
        const text = req?.query?.text || "Hello, World!";
        const padding = req?.query?.padding || 0;
        const steps = 20;
        
        if(padding > 200) return res.send("Padding too long (max 200)");
        if(text.length > 300) return res.send("Text too long (max 300 characters)");

        const colors = interpolateColor(startColor, endColor, steps);
        let output = getPadding(padding);
        output += printGradientText(text, colors) + '\n';


        return res.send(output);
    } catch (e) {
        return res.send(e.message);
    }
});

app.get("/list", (req,res) => {

    const padding = 5;
    const text = "Hello!";
    
    const ansiStart = "8b5cf6";
    const ansiEnd = "db2777";
    const ansiColors = interpolateColor(ansiStart, ansiEnd, 20);

    const ansiExample = printGradientText(ansi(text, padding), ansiColors);
    const ansiUsage = `Usage: curl '${url}/ansi?start=${ansiStart}&end=${ansiEnd}&padding=${padding}&text=${text}'`;

    const normalStart = "6366f1";
    const normalEnd = "7e22ce";
    const normalColors = interpolateColor(normalStart, normalEnd, 20);

    const normalExample = getPadding(padding) + printGradientText(text, normalColors);
    const normalUsage = `Usage: curl '${url}/normal?start=${normalStart}&end=${normalEnd}&padding=${padding}&text=${text}'`;

    const output = `
Ansi example:
${ansiExample}
${ansiUsage}

Normal Gradient example:
${normalExample}
${normalUsage}
    `;

    return res.send(output + "\n\n\n");
z})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
