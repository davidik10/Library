const addBook = document.querySelector('.addBook');
addBook.addEventListener('click', addBookToLibrary);

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

const theHobbit = new Book
('The Hobbit','J.R.R. Tolkien',295, 'not read yet');

/* console.log(theHobbit.info())  */

function addBookToLibrary(e) {
    const library = [];
    const title = prompt("Book Title:");
    const author = prompt("Author:");
    const pages = prompt("Pages:");
    const readStatus = prompt("Read:", false);
    const book = new Book(title,author,pages,readStatus)
    library.push(book);
    console.table(library)
    booksDisplay(library);
}


function booksDisplay(library) {
    const bookCards = document.querySelector('.bookCards')
    library.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        const title = document.createElement('p');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const readStatus = document.createElement('p');
        title.textContent = `${book.title}`;
        bookCard.appendChild(title);
        author.textContent = `Author: ${book.author}`;
        bookCard.appendChild(author);
        pages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pages);
        readStatus.textContent = `Read: ${book.readStatus}`;
        bookCard.appendChild(readStatus);
        bookCards.appendChild(bookCard);
    });
}

