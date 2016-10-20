const express = require('express') 	// require express library
const fs = require('fs')			// require fs library
const bodyParser = require('body-parser')
const app = express()				// create app as instance of express
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static('./static/'))

app.set('view engine', 'pug') // set view engine to pug
app.set('views', __dirname + '/views') //set where the view engine is located

app.get('/', (request, response) => {
	console.log("About to render the index.pug page...");
	response.render('index')
}) 

app.get('/all-users', (request, response) => {
	console.log("About to render the all-users.pug page...");
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		response.render('all-users', {data: parsedData})
	})
}) 

app.get('/search-user', (request, response) => {
	console.log("About to render the search-user.pug page...");
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		response.render('search-user', {data: parsedData})
	})
}) 

app.get('/add-user', (request, response) => {
	console.log("About to render the add-user.pug page...");
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		response.render('add-user', {data: parsedData})
	})
}) 

app.post('/result-search', (request, response) => {
	//console.log(request.body.search); //Value, console.log(request.body); //{search: 'Value'}
	//var searchedUser = request.body.search;
	//console.log(searchedUser)
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		//console.log(parsedData[1].firstname); //Ulysses
		var result = [];
		for (var i = 0; i < parsedData.length; i++) {
			// console.log(parsedData[i].firstname)
			if(parsedData[i].firstname === request.body.search || parsedData[i].lastname === request.body.search){
				//console.log(parsedData[i])
				//push object to empty result-array for all users that have the same first or lastname as the search query
				result.push(parsedData[i]);
			}
		}
		// if user wasn't found because search field was empty, user doesn't exist or user is misspelled stay on page and give alert message, else go to results and show result
		if(result.length === 0) {
			response.render('search-user', {data: result})
		} else {
			console.log("About to render the result-search.pug page...");
			response.render('result-search', {data: result, name: request.body.search})
		}	
	})
})

app.post('/all-users', (request, response) => {
	var addedUser = [];
	addedUser.push(request.body);
	if(!request.body['firstname'] || !request.body['lastname'] || !request.body['email']){
		response.render('add-user', {data: addedUser})
	} else {
		fs.readFile(__dirname + '/users.json', (err, data) => {
			if (err) throw err;
			let parsedData = JSON.parse(data);
			parsedData.push(request.body);
			var json = JSON.stringify(parsedData);
			//console.log(json);
			fs.writeFile(__dirname + '/users.json', json, 'utf8', function(mistake){
				if (mistake) throw mistake;
			})
			response.render('all-users', {data: parsedData})	
		})
	}
})

app.listen(8000, () =>{
	console.log('server is running');
})