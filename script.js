let title,author,pages,read;
let bookCard,bookCards,bookIndex;
let library = [];
const form =  document.querySelector('form');

const addBook = document.querySelector('.addBook');
addBook.addEventListener('click', createForm);

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
    //e.preventDefault();
    
    const book = new Book(title,author,pages,read)
    library.push(book);
    console.table(library)
    booksDisplay(library);
}

function removeBookFromLibrary(e){

}

 function createForm(e){
    form.style.background = 'linear-gradient(to right,rgb(120, 37, 197),rgb(38, 216, 223))'
    for (let i=0; i<4; i++) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.setAttribute('required','');
        if (i === 0) {
            label.setAttribute('label', 'title');
            label.textContent = 'Book Title:';
            input.setAttribute('type','text');
            input.setAttribute('id','title');
            //title = input.value;
            console.log(input);
        }
        if (i === 1) {
            label.setAttribute('label', 'author');
            label.textContent = 'Author:';
            input.setAttribute('type','text');
            input.setAttribute('id','author');
            //author = input.value;
        }
        if (i === 2) {
            label.setAttribute('label', 'pages');
            label.textContent = 'Pages:';
            input.setAttribute('type','number');
            input.setAttribute('id','pages');
        }
        if (i === 3) {
            input.removeAttribute('required','');
            label.setAttribute('label', 'read');
            label.textContent = `Read:`;
            input.setAttribute('type','checkbox');
            input.setAttribute('id','read');
            //read = input.value;
        }
        
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    }
    const button = document.createElement('button');
    button.setAttribute('type','submit');
    button.textContent = 'Add';
    form.appendChild(button);
    
    form.addEventListener('submit',(e) => {
        e.preventDefault();
        getInputs(e);
        addBookToLibrary(e);
        removeForm(e);
        
    });
} 


function getInputs(e) {
    const titleInput = document.getElementById('title');
    console.log(titleInput)
    title = titleInput.value;
    const authorInput = document.getElementById('author');
    author = authorInput.value;
    const pagesInput = document.getElementById('pages');
    pages = pagesInput.value;
    const readInput = document.getElementById('read');
    if (readInput.checked) read = 'yes';
    else read = 'no';
    console.log(read)
}

function removeForm(e) {
    form.innerHTML = '';
    form.style.background = 'transparent'
}

function booksDisplay(library) {
    bookCards = document.querySelector('.bookCards')
    library.forEach(book => {
        bookCard = document.createElement('div');
        bookCard.classList.add('card');
        //bookCard.style.backgroundImage = 'url("/img/book.png")';
        //bookCard.style.backgroundSize = 'cover';
        const title = document.createElement('h1');
        const author = document.createElement('p');
        const pages = document.createElement('p');
        const read = document.createElement('p');
        const remove = document.createElement('button');
        remove.classList.add('remove');
        bookIndex = library.indexOf(book) 
        title.textContent = `${book.title}`;
        bookCard.appendChild(title);
        author.textContent = `Author: ${book.author}`;
        bookCard.appendChild(author);
        pages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pages);
        read.textContent = `Read: ${book.read}`;
        bookCard.appendChild(read);
        remove.textContent = 'Remove';
        bookCard.appendChild(remove);
        bookCard.setAttribute('data-index', `${bookIndex}`);
        console.log(bookCard);
    });
    bookCards.appendChild(bookCard);
    removeBook(library);
}

function removeBook(library) {
    const removeButtons = document.querySelectorAll('.remove')
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            button.parentNode.remove();
            let book = button.parentNode.getAttribute('data-index')
            bookIndex = library.indexOf(library[book]);
            library.splice(bookIndex,1);
            console.table(library)
        });
    });
}

