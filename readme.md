# Gradient Text API

This is a simple Express.js API that generates gradient text.

## Installation

1. Clone this repository: `git clone https://github.com/yourusername/gradient-text-api.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## Usage

Send a GET request to the `/ansi` endpoint with the following query parameters:

- `start`: The start color of the gradient (default: "6366f1").
- `end`: The end color of the gradient (default: "7e22ce").
- `text`: The text to colorize (default: "Hello, World!").
- `padding`: The padding to add to the text (default: 0).

For example:
curl 'http://localhost:8080/ansi?text=Hello,%20World!&start=4338ca&end=d946ef'