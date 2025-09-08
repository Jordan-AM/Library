class Book {
  constructor(title, author, pages, status) {
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Status = status;
    this.ID = crypto.randomUUID();
  }
}

const myLibrary = [
  new Book("The Art of War", "Sun Tzu", 200, "Read"),
  new Book("The Prince", "Machiavelli", 180, "Not Read"),
  new Book("The Book of Five Rings", "Miyamoto Musashi", 232, "Not Read"),
];

// Functions--------------------------------------------
function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
}

function renderLibrary() {
  const tableBody = document.querySelector(".table-body");
  tableBody.innerHTML = "";

  myLibrary.forEach((book) => {
    const row = document.createElement("tr");
    row.classList.add("table-row", "transition");

    row.innerHTML = `
      <td class="table-data title text"><span class="table-text">${book.Title}</span></td>
      <td class="table-data author text"><span class="table-text">${book.Author}</span></td>
      <td class="table-data pages text"><span class="table-text">${book.Pages}</span></td>
      <td class="table-data status text"><span class="table-text">${book.Status}</span></td>
      <td class="table-data action text">
        <button class="edit-btn button transition" data-id="${book.ID}">
          <i class="fa-solid fa-pen-to-square"></i>
        </button>
        <button class="remove-btn button transition" data-id="${book.ID}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = e.target.closest("button").getAttribute("data-id");
      openEditModal(bookId);
    });
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const targetButton = e.target.closest("button");
      const bookId = targetButton.getAttribute("data-id");
      removeBook(bookId);
    });
  });
}

function createModal() {
  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const form = document.createElement("form");
  form.id = "form";

  form.innerHTML = `
    <h2 class="transition">Add a New Book</h2>
    <label>Title: <input type="text" name="title" placeholder="The Art of War" required /></label>
    <label>Author: <input type="text" name="author" placeholder="Sun Tzu" required /></label>
    <label>Pages: <input type="number" name="pages" required min="1" placeholder="200"/></label>
    <label>Status:
      <select name="status" required>
        <option value="Read">Read</option>
        <option value="Reading">Reading</option>
        <option value="Not Read">Not Read</option>
      </select>
    </label>
    <div class="modal-buttons">
      <button type="submit" id="add-btn" class="transition">Add Book</button>
      <button type="button" id="cancel-btn" class="transition">Cancel</button>
    </div>
  `;

  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

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

  const newBook = new Book(
    formData.get("title"),
    formData.get("author"),
    parseInt(formData.get("pages")),
    formData.get("status")
  );

  myLibrary.push(newBook);
  renderLibrary();
  closeModal();
}

function removeBook(id) {
  const index = myLibrary.findIndex((book) => book.ID === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    renderLibrary();
  }
}

function openEditModal(id) {
  const book = myLibrary.find((b) => b.ID === id);
  if (!book) return;

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const form = document.createElement("form");
  form.id = "editForm";

  form.innerHTML = `
    <h2 class="transition">Edit Book</h2>
    <label>Title: <input type="text" name="title" value="${book.Title}" required /></label>
    <label>Author: <input type="text" name="author" value="${book.Author}" required /></label>
    <label>Pages: <input type="number" name="pages" value="${book.Pages}" required min="1" /></label>
    <label>Status:
      <select name="status" required>
        <option value="Read" ${book.Status === "Read" ? "selected" : ""}>Read</option>
        <option value="Reading" ${book.Status === "Reading" ? "selected" : ""}>Reading</option>
        <option value="Not Read" ${book.Status === "Not Read" ? "selected" : ""}>Not Read</option>
      </select>
    </label>
    <div class="modal-buttons">
      <button type="submit" class="transition">Save Changes</button>
      <button type="button" id="cancel-edit" class="transition">Cancel</button>
    </div>
  `;

  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    book.Title = formData.get("title");
    book.Author = formData.get("author");
    book.Pages = parseInt(formData.get("pages"));
    book.Status = formData.get("status");

    renderLibrary();
    overlay.remove();
  });

  document.getElementById("cancel-edit").addEventListener("click", () => overlay.remove());
}

const newBook = document.querySelector(".new-book");
newBook.addEventListener("click", createModal);
renderLibrary();
