// Shorthand Selector
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// ====================
// Initial Data
// ====================
let dataBooks = [
  {
    id: 100,
    name: "Refactoring",
    author: "Martin Fowler",
    topic: "Programming",
  },
  {
    id: 101,
    name: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    topic: "Database",
  },
  {
    id: 102,
    name: "The Phoenix Project",
    author: "Gene Kim",
    topic: "DevOps",
  },
];

// List book show in table
let listBooks = [];
let currentHandleBook = {};

// ====================
// Functions Handler
// ====================
// Handle: Render Store Table
const renderStoreTable = () => {
  // prettier-ignore
  const storeProductsHTML = listBooks.reduce((productHTML, book, index) => {
    return (
        productHTML += 
        `<tr class="product__item" data-index="${book.id}">
            <td>${index + 1}</td>
            <td>${book.name}</td>
            <td>${book.author}</td>
            <td>${book.topic}</td>
            <td class="item__action">
          <button class="modal__update" onClick="handleOpenModalUpdate(${book.id})">Update</button>
          <button class="modal__delete" onClick="handleOpenModalDelete(${book.id})">Delete</button>
            </td>
        </tr>`
    );
  }, "");

  $("#store__product table tbody").innerHTML = storeProductsHTML;
};

// Handle: Load document
const handleLoadDocument = () => {
  const getBooksLS = JSON.parse(localStorage.getItem("bookStore"));
  if (getBooksLS) {
    dataBooks = [...getBooksLS];
  }

  listBooks = [...dataBooks];

  renderStoreTable();
};

// Handle: Search book
const handleSearchBook = (keyword) => {
  if (keyword === "") {
    listBooks = [...dataBooks];
  }

  keyword = keyword.toLowerCase();
  listBooks = dataBooks.filter((book) => {
    return book.name.toLowerCase().includes(keyword);
  });

  renderStoreTable();
};

// Handle: Open Modal Add book
const handleOpenModalAdd = () => {
  $("#modal__container").style.display = "flex";
  $("#modal__container .modal.modal__add").style.display = "flex";
};

// Handle: Open Modal Update book
const handleOpenModalUpdate = (id) => {
  $("#modal__container").style.display = "flex";
  $("#modal__container .modal.modal__update").style.display = "flex";

  currentHandleBook = dataBooks.find((book) => book.id === id);
  $(".modal__update form input#input__name").value = currentHandleBook.name;
  $(".modal__update form input#input__author").value = currentHandleBook.author;
  $(".modal__update form select#input__topic").value = currentHandleBook.topic;
};

// Handle: Open Modal Delete book
const handleOpenModalDelete = (id) => {
  $("#modal__container").style.display = "flex";
  $("#modal__container .modal.modal__delete").style.display = "flex";

  currentHandleBook = dataBooks.find((book) => book.id === id);
  $(".modal__delete .content .content__book").innerHTML = currentHandleBook.name;
};

// Handle: Close Modal
const handleCloseModal = () => {
  console.log("Close Modal");
  $("#modal__container .modal.modal__add").style.display = "none";
  $("#modal__container .modal.modal__update").style.display = "none";
  $("#modal__container .modal.modal__delete").style.display = "none";
  $("#modal__container").style.display = "none";
};

// Handle: Add book
const handleAddBook = () => {
  console.log("Add Book");
  const dataForm = new FormData($(".modal__add .content form"));
  const newBookId = dataBooks.slice(-1)[0].id + 1;
  const newBook = {
    id: newBookId,
    name: dataForm.get("name"),
    author: dataForm.get("author"),
    topic: dataForm.get("topic"),
  };

  dataBooks.push(newBook);
  listBooks.push(newBook);

  $(".modal__update form input#input__name").value = "";
  $(".modal__update form input#input__author").value = "";
  $(".modal__update form select#input__topic").value = "";

  localStorage.setItem("bookStore", JSON.stringify(dataBooks));
  handleCloseModal();
  renderStoreTable();
};

// Handle: Update book
const handleUpdateBook = (currentHandleBook) => {
  console.log("Update Book");
  const dataForm = new FormData($(".modal__update .content form"));

  dataBooks = dataBooks.map((book) => {
    if (book.id == currentHandleBook.id) {
      return {
        ...book,
        name: dataForm.get("name"),
        author: dataForm.get("author"),
        topic: dataForm.get("topic"),
      };
    } else return book;
  });

  listBooks = [...dataBooks];

  localStorage.setItem("bookStore", JSON.stringify(dataBooks));
  handleCloseModal();
  renderStoreTable();
};

// Handle: Delete book
const handleDeleteBook = (currentHandleBook) => {
  console.log("Delete Book");

  dataBooks = dataBooks.filter((book) => {
    return book.id !== currentHandleBook.id;
  });

  listBooks = [...dataBooks];

  localStorage.setItem("bookStore", JSON.stringify(dataBooks));
  handleCloseModal();
  renderStoreTable();
};

// ====================
// Events Listener
// ====================
// Listen: Load Document
window.addEventListener("DOMContentLoaded", handleLoadDocument);

// Listen: Change input Search Book
$("#store__action .action__search #search__keyword").addEventListener(
  "keyup",
  (event) => {
    handleSearchBook(event.target.value);
  }
);

// Listen: Click button Open Modal Add book
$("#store__action .action__add button").addEventListener(
  "click",
  handleOpenModalAdd
);

// Listen: Click button Cancel Delete book
$(".modal__delete .action__cancel button").addEventListener("click", () => {
  handleCloseModal();
});

// Listen: Click button Close Modal
$$(".modal .header__btn button").forEach((button) => {
  button.addEventListener("click", handleCloseModal);
});

// Listen: Submit Modal Add book
$(".modal__add .footer__action .action__add").addEventListener(
  "click",
  handleAddBook
);

// Listen: Submit Modal Update book
$(".modal__update .footer__action .action__update").addEventListener(
  "click",
  () => {
    handleUpdateBook(currentHandleBook);
  }
);

// Listen: Submit Modal Delete book
$(".modal__delete .footer__action .action__delete button").addEventListener(
  "click",
  () => {
    handleDeleteBook(currentHandleBook);
  }
);

// Listen: Hover button
$$(".modal__delete .action__btn .btn-option").forEach((option) => {
  option.addEventListener("mouseover", () => {
    if (!option.classList.contains("btn-selected")) {
      $$(".modal__delete .action__btn .btn-option").forEach((btn) => {
        btn.classList.toggle("btn-selected");
      });
    }
  });
});

// Listen: Click backdrop
$("#modal__container").addEventListener("click", handleCloseModal);
$$("#modal__container .modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});
