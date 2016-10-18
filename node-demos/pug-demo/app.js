//including the necessary module
const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'pug'); //set view engine
app.set('views', __dirname + '/views'); //set where the view templates are located

app.get('/ping', (request, response) => { //what happens when user send get request: localhost:8000/ping
	response.send('Pong'); //send this string
})

app.get('/index', (request, response) => { //what happens when user send get request: localhost:8000/index
	console.log('About to render a pug page!'); //visible in console (server side)
	fs.readFile(__dirname + '/data.json', (error, data) => { //read our json data file
		if (error) throw error // if var error happens, throw error: back-end error
		let parsedData = JSON.parse(data); //parse our (var) data and stuff it in var(let) parsedData
		console.log(parsedData); //console.log the new JS object parsedData in the console!
		response.render('index', {data: parsedData}); 	//index.pug also works, but you don't do this in case you want to change the filetype in the future
							//don't send but render this whole .pug file
							//render must be inside readFile, otherwise parsedData isn't in its scope
							// inside index view i have access to data: parsedData, (it only shows in console now, to show it on the index.page you should do something in index.pug)
	});
})

app.listen(8000, () => {
	console.log('server is running');
})