const express = require('express') 	// require express library
const fs = require('fs')			// require fs library
const bodyParser = require('body-parser') // require Node.js body parsing middleware
const app = express()				// create app as instance of express
app.use(bodyParser.urlencoded({ extended: true})) // Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property

app.use(express.static(__dirname + '/static/')) // serve static files in express

app.set('view engine', 'pug') // set view engine to pug
app.set('views', __dirname + '/views') //set where the view engine is located

app.get('/', (request, response) => { // when home is requested render localhost:8000
	console.log("About to render the index.pug page...");
	response.render('index')
}) 

app.get('/all-users', (request, response) => { //when display all users is requested, render localhost:8000/all-users
	console.log("About to render the all-users.pug page...");
	fs.readFile(__dirname + '/users.json', (err, data) => { // readFile to store all users in users.json to parsedData
		if (err) throw err;
		let parsedData = JSON.parse(data); // store the json data parsed into js object in parsedData
		response.render('all-users', {data: parsedData}) // send parsedData to all-users.pug through {data: parsedData}
	})
}) 

app.get('/search-user', (request, response) => {
	console.log("About to render the search-user.pug page...");
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		response.render('search-user', {data: parsedData}) // send parsedData to search-user.pug through {data: parsedData}, so it can be checked if search query is in users.json
	})
}) 

app.get('/add-user', (request, response) => {
	console.log("About to render the add-user.pug page...");
	response.render('add-user')
}) 

app.post('/result-search', (request, response) => {
	//test: console.log(request.body.search); //Value === console.log(request.body); //{search: 'Value'}
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		//test: console.log(parsedData[1].firstname); //Ulysses
		let result = []; // result variable: empty array, to store users in that match with their first- or lastbname with the search query
		for (let i = 0; i < parsedData.length; i++) { // loop through parsedData to check if users match with search query
			// console.log(parsedData[i].firstname)
			if(parsedData[i].firstname === request.body.search || parsedData[i].lastname === request.body.search){
				//console.log(parsedData[i])
				//push object to empty result-array for all users that have the same first or lastname as the search query
				result.push(parsedData[i]); //push user object to result when there is a match
			}
		}
		// if user wasn't found because search field was empty, user doesn't exist or user is misspelled stay on page and give alert message, else go to results and show result
		if(result.length === 0) { // if result has no objects in it (because no match or no search query)
			response.render('search-user', {data: result}) // stay on search-user, pass data so search-user.pug can give an alert to try again or add user
		} else {
			console.log("About to render the result-search.pug page..."); // if there is one or more objects in result
			response.render('result-search', {data: result, searchQuery: request.body.search}) // render /result-search, and pass data so /result-search.pug can show the found users
		}	
	})
})

app.post('/all-users', (request, response) => {
	let addedUser = []; // empty array to store new user in
	addedUser.push(request.body); // push new user to addedUser
	if(!request.body['firstname'] || !request.body['lastname'] || !request.body['email']){ // if one of the fields is empty
		response.render('add-user', {data: addedUser}) // stay on add-user, pass data to add-user so it can give an alert to fill out all fields to add a user
	} else {
		fs.readFile(__dirname + '/users.json', (err, data) => { // if all fields are filled out
			if (err) throw err;
			let parsedData = JSON.parse(data); // parse json file into js object
			parsedData.push(request.body); // push new user object to parsedData
			var json = JSON.stringify(parsedData); // make a json file of parsedData (with added user)
			//test: console.log(json);
			fs.writeFile(__dirname + '/users.json', json, 'utf8', function(mistake){ //write file with parsedData (with added user)
				if (mistake) throw mistake;
			})
			console.log("About to render the all-users.pug page with added user...");
			response.render('all-users', {data: parsedData}) // render all-users to display all users with the added user
		})
	}
})

app.listen(8000, () =>{ // set up port to locally run your app in the browser
	console.log('server is running');
})