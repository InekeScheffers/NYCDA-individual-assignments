const express = require('express') 	// require express library
const fs = require('fs')			// require fs library
const bodyParser = require('body-parser')
const app = express()				// create app as instance of express
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

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
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		//console.log(parsedData[1].firstname); //Ulysses
		var result = [];
		for (var i = 0; i < parsedData.length; i++) {
			// console.log(parsedData[i].firstname)
			if(parsedData[i].firstname === request.body.search || parsedData[i].lastname === request.body.search){
				//console.log(parsedData[i])
				result.push(parsedData[i]);
			}
		}
		console.log("About to render the result-search.pug page...");
		response.render('result-search', {data: result})	
	})
})

app.post('/all-users', (request, response) => {
	//console.log(request.body);
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err;
		let parsedData = JSON.parse(data);
		//console.log(parsedData);
		parsedData.push(request.body);
		var json = JSON.stringify(parsedData);
		console.log(json);
		fs.writeFile(__dirname + '/users.json', json, 'utf8', function(mistake){
			if (mistake) throw mistake;
		})
		response.render('all-users', {data: parsedData})	
	})
})

app.listen(8000, () =>{
	console.log('server is running');
})