// Book list
const myLibrary = [
  {
    Title: "The Art of War",
    Author: "Sun Tzu",
    Pages: 200,
    Status: "Reading",
    ID: crypto.randomUUID(),
  },
];

// Book construct
class Book {
  constructor(title, author, pages, read) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Read = read;
    this.ID = crypto.randomUUID();
  }
}

// Create a new book
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}