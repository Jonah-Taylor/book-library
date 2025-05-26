let books = [];

let bookDisplay = document.querySelector(".book-container");
let searchFilter = document.querySelector(".search-bar");
let addBookButton = document.querySelector(".add-book");
let formDialog = document.querySelector(".form-dialog");
let addBookFormButton = document.querySelector(".book-form");
let submitBookFormButton = document.querySelector(".book-form-submit");
let cancelBookFormButton = document.querySelector(".book-form-cancel");

function Book(
    title,
    author,
    pages,
    readStatus,
    imgPath = "Images/no-cover.jpg",
) {
    if (!new.target) {
        throw Error("You must use 'new'!");
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.imgPath = imgPath;
    this.info = function () {
        let desc = "Written by " + author + " and has " + pages + " pages.";
        return desc;
    };
}

function addBookToLibrary(
    name,
    author,
    pages,
    readStatus,
    imgPath = "Images/no-cover.jpg",
) {
    books.push(new Book(name, author, pages, readStatus, imgPath));
}

function updateBookList() {
    while (bookDisplay.firstChild) {
        bookDisplay.removeChild(bookDisplay.firstChild);
    }
    for (let i = 0; i < books.length; i++) {
        const book = books[i];
        if (
            book.title.toUpperCase().includes(searchFilter.value.toUpperCase())
        ) {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");

            // Add cover
            const coverContainer = document.createElement("div");
            coverContainer.classList.add("book-cover-container");
            const cover = document.createElement("img");
            cover.src = book.imgPath;
            cover.classList.add("book-cover");
            coverContainer.appendChild(cover);
            bookDiv.appendChild(coverContainer);

            // Add title
            const title = document.createElement("h4");
            title.classList.add("book-title");
            title.innerText = book.title;
            bookDiv.appendChild(title);

            // Add author & pages
            const info = document.createElement("p");
            info.classList.add("book-info");
            info.innerText = book.info();
            bookDiv.appendChild(info);

            // Add status
            const status = document.createElement("div");
            status.classList.add("book-status");

            // Add delete
            const deleteButton = document.createElement("img");
            deleteButton.src = "Images/close.svg";
            deleteButton.classList.add("book-delete");
            status.appendChild(deleteButton);
            deleteButton.addEventListener("click", () => {
                bookDiv.remove();
                const index = books.indexOf(book);
                if (index !== -1) books.splice(index, 1);
            });

            const statusLabel = document.createElement("label");
            statusLabel.innerText = "Status";
            statusLabel.htmlFor = "reading-status";
            status.appendChild(statusLabel);

            const statusInput = document.createElement("select");
            statusInput.id = "reading-status";
            statusInput.name = "status";

            const wasRead = document.createElement("option");
            wasRead.value = "yes";
            wasRead.innerText = "Was Read";
            statusInput.appendChild(wasRead);

            const currentlyReading = document.createElement("option");
            currentlyReading.value = "currently";
            currentlyReading.innerText = "Currently Reading";
            statusInput.appendChild(currentlyReading);

            const notRead = document.createElement("option");
            notRead.value = "no";
            notRead.innerText = "Not Read";
            statusInput.appendChild(notRead);

            statusInput.addEventListener("change", (e) => {
                book.readStatus = e.target.value;
            });
            statusInput.value = book.readStatus;

            status.appendChild(statusInput);
            bookDiv.appendChild(status);
            bookDisplay.appendChild(bookDiv);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    addBookToLibrary(
        "The Hobbit",
        "J.R.R. Tolkien",
        295,
        "yes",
        "Images/the-hobbit.jpg",
    );

    addBookToLibrary(
        "Lord of the Flies",
        "William Golding",
        224,
        "no",
        "Images/lord-of-the-flies.jpg",
    );

    addBookToLibrary("1984", "George Orwell", 328, "yes", "Images/1984.jpg");
    addBookToLibrary(
        "Frankenstein",
        "Mary Shelley",
        280,
        "currently",
        "Images/frankenstein.jpg",
    );
    updateBookList();
    searchFilter.addEventListener("keyup", (event) => {
        updateBookList();
    });
    addBookButton.addEventListener("click", (e) => {
        formDialog.showModal();
    });
    cancelBookFormButton.addEventListener("click", (e) => {
        formDialog.close();
    });
    submitBookFormButton.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new FormData(addBookFormButton);
        const title = formData.get("title");
        const author = formData.get("author");
        const pages = parseInt(formData.get("pages"), 10);
        const status = formData.get("status");
        const coverImgFile = formData.get("book-cover");
        if (coverImgFile && coverImgFile.type.startsWith("image/")) {
            imgURL = URL.createObjectURL(coverImgFile);
            addBookToLibrary(title, author, pages, status, imgURL);
        } else {
            addBookToLibrary(title, author, pages, status);
        }
        updateBookList();
        formDialog.close();
    });
});
