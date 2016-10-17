const express 	= require('express'); 					//require library
const app 		= express(); 							// create app which is instance of express

console.log('starting app');

app.use(express.static('static')); 						//.use inject something in the request: middleware

// app.use('/resources', express.static('static'));		//injects static on localhost:8000/resources "whenever someone goes to /resources ga ervanuit dat iets uit static nodig"

// app.get('/', (req, res) => { 							//because static is stated it will open index.html
// 	console.log('someone opened the main page');
// 	res.send('I work');
// })

app.get('/ping', (req, res) => { 						// will do it cause this one is declared specifically here
	console.log('someone opened the ping-pong page'); 	//als iemand naar /ping gaat log dit in console/terminal
	res.send('pong');									// send pong to browser
})

// app.get('/home', (req, res) => { 						//if we go to localhost:8000/home server sends the index.html to the browser
// 	res.sendFile(__dirname + '/static/index.html');
// })

app.listen(8000, () => {
	console.log('Express listening');
})

// In node we define what happens when someone goes to a specific url. If someone goes to /ping send them this file
// If defined in static find the file that matches??