// Form pops up when New Book button clicked, disappears when Add Book button clicked
const newBtn = document.getElementById('newBook');
const form = document.getElementById('form-background');

newBtn.addEventListener('click', () => {
    form.style.display = 'flex';
    form.style.position = 'fixed'
    newBtn.disabled = true;
});

const addBook = document.getElementById('addBook');

addBook.addEventListener('click', () => {
    form.style.display = 'none';
    newBtn.disabled = false;
})

// Rotate book when clicked
const bookContainer = document.querySelector('.bookContainer');
const bookObj = bookContainer.childNodes[1];

bookContainer.addEventListener('click', () => {
    if (bookContainer.childNodes[3].style.opacity === '0') {
        // Roate Book and display text
        bookContainer.childNodes[3].style.opacity = '100'
        bookObj.style.perspective = '1000px'
        bookObj.childNodes[1].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(-50deg) rotateZ(0deg) skew(0deg, 0deg)'
        bookObj.childNodes[3].style.transform = 'translate3d(-31px, 0px, -41px) scale3d(1, 1, 1) rotateX(0deg) rotateY(30deg) rotateZ(0deg) skew(0deg, 0deg)'
        bookObj.childNodes[3].style.width = '245px'
    } else {
        // Book back to orginal position (non-clicked)
        bookContainer.childNodes[3].style.opacity = '0'
        bookObj.childNodes[1].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'
        bookObj.childNodes[3].style.transform = 'translate3d(-35px, 0px, -41px) scale3d(1, 1, 1) rotateX(0deg) rotateY(90deg) rotateZ(0deg) skew(0deg, 0deg)'
        bookObj.childNodes[3].style.width = '0px'
    }
});

// Book object constructor
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}