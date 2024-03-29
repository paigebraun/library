
// Form pops up when New Book button clicked
const newBtn = document.getElementById('newBookBtn');
const form = document.getElementById('form-background');
const input = document.querySelectorAll('.input');
const cancelFormBtn = document.querySelector('.cancelFormBtn');

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const numPages = document.querySelector('#num_pages');
const read = document.getElementsByName('read');

// If New Book button clicked, display form
// Clear and hide form if cancel button clicked
newBtn.addEventListener('click', () => {
    form.style.display = 'flex';
    form.style.position = 'fixed'
    newBtn.disabled = true;
    cancelFormBtn.addEventListener('click', () => {
        form.style.display = 'none';
        newBtn.disabled = false;
        title.value = '';
        author.value = '';
        numPages.value = '';
        for (let i = 0; i < read.length; i++) {
            read[i].checked = false;
        }
    })
});

// Get rid of default browser styling of form validation
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('invalid', function (event) {
        event.preventDefault();
    }, true);
};

const addBook = document.getElementById('addBook');
const greenBar = document.getElementById('greenBar');

// Add red border to inputs that are invalid
// Form disappears / submits data when Add Book button clicked
// Clear inputs for next time the form pops up
addBook.addEventListener('click', (e) => {
    e.preventDefault();
    if (title.value === '') {
        title.setAttribute("borderAttr", "1");
    } else {
        title.removeAttribute("borderAttr");
    }
    if (author.value === '') {
        author.setAttribute("borderAttr", "1");
    } else {
        author.removeAttribute("borderAttr");
    }
    if (numPages.value === '') {
        numPages.setAttribute("borderAttr", "1");
    } else {
        numPages.removeAttribute("borderAttr");
    }
    if ((title.value !== '') && (author.value !== '') && (numPages.value !== '')){
        getData();
        form.style.display = 'none';
        newBtn.disabled = false;
        title.value = '';
        author.value = '';
        numPages.value = '';
        for (let i = 0; i < read.length; i++) {
            read[i].checked = false;
        }
        greenBar.style.display = 'block';
        setTimeout(hideGreenBar, 1200);
        setTimeout(hideGreenBarDisplay, 2000);
        //setTimeout(hideGreenBar, 1000);
        //greenBar.style.display = 'none';

        function hideGreenBarDisplay() {
            greenBar.style.display = 'none';
            greenBar.style.opacity = 100;

        }

        function hideGreenBar() {
            greenBar.style.opacity = 0;
        }
    }
});

// Variable to track which book is opened
let openedBook = 'none';
const removeContainer = document.getElementById('remove-container');
const removeYes = document.querySelector('.remove-yes');
const removeNo = document.querySelector('.remove-no');

