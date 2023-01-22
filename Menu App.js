class Book {
    constructor(title, format) {
        this.title = title;
        this.format = format;
    }

    describe() {
        return `${this.title} is ${this.format}.`;
//returning a string that describes the book title and the book format. audio, hardback, etc.

    }
}

class Bookshelf {
    constructor(genre) {
        this.genre = genre;
        this.books = [];
    }

    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            throw new Error("You can only add an instance of Book. Argument is not a Book: ${book}");
        }
    }

    describe() {
        return `${this.bookshelf} has ${this.books.length} books.`;
//returning a string that describes the books on the bookshelves.

    }
}

class Menu {
    constructor() {
        this.bookshelves = [];
        this.selectedBookshelf = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case "1":
                    this.createBookshelf();
                    break;
                case "2":
                    this.viewBookshelf();
                    break;
                case "3":
                    this.deleteBookshelf();
                    break;
                case "4":
                    this.displayBookshelves();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert("Goodbye!");
    }
//Here is my main menu


    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create New Bookshelf
            2) View Bookshelf
            3) Delete Bookshelf
            4) Display All Bookshelves
            `);
    }
//This will show the main menu options to the user

    showBookshelfMenuOptions(bookshelfInfo) {
        return prompt(`
        0) Back
        1) Add Book Title 
        2) Delete Book Title
        ----------------
        ${bookshelfInfo}
        `);
    }
//This will also show these menu items to the user

    displayBookshelves() {
        let bookshelfString = "";
        for (let i = 0; i < this.bookshelves.length; i++) {
            bookshelfString += i + ") " + this.bookshelves[i].genre + '\n';
        }
        alert(bookshelfString);
    }
//This will create a string that lists the bookshelf genres

    createBookshelf() {
        let genre = prompt("Enter genre for new bookshelf:");
        this.bookshelves.push(new Bookshelf(genre));
    }
//This is where the user will enter the genre for the bookshelf they are adding

    viewBookshelf() {
        let index = prompt("Enter the index of the bookshelf you wish to view:");
        if (index > -1 && index < this.bookshelves.length) {
            this.selectedBookshelf = this.bookshelves[index];
            let description = "Bookshelf Genre: " + this.selectedBookshelf.genre + "\n";
            for (let i = 0; i < this.selectedBookshelf.books.length; i++) {
                description += i + ") " + this.selectedBookshelf.books[i].title + " - " + this.selectedBookshelf.books[i].format + "\n";
            }
//Here the user will choose a bookshelf they would like to view

            let selection = this.showBookshelfMenuOptions(description);
            switch (selection) {
                case "1":
                    this.addBook();
                    break;
                case "2":
                    this.deleteBook();
//This allows the user to add or delete a book title

            }
        }
    }

    deleteBookshelf() {
        let index = prompt("Enter the index of the bookshelf you would like to delete:");
        if (index > -1 && index < this.bookshelves.length) {
            this.bookshelves.splice(index, 1);
        }
    }
//By using splice, this allows the user to delete an entire bookshelf

    addBook() {
        let title = prompt("Enter title of new book:");
        let format = prompt("Enter new book format:");
        this.selectedBookshelf.books.push( new Book(title, format));
    }
//Here a user can add a new title of a book and the format to a bookshelf

    deleteBook() {
        let index = prompt("Enter the index of the book you wish to delete:");
        if (index > -1 && index < this.selectedBookshelf.books.length) {
            this.selectedBookshelf.books.splice(index, 1);
        }
//This is how a user is able to delete a book from a bookshelf

    }
    
}

let menu = new Menu();
menu.start();