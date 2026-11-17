# SIT725 Task 2.2P – Express Web Server

**Student:** Irish Rodrigues (s226625251)

A simple Node.js + Express web server that:

- serves a static web page from the `public` folder, and
- exposes a small calculator REST API (GET and POST) that does the maths on the server.

## Requirements

- [Node.js](https://nodejs.org/) (v18 or later) and npm

## How to run

```bash
git clone https://github.com/irishrodrigues/SIT725_s226625251.git
cd SIT725_s226625251/task2.2P
npm install
npm start
```

Then open <http://localhost:3000> in your browser.

## Project structure

```
task2.2P/
├── server.js          # Express server and REST endpoints
├── package.json
├── public/            # Static files served by Express
│   ├── index.html     # Calculator web page
│   ├── style.css
│   └── script.js      # Calls the API with fetch()
└── README.md
```

## API endpoints

| Method | Endpoint | Example | Description |
|--------|----------|---------|-------------|
| GET | `/hello` | `/hello` | Simple test endpoint |
| GET | `/add` | `/add?a=5&b=3` | Adds two numbers → `{"result": 8}` |
| GET | `/subtract` | `/subtract?a=5&b=3` | Subtracts b from a |
| GET | `/multiply` | `/multiply?a=5&b=3` | Multiplies two numbers |
| GET | `/divide` | `/divide?a=6&b=3` | Divides a by b (rejects divide by zero) |
| POST | `/calculate` | body `{"a":5,"b":3,"operation":"add"}` | Any of the four operations via JSON |

Example responses:

```json
GET /add?a=5&b=3
{ "operation": "add", "a": 5, "b": 3, "result": 8 }

GET /add?a=5&b=hello
{ "error": "Both a and b must be valid numbers" }
```

Test the POST endpoint from a terminal:

```bash
curl -X POST http://localhost:3000/calculate -H "Content-Type: application/json" -d "{\"a\":10,\"b\":4,\"operation\":\"multiply\"}"
```

## What I learned

- How to create an Express server and serve static files with `express.static`.
- The difference between HTTP methods – GET reads data from query parameters, POST sends data in the request body.
- Building REST endpoints that run functions on the server and return JSON.
- Basic input validation and HTTP status codes (200 for success, 400 for bad input).
