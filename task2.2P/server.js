// SIT725 Task 2.2P - Express Web Server
// Serves a static web page from /public and exposes a small calculator REST API.

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());                 // parse JSON bodies (for POST)
app.use(express.static(__dirname + '/public')); // serve files in the public folder

// ---------- Helper functions ----------
function parseNumbers(a, b) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);
  if (isNaN(num1) || isNaN(num2)) {
    return { error: 'Both a and b must be valid numbers' };
  }
  return { num1, num2 };
}

const operations = {
  add: (x, y) => x + y,
  subtract: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => (y === 0 ? null : x / y),
};

function calculate(operation, a, b) {
  const parsed = parseNumbers(a, b);
  if (parsed.error) return { status: 400, body: { error: parsed.error } };

  const result = operations[operation](parsed.num1, parsed.num2);
  if (result === null) return { status: 400, body: { error: 'Cannot divide by zero' } };

  return {
    status: 200,
    body: { operation, a: parsed.num1, b: parsed.num2, result },
  };
}

// ---------- Routes ----------

// Simple test endpoint
app.get('/hello', (req, res) => {
  res.send('Hello from the SIT725 Express server!');
});

// GET /add?a=5&b=3  -> adds two numbers on the server
app.get('/add', (req, res) => {
  const { status, body } = calculate('add', req.query.a, req.query.b);
  res.status(status).json(body);
});

// GET /subtract, /multiply, /divide (extra calculator functions)
app.get('/subtract', (req, res) => {
  const { status, body } = calculate('subtract', req.query.a, req.query.b);
  res.status(status).json(body);
});

app.get('/multiply', (req, res) => {
  const { status, body } = calculate('multiply', req.query.a, req.query.b);
  res.status(status).json(body);
});

app.get('/divide', (req, res) => {
  const { status, body } = calculate('divide', req.query.a, req.query.b);
  res.status(status).json(body);
});

// POST /calculate  body: { "a": 5, "b": 3, "operation": "add" }
app.post('/calculate', (req, res) => {
  const { a, b, operation } = req.body || {};
  if (!operations[operation]) {
    return res.status(400).json({
      error: 'operation must be one of: ' + Object.keys(operations).join(', '),
    });
  }
  const { status, body } = calculate(operation, a, b);
  res.status(status).json(body);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
