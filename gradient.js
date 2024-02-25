const interpolateColor = (color1, color2, steps) => {
    const result = [];
    const r1 = parseInt(color1.slice(0, 2), 16);
    const g1 = parseInt(color1.slice(2, 4), 16);
    const b1 = parseInt(color1.slice(4, 6), 16);

    const r2 = parseInt(color2.slice(0, 2), 16);
    const g2 = parseInt(color2.slice(2, 4), 16);
    const b2 = parseInt(color2.slice(4, 6), 16);

    for (let i = 0; i < steps; i++) {
        const r = Math.round(r1 + (r2 - r1) * i / steps).toString(16).padStart(2, '0');
        const g = Math.round(g1 + (g2 - g1) * i / steps).toString(16).padStart(2, '0');
        const b = Math.round(b1 + (b2 - b1) * i / steps).toString(16).padStart(2, '0');
        result.push(r + g + b);
    }

    return result;
};

const printGradientText = (text, colors) => {
    const len = text.length;
    let output = "";
    for (let i = 0; i < len; i++) {
        const colorIdx = Math.floor(i * colors.length / len);
        const color = colors[colorIdx];
        const r = parseInt(color.slice(0, 2), 16);
        const g = parseInt(color.slice(2, 4), 16);
        const b = parseInt(color.slice(4, 6), 16);
        output += `\x1b[38;2;${r};${g};${b}m${text[i]}\x1b[0m`;
    }

    return output;
};

module.exports = {printGradientText,interpolateColor};
