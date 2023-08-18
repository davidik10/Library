let title,author,pagesRead,pagesTotal;
let bookCard,bookCards,bookIndex;
let library = [];
let clicked = false;
const form =  document.querySelector('form');

//Creating forms when 'addBook' button is clicked
const addBook = document.querySelector('.addBook');
addBook.addEventListener('click', (e) => {
    if (clicked === true) return; //Avoid creating another form if button is already clicked
    else {
        createForm(e);
    }
});

//Books constructor function
function Book(title,author,pagesRead,pagesTotal) {
    this.title = title;
    this.author = author;
    this.pagesRead = pagesRead;
    this.pagesTotal = pagesTotal;
}

//Creating form
 function createForm(e) {
        clicked = true; 
        form.style.background = 'linear-gradient(to right,rgb(120, 37, 197),rgb(38, 216, 223))'
        //Creating 4 divs with a label and input in each one for the form
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
                div.appendChild(label);
                div.appendChild(input);
                form.appendChild(div);
            }
            if (i === 1) {
                label.setAttribute('label', 'author');
                label.textContent = 'Author:';
                input.setAttribute('type','text');
                input.setAttribute('id','author');
                div.appendChild(label);
                div.appendChild(input);
                form.appendChild(div);
            }
            if (i === 2) {
                input.removeAttribute('required','');
                label.setAttribute('label', 'from');
                label.textContent = 'Pages Read:';
                input.setAttribute('type','number');
                input.setAttribute('id','from');
                input.setAttribute('min','0');
                input.setAttribute('value','0');
                div.appendChild(label);
                div.appendChild(input);
                form.appendChild(div);
            }
            if (i === 3) {
                console.log(document.getElementById('from').value)
                input.removeAttribute('required','');
                label.setAttribute('label', 'to');
                label.textContent = 'Pages Total:';
                input.setAttribute('type','number');
                input.setAttribute('id','to');
                input.setAttribute('min',`1`);
                div.appendChild(label);
                div.appendChild(input);
                form.appendChild(div);
            }
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

//Getting user inputs from the form
function getInputs(e) {
    const titleInput = document.getElementById('title');
    title = titleInput.value;
    const authorInput = document.getElementById('author');
    author = authorInput.value;
    const pagesReadInput = document.getElementById('from');
    pagesRead = pagesReadInput.value;
    const pagesTotalInput = document.getElementById('to');
    pagesTotal = pagesTotalInput.value;
}

//Adding book constractor to an array
function addBookToLibrary(e) {
    const book = new Book(title,author,pagesRead,pagesTotal)
    library.push(book);
    console.table(library)
    booksDisplay(library);
}

//Initialize form
function removeForm(e) {
    clicked = false;
    form.innerHTML = '';
    form.style.background = 'transparent'
}

//Display book cards in an interactive grid display
function booksDisplay(library) {
    bookCards = document.querySelector('.bookCards')
    //For every book in the library array display it in a 'book cover' card with the user inputs and language 
    library.forEach(book => {
        bookCard = document.createElement('div');
        bookCard.classList.add('card');
        const title = document.createElement('h1');
        const author = document.createElement('p');
        const remove = document.createElement('button');
        remove.classList.add('remove');
        bookIndex = library.indexOf(book) 
        title.textContent = `${book.title}`;
        bookCard.appendChild(title);
        author.textContent = `Author: ${book.author}`;
        bookCard.appendChild(author);
        pagesDisplay(book);
        remove.textContent = 'Remove';
        bookCard.appendChild(remove);
        bookCard.setAttribute('data-index', `${bookIndex}`);
        console.log(bookCard);
    });
    bookCards.appendChild(bookCard);
    removeBook(library);
}

//Display pages toggle, if the book is finished, remove the toggle and display - 'finished' text instead
function pagesDisplay(book) {
    const pages = document.createElement('div');
    const pagesToggle = document.createElement('input');
    pages.classList = 'pages';
    const pagesText = document.createElement('span');
    pagesText.textContent = `${book.pagesRead} / ${book.pagesTotal}`;
    pagesToggle.type = 'range';
    pagesToggle.value = book.pagesRead;
    pagesToggle.max = book.pagesTotal;
    pagesToggle.addEventListener('change',(e) => {
        if (e.target.value === pagesTotal) {
            pages.textContent = 'Finished';
            pages.style.color = 'green';
        }
        else {
            pagesText.textContent = `${e.target.value} / ${book.pagesTotal}`;
            pagesText.style.color = 'black';
        }
    });
    pages.textContent = 'Pages:';
    // Don't diasplay the pages toggle or text if the user hasn't submit it
        if (pagesTotal !== '') {
            pages.appendChild(pagesToggle);
            pages.appendChild(pagesText);
            bookCard.appendChild(pages);
        }
}

//Remove the book card from the screen grid and from the library array if the 'remove' button is clicked
function removeBook(library) {
    const removeButtons = document.querySelectorAll('.remove')
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            button.parentNode.remove();
            let book = button.parentNode.getAttribute('data-index')
            bookIndex = library.indexOf(library[book]);
            library.splice(bookIndex,1);
        });
    });
}

