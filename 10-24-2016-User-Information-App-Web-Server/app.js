const express = require('express') 	// require express library
const fs = require('fs')			// require fs library
const bodyParser = require('body-parser') // require Node.js body parsing middleware
const app = express()				// create app as instance of express

app.use(bodyParser.urlencoded({ extended: true })) // Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property

app.use(express.static(__dirname + '/static/')) // serve static files in express

app.set('view engine', 'pug') // set view engine to pug
app.set('views', __dirname + '/views') //set where the view engine is located

// function to alpabatize objects in data array on their lastname
function alphabatize(userObject, anotherUserObject) {
	if (userObject.lastname < anotherUserObject.lastname)
		return -1;
	if (userObject.lastname > anotherUserObject.lastname)
		return 1;
	return 0;
}

app.get('/', (request, response) => { // when home is requested render localhost:8000
	console.log("About to render the index.pug page...");
	response.render('index')
}) 

app.get('/all-users', (request, response) => { //when display all users is requested, render localhost:8000/all-users
	console.log("About to render the all-users.pug page...");

	fs.readFile(__dirname + '/users.json', (err, data) => { // readFile to store all users in users.json to parsedData
		if (err) throw err;

		let parsedData = JSON.parse(data); // store the json data parsed into js object in parsedData

		// give every object in array an index, so we have the right index, also after alphabatizing(aka sorting)
		parsedData.forEach(function(val, index) {
			val.index = index;
		})

		//alphabatize the parsedData
		parsedData.sort(alphabatize);

		//test to see if we have all parsedData in alphabetic order (sorted) + with right index (before alphabatizing)
		//console.log(parsedData)

		response.render('all-users', {data: parsedData}); // send parsedData to all-users.pug through {data: parsedData}
	})
}) 

app.get('/search-user', (request, response) => {
	console.log("About to render the search-user.pug page...");

	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;

		let parsedData = JSON.parse(data);
		response.render('search-user', {data: parsedData}); // send parsedData to search-user.pug through {data: parsedData}, so it can be checked if search query is in users.json
	})
}) 

app.get('/add-user', (request, response) => {
	console.log("About to render the add-user.pug page...");
	response.render('add-user')
}) 

// when a request is send from the front-end when user types in search field, user.json is read on the server
app.post('/autofill', (request, response) => {
	// gets inputSearch from main.js request.body = inputSearch, and you want the input of it
	let inputUser = request.body.input;
	// turn input in field in string that starts with capital letter and the rest lowercase.. so also when the user searches with all caps, or all lowercase or a mix it will match with the data
	inputUser = inputUser.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		return letter.toUpperCase();
	});
	//test if inputSearch is send from main.js
	// console.log(inputUser)

	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;

		let parsedData = JSON.parse(data);
		// empty array to store users in that match for the first part with what's in the inputfield
		let autofill = [];

		for (let i = parsedData.length - 1; i >= 0; i--) {
			// the part in the inputfield must be the same as the beginning of first- or lastname
			if(parsedData[i].firstname.indexOf(inputUser) === 0 || parsedData[i].lastname.indexOf(inputUser) === 0){
				autofill.push(parsedData[i]);
			}
		}
		// test if autofill contains the right objects
		// console.log(autofill);
		// send the filled autofill array to main.js
		response.send(autofill);
	})
})

app.post('/result-search', (request, response) => {
	//test: console.log(request.body.search); //Value === console.log(request.body); //{search: 'Value'}
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;

		let parsedData = JSON.parse(data);
		//test: console.log(parsedData[1].firstname); //Ulysses
		let result = []; // result variable: empty array, to store users in that match with their first- or lastbname with the search query

		for (let i = parsedData.length - 1; i >= 0; i--) { // loop through parsedData to check if users match with search query
			// turn input in field in string that starts with capital letter and the rest lowercase.. so also when the user searches with all caps, or all lowercase or a mix it will match with the data
			let startWithCapital = request.body.search;
			startWithCapital = startWithCapital.toLowerCase().replace(/\b[a-z]/g, function(letter) {
				return letter.toUpperCase();
			});
			// console.log(parsedData[i].firstname)
			if(parsedData[i].firstname === startWithCapital || parsedData[i].lastname === startWithCapital || parsedData[i].firstname + " " + parsedData[i].lastname === startWithCapital){
				//console.log(parsedData[i])
				//push object to empty result-array for all users that have the same first or lastname as the search query
				result.push(parsedData[i]); //push user object to result when there is a match
			}
		}

		//alphabatize the result
		result.sort(alphabatize);

		// if user wasn't found because search field was empty, user doesn't exist or user is misspelled stay on page and give alert message, else go to results and show result
		if(result.length === 0) { // if result has no objects in it (because no match or no search query)
			response.render('search-user', {fieldEmptyError: true, errorMessage: "Oops, didn't find user. Please, search again."}); // stay on search-user, pass error to search-user so it can give the passed error message to try again
		} else {
			console.log("About to render the result-search.pug page..."); // if there is one or more objects in result
			response.render('result-search', {data: result, searchQuery: request.body.search}) // render /result-search, and pass data so /result-search.pug can show the found users
		}	
	})
})

app.post('/add-user', (request, response) => {
	if(!request.body['firstname'] || !request.body['lastname'] || !request.body['email']){ // if one of the fields is empty
		response.render('add-user', {fieldEmptyError: true, errorMessage: 'Try again. Please fill out all fields to add a user.'}) // stay on add-user, pass error to add-user so it can give the passed error message to fill out all fields to add a user
	} else {
		fs.readFile(__dirname + '/users.json', (err, data) => { // if all fields are filled out
			if (err) throw err;

			let parsedData = JSON.parse(data); // parse json file into js object
			parsedData.push(request.body); // push new user object to parsedData
			let json = JSON.stringify(parsedData); // make a json file of parsedData (with added user)
			//test: console.log(json);

			fs.writeFile(__dirname + '/users.json', json, 'utf8', (mistake) => { //write file with parsedData (with added user)
				if (mistake) throw mistake;
			})

			//changed render into redirect, so we only render all-users in app.get(all-users), so we don't keep on adding the same
			// user when we reload after adding
			response.redirect('/all-users');
		})
	}
})

// post request when you click trashcan behind user on all-users.pug
app.post('/delete-user', (request, response) => {
		fs.readFile(__dirname + '/users.json', (err, data) => { // if all fields are filled out
			if (err) throw err;

			let parsedData = JSON.parse(data); // parse json file into js object push new user object to parsedData

			// delete user on index that you have clicked to delete (1: only delete that one)
			parsedData.splice(request.body.index, 1)

			let json = JSON.stringify(parsedData); // make a json file of parsedData (with added user)

			fs.writeFile(__dirname + '/users.json', json, 'utf8', (mistake) => { //write file with parsedData (with deleted user spliced)
				if (mistake) throw mistake;
			})
			//changed render into redirect, so we only render all-users in app.get(all-users), so we don't keep on deleting the same
			// index when we reload after deleting
			response.redirect('/all-users');
		})	
}) 

app.listen(8000, () =>{ // set up port to locally run your app in the browser
	console.log('server is running');
})