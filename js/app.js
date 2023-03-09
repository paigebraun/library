// Form pops up when New Book button clicked
const newBtn = document.getElementById('newBook');
const form = document.getElementById('form-background');

newBtn.addEventListener('click', () => {
    form.style.display = 'flex';
    form.style.position = 'fixed'
    newBtn.disabled = true;
});

const addBook = document.getElementById('addBook');

// Form disappears when Add Book button clicked
addBook.addEventListener('click', () => {
    getData();
    form.style.display = 'none';
    newBtn.disabled = false;
})

// Rotate book when clicked
const bookList = document.getElementById('bookList');
let openedBook = 'none';

for (let i = 0; i < bookList.children.length; i++) {
    let bookContainer = bookList.children[i];
    let removeBtn = bookContainer.childNodes[1];
    let bookObj = bookContainer.childNodes[3];
    let bookInfo = bookContainer.childNodes[5];


    bookObj.addEventListener('click', () => {
        if ((bookInfo.style.opacity === '0') && (openedBook === 'none')) {
            openBook();
        }
        else if ((bookInfo.style.opacity === '0') && (openedBook !== 'none')) {
            closeBook(openedBook);
            openedBook = 'none'
            openBook();
        }
        else {
            closeBook(i);
            openedBook = 'none'
        }
    });

    // Rotate Book and display text
    function openBook() {
        openedBook = i;
        // Reset variables to match the book we want to open
        bookContainer = bookList.children[i];
        removeBtn = bookContainer.childNodes[1];
        bookObj = bookContainer.childNodes[3];
        bookInfo = bookContainer.childNodes[5];

        bookContainer.style.alignItems = 'flex-start'
        bookObj.style.perspective = '1000px'
        bookObj.childNodes[1].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(-50deg) rotateZ(0deg) skew(0deg, 0deg)'
        bookObj.childNodes[3].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(30deg) rotateZ(0deg) skew(0deg, 0deg)'
        bookObj.childNodes[3].style.width = '245px'
        removeBtn.style.display = 'block'
        setTimeout(showRemoveBtn, 500);
        setTimeout(showBookInfo, 300);
        setTimeout(transitionBookInfo, 500);
    }

    // Book back to orginal position (non-clicked)
    function closeBook(openedBook) {
        // Reset variables to match the opened book
        bookContainer = bookList.children[openedBook];
        removeBtn = bookContainer.childNodes[1];
        bookObj = bookContainer.childNodes[3];
        bookInfo = bookContainer.childNodes[5];

        bookContainer.style.alignItems = 'center'
        bookObj.childNodes[1].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'
        bookObj.childNodes[3].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(90deg) rotateZ(0deg) skew(0deg, 0deg)'
        bookObj.childNodes[3].style.width = '0px'
        removeBtn.style.display = 'none'
        removeBtn.style.opacity = '0'
        bookInfo.style.display = 'none'
        bookInfo.style.opacity = '0'
    }

    function showBookInfo() {
    bookInfo.style.display = 'flex'
    }

    function transitionBookInfo() {
    bookInfo.style.opacity = '100'
    }

    function showRemoveBtn() {
    removeBtn.style.opacity = '100'
    }

};

const bookForm = document.querySelector('.form-inline');

let myLibrary = [];

// Book object constructor
function Book() {
    this.title = '';
    this.author = '';
    this.pages = '';
    this.read = '';
}

function getData() {
    var newBook = new Book();
    newBook.title = bookForm.title.value;
    newBook.author = bookForm.author.value;
    newBook.pages = bookForm.num_pages.value;
    newBook.read = bookForm.read.value;
    myLibrary.push(newBook);
    console.log(myLibrary);
}