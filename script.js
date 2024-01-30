const bookList = document.querySelector('.book-list');
const newBookForm = document.querySelector('.new-book-form');
const btnNewBook = document.querySelector('.new-book');
const btnSubmit = document.querySelector('.submit');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
const bookIsRead = document.querySelector('#is-read');
const errorMsg = document.querySelector('.error-msg');

const myLibrary = [ 
    {title:'book-1',author:'me',pages:100,isRead:true},
    {title:'book-2',author:'me',pages:200,isRead:false},
    {title:'book-3',author:'me',pages:300,isRead:true}
];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function addBookToLibrary(title = 'unknown', author = 'unknown', pages = 'unknown', isRead = false) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    let bookContainer = document.createElement('li');
    let bookDiv = document.createElement('div');
    let bookInfo = `Title: ${book.title}, Author: ${book.author}, Number of pages: ${book.pages}`;
    bookDiv.textContent = bookInfo;
    let btnToggleRead = document.createElement('button');
    btnToggleRead.setAttribute('type','checkbox');
    isRead ? btnToggleRead.textContent = 'Status: Read' : btnToggleRead.textContent = 'Status: Unread';
    let btnRemove = document.createElement('button');
    btnRemove.textContent = 'Remove';
    bookList.appendChild(bookContainer);
    bookContainer.appendChild(bookDiv);
    bookContainer.appendChild(btnToggleRead);
    bookContainer.appendChild(btnRemove);

    btnToggleRead.addEventListener('click', () => {
        if (btnToggleRead.textContent === 'Status: Unread') {
            btnToggleRead.textContent = 'Status: Read';
            book.isRead = true;
        } else {
            btnToggleRead.textContent = 'Status: Unread';
            book.isRead = false;
        }
    })

    btnRemove.addEventListener('click', () => {
        bookContainer.remove();
    })
}

function toggleFormDisplay() {
    var form = document.querySelector('.new-book-form');
    if (form.style.display === 'none') {
      form.style.display = 'block';
    } else {
      form.style.display = 'none';
    }
}

myLibrary.forEach(book => {
    addBookToLibrary(book.title,book.author,book.pages,book.isRead);
});

toggleFormDisplay();

btnNewBook.addEventListener('click',(event) => {
    toggleFormDisplay();
    newBookForm.reset();
});

btnSubmit.addEventListener('click', (event) => {
    if (bookTitle.validity.valueMissing) {
        errorMsg.textContent = 'Missing Title Input';
        return;
    }
    if (bookAuthor.validity.valueMissing) {
        errorMsg.textContent = 'Missing Author Input';
        return;
    }
    if (bookPages.validity.valueMissing) {
        errorMsg.textContent = 'Missing Pages Value';
        return;
    }
    if (bookPages.validity.rangeOverflow) {
        errorMsg.textContent = 'Page number cannot be more than 100';
        return;
    }
    if (bookPages.validity.rangeUnderflow) {
        errorMsg.textContent = 'Page number cannot be less than 1';
        return;
    }
    addBookToLibrary(bookTitle.value,bookAuthor.value,bookPages.value,bookIsRead.checked);
    toggleFormDisplay();
    newBookForm.reset();
});

