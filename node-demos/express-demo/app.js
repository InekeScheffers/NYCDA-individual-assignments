const express = require('express'); // require express
const app = express(); // use express to make app variable

app.get('/', (request, response) => {
	response.status(418).send('Hello Ineke, it is so good to see you in the browser!');
	// same as: (. chaining)
	//response.status(418);
	//response.send('Hello Ineke, it is so good to see you in the browser!');
});

app.listen(8000, () => {
	console.log("I am listening");
});