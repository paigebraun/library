// Form pops up when New Book button clicked, disappears when Add Book button clicked
const newBtn = document.getElementById('newBook');
const form = document.getElementById('form-background');

newBtn.addEventListener('click', () => {
    form.style.display = 'flex';
    newBtn.disabled = true;
});

const addBook = document.getElementById('addBook');

addBook.addEventListener('click', () => {
    form.style.display = 'none';
    newBtn.disabled = false;
})


// Book object constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}