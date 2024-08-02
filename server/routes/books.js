const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fetchBookCover = require('../utils/fetchBookCover');

const router = express.Router();

// Hard code list of books to start with
let books = [
    {
        id: uuidv4(),
        title: 'Lord of the Flies',
        author: 'William Golding',
        year: '1954',
        genre: 'Classic',
        cover: 'https://books.google.com/books/content?id=iyfgqV5dxXQC&printsec=frontcover&img=1&zoom=10&imgtk=AFLRE73-FYhmf7gV-2VxR7B8QvNtwNXCD23HdgZuKayrSQTooSMyhd12pMx0yWHuuVife4OHSut7ppe5fbyfPmOV--ls48uFtjBtsCLDD3QMPPq9GarNPpQR74qSm6c-s8LU3ZLNUShE'
    },
    {
        id: uuidv4(),
        title: 'The Bell Jar',
        author: 'Sylvia Plath',
        year: '1963',
        genre: 'Fiction',
        cover: 'https://books.google.com/books/content?id=cZpR_0kN9gEC&pg=PP1&img=1&zoom=3&hl=en&bul=1&sig=ACfU3U3Inr5mFk-qi0y-20e-LgUv2Vncxw&w=1280'
    },
    {
        id: uuidv4(),
        title: 'Normal People',
        author: 'Sally Rooney',
        year: '2018',
        genre: 'Fiction',
        cover: 'https://books.google.com/books/content?id=fQBlDwAAQBAJ&printsec=frontcover&img=1&zoom=10&&source=gbs_api'
    }
];

// GET /books - Retrieves all books
router.get('/', (req, res) => {
    res.json(books);
});

// POST /books - Adds a new book
router.post('/', async (req, res) => {
    const { title, author, year, genre } = req.body;
    
    const coverUrl = await fetchBookCover(title, author);

    const newBook = {
        id: uuidv4(),
        title,
        author,
        year,
        genre,
        cover: coverUrl,
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Updates an existing book
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, year, genre } = req.body;
    const bookIdx = books.findIndex(book => book.id === id);

    if (bookIdx === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    const existingBook = books[bookIdx];
    let coverUrl = existingBook.cover;

    if (existingBook.title !== title || existingBook.author !== author) {
        coverUrl = await fetchBookCover(title, author);
    }

    books[bookIdx] = {
        id: id,
        title,
        author,
        year,
        genre,
        cover: coverUrl,
    };

    res.json(books[bookIdx]);
});

// DELETE /books/:id - Deletes a book
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const bookIdx = books.findIndex(book => book.id === id);

    if (bookIdx === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books.splice(bookIdx, 1);
    res.status(204).end();
});

module.exports = router;