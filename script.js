document.addEventListener("DOMContentLoaded", () => {
    let bookDisplay = document.querySelector(".book-container");

    let books = [];

    function Book(title, author, pages, read, imgPath = "Images/no-cover.jpg") {
        if (!new.target) {
            throw Error("You must use 'new'!");
        }
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.imgPath = imgPath;
        this.info = function () {
            let desc = title + " by " + author + ", " + pages + " pages, ";
            if (read) {
                desc += "was read";
            } else {
                desc += "not read yet";
            }
            return desc;
        };
    }

    function addBookToLibrary(
        name,
        author,
        pages,
        read,
        imgPath = "Images/no-cover.jpg",
    ) {
        books.push(new Book(name, author, pages, read, imgPath));
    }

    addBookToLibrary(
        "The Hobbit",
        "J.R.R. Tolkien",
        295,
        false,
        "Images/the-hobbit.jpg",
    );

    addBookToLibrary(
        "Lord of the Flies",
        "William Golding",
        224,
        false,
        "Images/lord-of-the-flies.jpg",
    );

    addBookToLibrary("1984", "George Orwell", 328, false, "Images/1984.jpg");
    addBookToLibrary(
        "Frankenstein",
        "Mary Shelley",
        280,
        true,
        "Images/frankenstein.jpg",
    );

    for (let i = 0; i < books.length; i++) {
        const book = books[i];
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

        bookDisplay.appendChild(bookDiv);
    }
});
