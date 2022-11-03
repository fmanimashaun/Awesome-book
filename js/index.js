/* eslint-disable max-classes-per-file */

// js to access html elements
const navBar = document.querySelector('.header__nav-list');
const navListItem = navBar.querySelectorAll('.header__nav-item');
const bookListDiv = document.querySelector('.books');
const addNewBookForm = document.querySelector('.add__book-form');
const listDiv = document.querySelector('.book__collection');
const formDiv = document.querySelector('.add__book');
const contactDiv = document.querySelector('.contact');
const dateDisplay = document.querySelector('.header__date');

// create a date-time function
const CurrentDateTime = () => {
  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = dateObject.toLocaleString('default', { month: 'long' });
  const day = dateObject.getDay();
  const hour = dateObject.getHours();
  const min = dateObject.getMinutes();
  const sec = dateObject.getSeconds();

  let date = '';
  let time = '';

  // create the time string
  if (hour >= 12) {
    time += `${hour - 12}:${min}:${sec} pm`;
  } else {
    time += `${hour}:${min}:${sec} am`;
  }

  // create the date string
  if (day === 1 || day === 21 || day === 31) {
    date += `${month} ${day}st ${year}`;
  } else if (day === 2 || day === 22) {
    date += `${month} ${day}nd ${year}`;
  } else if (day === 3 || day === 23) {
    date += `${month} ${day}rd ${year}`;
  } else {
    date += `${month} ${day}th ${year}`;
  }

  dateDisplay.innerHTML = `${date}, ${time}`;
};

setInterval(CurrentDateTime, 1000);

// create a bookListing class
class BookListing {
  // declare a constructor function
  constructor() {
    if (localStorage.getItem('bookList')) {
      this.list = [...JSON.parse(localStorage.getItem('bookList'))];
    } else {
      this.list = [];
    }
  }

  // create a display method
  displayList() {
    // clear the current list UI
    bookListDiv.innerHTML = '';

    // checking the number of books in the book list container
    if (this.list.length === 0) {
      // create a empty message element with a class 'book__empty'
      const emptyMsg = document.createElement('p');
      emptyMsg.className = 'book__empty';
      emptyMsg.innerText = 'Empty Book Collection';

      // Append the book card to the parent node
      bookListDiv.appendChild(emptyMsg);
    } else {
      // Loop through the array given
      this.list.forEach((book, id) => {
        // create a book card with a class 'book'
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';

        // create a book details p with the class 'book__details'
        const bookDetails = document.createElement('p');
        bookDetails.className = 'book__details';
        bookDetails.innerText = `"${book.title}" by ${book.author}`;

        // Create the delete button with a class 'book__remove-btn'
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'book__remove-btn';
        deleteBtn.innerText = 'Remove';

        // Attach a listener to the remove botton for delete function
        deleteBtn.addEventListener('click', () => {
          this.removeBookFromList(id);
        });

        bookDiv.appendChild(bookDetails);
        bookDiv.appendChild(deleteBtn);

        // Append the book card to the parent node
        bookListDiv.appendChild(bookDiv);
      });
    }
  }

  // create a book method
  addToList(newBook) {
    // update the book list with the new book
    this.list.push(newBook);

    // update the local storage with the new books
    localStorage.setItem('bookList', JSON.stringify(this.list));

    // update the page with the new book
    this.displayList();
  }

  // create delete book method
  removeBookFromList(index) {
    // Delete book at the given index
    this.list.splice(index, 1);

    // update the local storage with the current state of book list
    localStorage.setItem('bookList', JSON.stringify(this.list));

    // update the page with the current state of book list
    this.displayList();
  }
}

class Book {
  constructor() {
    this.title = document.querySelector('#title').value;
    this.author = document.querySelector('#author').value;
  }
}

// create an instance of a book listing
const bookList = new BookListing();

// add event listener to form
addNewBookForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // create an instance of a book from book class
  const newbook = new Book();
  bookList.addToList(newbook);
  addNewBookForm.reset();
});

// Add event listener to window reload
window.addEventListener('load', () => {
  // load page content
  bookList.displayList();
});

// Add an event listener to the navbar
navBar.addEventListener('click', (event) => {
  if ((event.target.matches('li'))
    && (event.target.innerHTML === 'Add new')) { // checking if the clicked tab is the "add new" tab
    navListItem.forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    // adding active class to the clicked tab
    event.target.classList.add('active');

    // Remove the hidden class from the active section and add it to others
    formDiv.classList.remove('hidden');
    if (!(listDiv.classList.contains('hidden')) && !(contactDiv.classList.contains('hidden'))) {
      listDiv.classList.add('hidden');
      contactDiv.classList.add('hidden');
    } else if (!(listDiv.classList.contains('hidden')) && (contactDiv.classList.contains('hidden'))) {
      listDiv.classList.add('hidden');
    } else if ((listDiv.classList.contains('hidden')) && !(contactDiv.classList.contains('hidden'))) {
      contactDiv.classList.add('hidden');
    }
  } else if ((event.target.matches('li'))
    && (event.target.innerHTML === 'Contact')) { // checking if the clicked tab is the "Contact" tab
    navListItem.forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    // adding active class to the clicked tab
    event.target.classList.add('active');

    // Remove the hidden class from the active section and add it to others
    contactDiv.classList.remove('hidden');
    if (!(listDiv.classList.contains('hidden')) && !(formDiv.classList.contains('hidden'))) {
      listDiv.classList.add('hidden');
      formDiv.classList.add('hidden');
    } else if (!(listDiv.classList.contains('hidden')) && (formDiv.classList.contains('hidden'))) {
      listDiv.classList.add('hidden');
    } else if ((listDiv.classList.contains('hidden')) && !(formDiv.classList.contains('hidden'))) {
      formDiv.classList.add('hidden');
    }
  } else { // checking if the clicked tab is the "List" tab
    navListItem.forEach((item) => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });

    // adding active class to the clicked tab
    event.target.classList.add('active');

    // Remove the hidden class from the active section and add it to others
    listDiv.classList.remove('hidden');
    if (!(formDiv.classList.contains('hidden')) && !(contactDiv.classList.contains('hidden'))) {
      contactDiv.classList.add('hidden');
      formDiv.classList.add('hidden');
    } else if (!(formDiv.classList.contains('hidden')) && (contactDiv.classList.contains('hidden'))) {
      formDiv.classList.add('hidden');
    } else if ((formDiv.classList.contains('hidden')) && !(contactDiv.classList.contains('hidden'))) {
      contactDiv.classList.add('hidden');
    }
  }
});
