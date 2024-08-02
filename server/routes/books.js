const express = require('express');
const { v4: uuidv4 } = require('uuid');

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
router.post('/', (req, res) => {
    const newBook = {
        id: uuidv4(),
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre,
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /books/:id - Updates an existing book
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const bookIdx = books.findIndex(book => book.id === id);

    if (bookIdx === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }

    books[bookIdx] = {
        id: id,
        title: req.body.title,
        author: req.body.author,
        year: req.body.year,
        genre: req.body.genre
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