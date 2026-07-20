const myLib = [];

function Book(title, author, pages, read) {
  this.t = title;
  this.a = author;
  this.p = pages;
  this.r = read === true ? "read" : "unread";
  this.id = crypto.randomUUID();
}

const cardGrid = document.querySelector(".cardGrid");

Book.prototype.toggleStatus = function () {
  if (this.r == "read") {
    this.r = "unread";
  } else if (this.r == "unread") {
    this.r = "read";
  }
};

function displayBooks() {
  cardGrid.innerHTML = "";

  myLib.forEach((book) => {
    const card = document.createElement("div");

    card.classList.add("bookCard");
    card.setAttribute("data-id", book.id);

    card.innerHTML = `
      <h3 class="title">${book.t}</h3>
      <p class="author">${book.a}</p>
      <p class="pages">${book.p}</p>
      <div class="status">${book.r}</div>
      <div class="cardBtns">
        <button class="toggleBtn">Toggle Status</button>
        <button class="removeBtn">Remove</button>
      </div>
    `;

    const removeBtn = card.querySelector(".removeBtn");
    const toggleBtn = card.querySelector(".toggleBtn");

    removeBtn.addEventListener("click", () => {
      let a = 0;

      for (a; a < myLib.length; a++) {
        let thebook = myLib[a];
        if (thebook.id === book.id) {
          break;
        }
      }

      myLib.splice(a, 1);
      displayBooks();
    });

    toggleBtn.addEventListener("click", () => {
      book.toggleStatus();
      displayBooks();
    });

    cardGrid.appendChild(card);
  });
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLib.push(book);
  displayBooks();
}

addBookToLibrary("book1", "author1", 11, true);
addBookToLibrary("book2", "author2", 12, false);

const addbookbtn = document.querySelector(".addBtn");
const dialog = document.getElementById("newBookDialog");
const form = document.getElementById("newBookForm");

addbookbtn.addEventListener("click", () => {
  dialog.showModal();
});

document.getElementById("cancelBtn").addEventListener("click", () => {
  dialog.close();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title1 = document.getElementById("title").value;
  const author1 = document.getElementById("author").value;
  const pages1 = document.getElementById("pages").value;
  const read1 = document.getElementById("read").checked;

  addBookToLibrary(title1, author1, pages1, read1);

  form.reset();
  dialog.close();
  displayBooks();
});