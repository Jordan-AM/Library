const myLibrary = [
  // Book list
  {
    Title: "The Art of War",
    Author: "Sun Tzu",
    Pages: 200,
    Status: "Not Read",
    ID: crypto.randomUUID(),
  },
  {
    Title: "The Prince",
    Author: "Machiavelli",
    Pages: 200,
    Status: "Not Read",
    ID: crypto.randomUUID(),
  },
];

class Book {
  // Book construct
  constructor(title, author, pages, status) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Status = status;
    this.ID = crypto.randomUUID();
  }
}

// Functions--------------------------------------------
function addBookToLibrary(title, author, pages, status) {
  // Create a new book object
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
}

function renderLibrary() {
  const tableBody = document.querySelector(".table-body");
  tableBody.innerHTML = ""; // Clear existing rows

  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    row.classList.add("table-row");

    row.innerHTML = `
      <td class="table-data title text"><span class="table-text">${book.Title}</span></td>
      <td class="table-data author text"><span class="table-text">${book.Author}</span></td>
      <td class="table-data pages text"><span class="table-text">${book.Pages}</span></td>
      <td class="table-data status text"><span class="table-text">${book.Status}</span></td>
    `;

    tableBody.appendChild(row);
  });
}

function createModal() {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const form = document.createElement("form");
  form.id = "bookForm";

  form.innerHTML = `
    <h2>Add a New Book</h2>
    <label>Title: <input type="text" name="title" required /></label>
    <label>Author: <input type="text" name="author" required /></label>
    <label>Pages: <input type="number" name="pages" required min="1" /></label>
    <label>Status:
      <select name="status" required>
        <option value="Read">Read</option>
        <option value="Reading">Reading</option>
        <option value="Not Read">Not Read</option>
      </select>
    </label>
    <div class="modal-buttons">
      <button type="submit" id="add-btn">Add Book</button>
      <button type="button" id="cancel-btn">Cancel</button>
    </div>
  `;

  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Event listeners
  form.addEventListener("submit", handleFormSubmit);
  document.getElementById("cancel-btn").addEventListener("click", closeModal);
}

function closeModal() {
  const overlay = document.querySelector(".modal-overlay");
  if (overlay) overlay.remove();
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  const newBook = {
    Title: formData.get("title"),
    Author: formData.get("author"),
    Pages: parseInt(formData.get("pages")),
    Status: formData.get("status"),
    ID: crypto.randomUUID(),
  };

  myLibrary.push(newBook);
  renderLibrary();
  closeModal();
}
const newBook = document.querySelector(".new-book");
// Update ----------------------------------------------
newBook.addEventListener("click", createModal);
// Rendering -------------------------------------------
renderLibrary();
