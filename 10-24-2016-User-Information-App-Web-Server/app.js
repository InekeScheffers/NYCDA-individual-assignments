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
	console.log(request.body);
})

// app.post(/*--data "firstname=value&lastname=value&email=value", */'/all-users', (request, response) => {
// 	console.log("About to render the all-users.pug page with the new added user...");
// 	fs.readFile(__dirname + '/users.json', (err, data) => {
// 		if (err) throw err;
// 		let parsedData = JSON.parse(data);
// 		response.render('all-users', {data: parsedData})
// 	})
// })

app.listen(8000, () =>{
	console.log('server is running');
})