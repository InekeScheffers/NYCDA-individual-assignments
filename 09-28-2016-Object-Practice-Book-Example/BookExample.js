// Object constructor
function book (title, body) {
	this.title = title;
	this.body = body;
}

// Constructing a new book object
var bookOne = new book ("The book of bla",
	["Written by B. La", 
	"He was like bla, bla, bla.", 
	"She noticed that's a lot of bla.",
	"This function also 'workses' with 4 pages."]);

// Constructing a second new book object
var bookTwo = new book ("Rubberduckie",
	["Written by D. Uck", 
	"She explained her code to Rubberduckie.", 
	"She went all Eureka and shit!"]);

// prints the book's title and pages depending on which book you call in the function
function printBooks (book) {
	console.log("Title: " + book.title);
	for(var x = 0; x < book.body.length; x++){
		console.log("Page " + (x + 1) + ": " + book.body[x]);
	}
}

// call bookOne
printBooks (bookOne);

// call bookTwo
printBooks (bookTwo);








/*
---- solution post-discussion group ----

var book1 = {
	title: "Hillary",
	body: ["faint", "Democrats", "Lies", "Emails"]
}

var book2 = {
	title: "Donald",
	body: ["walls", "China", "offensive"]
}

function readBook(book){
	console.log("Title: " + book.title);
	for(var i = 0; i < book.body.length; i++){
		console.log("Page " + (i + 1) + ": " + book.body[i]);
	}
}

readBook(book1);
readBook(book2);

*/

/*
--- solution 2 looping over all properties so when you add a new property it prints it too, not onlytitle----
var book1 = {
	title: "Hillary",
	extraProperty: "Wejoooo dat werkt!",
	body: ["faint", "Democrats", "Lies", "Emails"]
}

var book2 = {
	title: "Donald",
	body: ["walls", "China", "offensive"]
}

function readBook(book){
	for(var property in book){
		if(property == 'title'){
			console.log('title' + book[property]);
		} else if(property == "body") {
			for(var i = 0; i < book[property].length; i++){
				console.log("Page " + (i + 1) + ": " + book[property][i]);
				}
			} else {
			console.log(property + ": " + book[property]);
		}
	}
}

readBook(book1);
readBook(book2);

*/


/* 
----almost finished solution timothy: ----
var library = [];

function book (title, body) {
	if (!title == false) {
		this.title = title;
	}
	this.body = body;
	library.push(this);
}

var book1 = new book ("The book of bla",
	["Written by B. La", 
	"He was like bla, bla, bla.", 
	"She noticed that's a lot of bla.",
	"This function also 'workses' with 4 pages."]);
	
var book2 = new book (false,
	["Written by D. Uck", 
	"She explained her code to Rubberduckie.", 
	"She went all Eureka and shit!"]);
	
console.log(library);

function readBook(bookArray){
	for (var x = 0; x < bookArray.length; x++) {
		for(var property in bookArray[x]){
			console.log(property);
			if(property == 'title'){
				console.log('title' + bookArray[x][property]);
			} else if(property == "body") {
				for(var i = 0; i < bookArray[x][property].length; i++){
					console.log("Page " + (i + 1) + ": " + bookArray[x][property][i]);
					}
				} else {
				console.log(property + ": " + bookArray[x][property]);
			}
		}
	}
}

// filterBooksWithTitle(readBook())
// readbook(filterBooksWithTitle());

function filterBooksWithTitle (myBookArray) {
	// is title a properity
	// if yes: save
	// if no: don't save
	// return saved books
	var memory = [];
	for (var i = 0; i < myBookArray.length; i++) {
		if (myBookArray[i]['title']) {
			// myBookArray[i].push(memory);
			memory.push(myBookArray[i])
		}
	}
	// name of object
	return memory;
}


readBook(filterBooksWithTitle(library));

*/