// Use event delegation to rotate book when clicked and close any other opened books
function handler() {
    document.getElementById('bookList').addEventListener('click', function (e) {
        if (e.target && e.target.className === 'bookSpine') {
            bookObj = e.target.parentNode;
        } else if (e.target && e.target.matches('p')) {
            bookObj = e.target.parentNode.parentNode;
        } else if (e.target && e.target.matches('img')) {
            bookObj = e.target.parentNode.parentNode;
        }
        
        // Remove book from library if remove button clicked
        if (e.target && e.target.className === 'removeBtn' || e.target.textContent === 'X') {
            removeContainer.style.display = 'flex';
            newBtn.disabled = true;
            removeYes.addEventListener('click', () => {
                removeContainer.style.display = 'none';
                while (bookContainer.firstChild) {
                    bookContainer.removeChild(bookContainer.firstChild);
                }
                bookContainer.remove();
                openedBook = 'none';
                newBtn.disabled = false;
            })
            removeNo.addEventListener('click', () => {
                removeContainer.style.display = 'none';
                newBtn.disabled = false;
            })
        }
        
        // Only open/close books if user clicks on the spine, title, or cover
        if ((e.target && e.target.className === 'bookSpine' || (e.target && e.target.className === 'bookCover') || (e.target && e.target.matches('p')) || (e.target && e.target.matches('img')))) {
            bookContainer = bookObj.parentNode;
            removeBtn = bookContainer.children[0];
            bookInfo = bookContainer.children[2];

            if ((bookInfo.style.opacity === '0') && (openedBook === 'none')) {
                openBook();
            }
            else if ((bookInfo.style.opacity === '0') && (openedBook !== 'none')) {
                closeBook(openedBook);
                openBook();
            }
            else {
                closeBook(bookObj);
            }

            function openBook() {
                bookContainer = bookObj.parentNode;
                removeBtn = bookContainer.children[0];
                bookInfo = bookContainer.children[2];
                bookContainer.style.alignItems = 'flex-start'
                bookContainer.classList.remove('bookContainerHover');
                bookObj.style.perspective = '1000px'
                bookObj.children[0].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(-50deg) rotateZ(0deg) skew(0deg, 0deg)'
                bookObj.children[1].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(30deg) rotateZ(0deg) skew(0deg, 0deg)'
                bookObj.children[1].style.marginRight = '0px'
                removeBtn.style.display = 'block'
                setTimeout(showRemoveBtn, 500);
                setTimeout(showBookInfo, 300);
                setTimeout(transitionBookInfo, 500);
                openedBook = bookObj;
                // Change Read and Not Read when user clicks buttons
                bookInfo.addEventListener('click', function (e) {
                    if (e.target.className === 'readBtn') {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = 'black';
                        let notReadBtn = bookInfo.children[1].children[1];
                        notReadBtn.style.backgroundColor = '#222222';
                        notReadBtn.style.color = 'white';
                    } else if (e.target.className === 'notReadBtn') {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = 'black';
                        let readbtn = bookInfo.children[1].children[0];
                        readbtn.style.backgroundColor = '#222222';
                        readbtn.style.color = 'white';
                    }
                });
            }

            // Book back to orginal position (non-clicked)
            function closeBook(openedBook) {
                // Reset variables to match the opened book
                bookContainer = openedBook.parentNode;
                removeBtn = bookContainer.children[0];
                bookInfo = bookContainer.children[2];

                bookContainer.style.alignItems = 'center'
                bookContainer.className = 'bookContainer bookContainerHover'
                openedBook.children[0].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'
                openedBook.children[1].style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(95deg) rotateZ(0deg) skew(0deg, 0deg)'
                openedBook.children[1].style.marginRight = '-225px'
                removeBtn.style.display = 'none'
                removeBtn.style.opacity = '0'
                bookInfo.style.display = 'none'
                bookInfo.style.opacity = '0'
                openedBook = 'none'
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
    });
};
       
const bookForm = document.querySelector('.form-inline');

// Book object constructor
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// Make new book object with user input from form
function getData() {
    let newBook = new Book(bookForm.title.value, bookForm.author.value, bookForm.num_pages.value, bookForm.read.value);
    displayBook(newBook);
}

// Display new book that is added by user (add to DOM)
function displayBook(newBook) {
    const div1 = document.createElement('div');
    div1.className = 'bookContainer bookContainerHover';
    div1.style.alignItems = 'center';
    const div2 = document.createElement('div');
    div1.appendChild(div2);
    div2.className = 'removeBtn';
    div2.style.opacity = 0;
    div2.style.display = 'none';
    const xBtn = document.createElement('button');
    div2.appendChild(xBtn);
    xBtn.textContent ='X';
    const div3 = document.createElement('div');
    div1.appendChild(div3);
    div3.className = 'bookObj';
    const div4 = document.createElement('div');
    div3.appendChild(div4);
    div4.className = 'bookSpine';
    div4.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)'
    if (newBook.pages <= 200) {
        div4.style.width = '45px'
    }
    if (newBook.pages >= 401) {
        div4.style.width = '90px'
    }
    const pTitle = document.createElement('p');
    pTitle.textContent = newBook.title;
    if (pTitle.textContent.length < 34) {
        pTitle.style.fontSize = 'x-large';
    }
    if (pTitle.textContent.length > 34) {
        pTitle.style.fontSize = 'large';
    }
    div4.appendChild(pTitle);
    const imgSpine = document.createElement('img');
    div4.appendChild(imgSpine);
    const div5 = document.createElement('div');
    div3.appendChild(div5);
    div5.className = 'bookCover';
    div5.style.transform = 'translate3d(0px, 0px, 0px) scale3d(1,1,1) rotateX(0deg) rotateY(95deg) rotateZ(0deg) skew(0deg, 0deg)'
    div5.style.marginRight = '-225px';
    const div6 = document.createElement('div');
    div1.appendChild(div6);
    div6.className = 'bookInfo';
    div6.style.opacity = '0';
    div6.style.display = 'none';
    const pNumPages = document.createElement('p');
    div6.appendChild(pNumPages);
    pNumPages.className = 'numPages';
    pNumPages.textContent = 'Number of Pages: ' + newBook.pages;
    const div7 = document.createElement('div');
    div6.appendChild(div7);
    div7.className = 'read';
    const rBtn = document.createElement('button');
    const notrBtn = document.createElement('button');
    div7.appendChild(rBtn);
    div7.appendChild(notrBtn);
    rBtn.className = 'readBtn';
    rBtn.textContent = 'Read';
    notrBtn.className = 'notReadBtn';
    notrBtn.textContent = 'Not Read';

    if (newBook.read === 'yes') {
        //Fill in read Button
        rBtn.style.backgroundColor = 'white';
        rBtn.style.color = 'black';
    } else if (newBook.read === 'no') {
        notrBtn.style.backgroundColor = 'white';
        notrBtn.style.color = 'black';
    }

    let title = newBook.title;
    title = title.toLowerCase().replace(/[^\w\s]/g, '');
    title = title.replace(/ /g, '%20');
    
    let author = newBook.author;
    author = author.toLowerCase().replace(/[^\w\s]/g, '');
    author = author.replace(/ /g, '%20');

    bookList.appendChild(div1);

    //Get highest res Book Cover using Google Books API
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + title + '&inauthor=' + author + '&key=AIzaSyCMGd387Sn1nJmhDCmHYsSV67zNBLsdojo')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            var imgLinks = JSON.parse(Get(response.items[0].selfLink));
            let coverLst = imgLinks.volumeInfo.imageLinks;
            let coverKey = Object.keys(coverLst)[Object.keys(coverLst).length - 1];
            let cover = coverLst[coverKey];
            cover = cover.replace('http', 'https');
            
            imgSpine.src = cover;
            let lastBook = bookList.children[bookList.children.length - 1];
            lastBook.children[1].children[1].style.backgroundImage = "url(" + cover + ")";            
            
        })
    
    function Get(yourUrl) {
        var Httpreq = new XMLHttpRequest();
        Httpreq.open("GET", yourUrl, false);
        Httpreq.send(null);
        return Httpreq.responseText;
    }
}