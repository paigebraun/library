const express = require('express');
const booksRouter = require('./routes/books');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Use books route
app.use('/books', booksRouter)

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});