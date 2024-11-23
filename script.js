const myLibrary = [];

class Book {
  constructor(title, author, page, readInfo) {
    this.title = title,
    this.author = author,
    this.page = page,
    this.readInfo = readInfo,
    this.info = function () {
      return (this.title + ' by ' + this.author + ' consisting of ' + this.page + ' pages is ' + this.readInfo);
      };
  }
}
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '1000', 'read');
const gameOfThrones = new Book('Game of Thrones', 'George R R Martin', '1300', 'unread');
const theAlchemist = new Book('The Alchemist', 'Paulo Coelho', '115', 'read');
myLibrary.push(theHobbit);
myLibrary.push(gameOfThrones);

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);
  displayBook(book);
}
addBookToLibrary(theAlchemist);

//Write a function that loops through the array and displays each book
var index = 0;
function displayBook(book){
  for (index; index < myLibrary.length; index++) {
    makeCard(myLibrary[index].title, myLibrary[index].author, myLibrary[index].page, myLibrary[index].readInfo, index, book);
  }
}
//take book information as input in form 
  const dialog = document.getElementById('dialog');
  const bookForm = document.createElement('form');
  bookForm.className = 'bookForm';
  
  //make the input elements of the form
  const title = document.createElement('input');
  title.className = 'title';
  title.id = 'title';
  title.type = 'text';
  title.placeholder = 'book-name';
  const label1 = document.createElement("label");
  label1.textContent = "Book Name:";
  label1.setAttribute("for", "title");
  
  const author = document.createElement('input');
  author.className = 'author';
  author.id = 'author';
  author.type = 'text';
  author.placeholder = 'name-of-author';
  const label2 = document.createElement('label');
  label2.textContent = 'Author Name:';
  label2.setAttribute('for', 'author');
  
  const totalPages = document.createElement('input');
  totalPages.className = 'totalPages';
  totalPages.id = 'totalPages';
  totalPages.type = 'number';
  totalPages.placeholder = 'no-of-pages';
  const label3 = document.createElement('label');
  label3.textContent = 'Total Pages:';
  label3.setAttribute('for', 'totalPages');
  
  const readInfo = document.createElement('select');
  readInfo.className = 'readInfo';
  readInfo.id = 'readInfo';
  const option1 = document.createElement("option");
  option1.value = 'read';
  option1.text = 'read';
  const option2 = document.createElement('option');
  option2.value = 'unread';
  option2.text = 'unread';
  const label4 = document.createElement('label');
  label4.textContent = 'Book Read Status:';
  label4.setAttribute('for', 'readInfo');
  
  const submit = document.createElement('button');
  submit.type = 'submit';
  submit.textContent = 'submit';
  
  //append all the inputs to the form as parent 
  bookForm.appendChild(title);
  title.parentNode.insertBefore(label1, title);
  
  bookForm.appendChild(author);
  author.parentNode.insertBefore(label2, author);
  
  bookForm.appendChild(totalPages);
  totalPages.parentNode.insertBefore(label3, totalPages);
  
  bookForm.appendChild(readInfo);
  readInfo.parentNode.insertBefore(label4, readInfo);
  readInfo.appendChild(option1);
  readInfo.appendChild(option2);
  
  bookForm.appendChild(submit);
  
  //append the form to the dialog
  dialog.appendChild(bookForm);

//open the form as dialog box upon clicking new book button
const newBook = document.querySelector('.newBook');
newBook.addEventListener('click', function() {
  //openForm();
  dialog.showModal();
  }
);

//take the inputs of the form in separate variable
const form = document.querySelector(".bookForm");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent default form submission

  // Get the values from the form inputs
  const bookName = title.value;
  const bookAuthor = author.value;
  const pages = totalPages.value;
  const readStatus = readInfo.value;
  // Call your object with the form input values
  const inputBook = new Book(bookName, bookAuthor, pages, readStatus);
  addBookToLibrary(inputBook);
  dialog.close();               //close the dialog box and submit the form
});

//make card for each book input 
function makeCard(bookName, bookAuthor, pages, readStatus, index, book) {
  const cardHolder = document.querySelector('.card-container');

  const card = document.createElement('div');
  card.id = `card ${index}`;
  card.className = 'card';

  const name = document.createElement('div');
  name.textContent = `"${bookName}"`;

  const author = document.createElement('div');
  author.textContent = 'by:- ' + bookAuthor;

  const totalPages = document.createElement('div');
  totalPages.textContent = pages + ' pages';

  const readInfoButton = document.createElement('button');
  readInfoButton.className = 'readStatus';
  readInfoButton.textContent = readStatus;
  readInfoButton.addEventListener('click', function(){
    changeReadStatus(index, readInfoButton);
  });

  const removeButton = document.createElement('button');
  removeButton.className = 'remove';
  removeButton.textContent = 'remove';
  removeButton.addEventListener('click', function(){
    removeCard(index);
  });

  //append them to the card container
  card.appendChild(name);
  card.appendChild(author);
  card.appendChild(totalPages);
  card.appendChild(readInfoButton);
  card.appendChild(removeButton);

  cardHolder.appendChild(card);
}
//remove the card on click
function removeCard(ind){
  const parentDiv = document.getElementById('card-container');
  const divToRemove = document.getElementById(`card ${ind}`);
  parentDiv.removeChild(divToRemove);
  myLibrary.splice(ind, 1);
  index--;
}
//change read status
function changeReadStatus(index, readInfoButton){
  const read = readInfoButton;
  if(read.textContent == 'read'){
    read.textContent = 'unread';
    changeValue(index, 'unread');
  }
  else{
    read.textContent = 'read';
    changeValue(index, 'read');
  } 
}
//change the value of readInfo in the library array
function changeValue(index, newValue) {
    myLibrary[index].readInfo = newValue;
}
//Object.setPrototypeOf(Book, changeValue);
displayBook();