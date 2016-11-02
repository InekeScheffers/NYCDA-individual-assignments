// include node express lib
const express = require('express')
// include node body parsing middleware
const bodyParser = require('body-parser')
//include node postgres lib
const pg = require('pg')

// create app as instance of express
const app = express()

// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
app.use(bodyParser.urlencoded({ extended: true }))

// serve static files in express
app.use(express.static(__dirname + '/static/'))

// set view engine to pug & set where the view engine is located
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// create var with path to bulletinboard database, my username is read from environment variable POSTGRES_USER
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + '@localhost/bulletinboard';

// when home is requested render localhost:8000
app.get('/', (request, response) => {
	console.log("About to render the leave a message page...");
	response.render('index')
})

// when bulletin board is requested render /all-comments
app.get('/all-comments', (request, response) => {
	console.log("About to render the bulletinboard...");

	// connect to bulletinboard database
	pg.connect(connectionString, (err, client, done) =>{
		if (err) throw err;

		// select all messages
		client.query('select * from messages', (err, result) => {
			// check if the select all works
			// console.log(result.rows);
			// call done to close loop/query connection
			done();
			// call end to close full connection to postgres
			pg.end();
			// render all-comments and send result.rows to all-comments.pug
			response.render('all-comments', {data: result.rows});
		})
	})
})

// When submit button is clicked on leave a message/index.pug
app.post('/', (request, response) => {
	// when one of the fields is empty, stay on /index and display errormessage
	if(!request.body['title'] || !request.body['body']){
		response.render('', {fieldEmptyError: true, errorMessage: 'Oops, fill in all fields to leave your message!'})
	} else {
		//connect to bulletinboard database
		pg.connect(connectionString, (err, client, done) => {
			if (err) throw err;
			// test if body-parser works
			// console.log(request.body['title']);

			//add new message, title and body is title and message from leave message/index.pug filled in by user
			client.query("insert into messages (title, body) values ( '" + request.body['title'] + "', '" + request.body['body'] + "')", (err, result) => {
				if (err) throw err;

				//prints INSERT: 1, you need backticks for this!
				console.log(`${result.command}: ${result.rowCount}`);
				// call done to close loop/query connection
				done();
				// call end to close full connection to postgres
				pg.end();

				console.log("About to render bulletinboard with added message...");
				// redirect to all-comments, so we only render all-users in app.get(all-users), so we don't keep on storing the same
				// message when we reload after submitting
				response.redirect('all-comments');
			});
		});
	}
})

// set up port to locally run your app in the browser
app.listen(8000, () =>{
	console.log('server is running');
})