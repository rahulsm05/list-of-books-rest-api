const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// ✅ Use body-parser middleware
app.use(bodyParser.json());

let books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and Author required.' });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT to update a book
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);

  if (!book) return res.status(404).json({ error: 'Book not found' });

  book.title = title || book.title;
  book.author = author || book.author;

  res.json(book);
});

// DELETE a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
