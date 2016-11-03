// include node express lib
const express = require('express')
// include node body parsing middleware
const bodyParser = require('body-parser')
//include node postgres lib
const pg = require('pg')
//include node html-entities lib
const Entities = require('html-entities').XmlEntities

// create app as instance of express
const app = express()
// create instance of entities, so I can use all it's functions
const entities = new Entities();

// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
app.use(bodyParser.urlencoded({ extended: true }))

// serve static files in express
app.use(express.static(__dirname + '/static/'))

// set view engine to pug & set where the view engine is located
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// create var with path to bulletinboard database, username and password is read from environment variables POSTGRES_USER + POSTGRES_PASSWORD
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard';

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

			// decode: replacing the entities in the database for normal characters again, so it prints exactlty what's typed in
			// use .map() to loop through all objects in array result.rows and replacing title, body and name for string with decoded characters
			let decodedResults = result.rows.map( (i) => {
				return {
					// is new array so can change order (i.e. name before title)
					id: 	i.id,
					name: 	entities.decode(i.name),
					title: 	entities.decode(i.title),
					body: 	entities.decode(i.body),
					time: 	i.time
				}
			})
			// render all-comments and send decodedResults array to all-comments.pug
			response.render('all-comments', {data: decodedResults});
		})
	})
})

// When submit button is clicked on leave a message/index.pug
app.post('/', (request, response) => {
	// when one of the fields is empty, stay on /index and display errormessage
	if(!request.body['name'] || !request.body['title'] || !request.body['body']){
		response.render('', {fieldEmptyError: true, errorMessage: 'You shall not pass!\nPlease, fill in all fields to leave your message.'})
	} else {
		//encode input user: replacing characters to its entity representations. Ignores UTF characters with no entity representation.
		//this because otherwise characters like ', ", ` in user's message crashes the client.query
		let title = entities.encode(request.body['title']);
		let body = entities.encode(request.body['body']);
		let name = entities.encode(request.body['name']);

		//connect to bulletinboard database
		pg.connect(connectionString, (err, client, done) => {
			if (err) throw err;
			// test if body-parser works
			// console.log(request.body['title']);

			//add new message: title, body, name is the encoded (see above) name, title and message filled in by user
			client.query("insert into messages (title, body, time, name) values ( '" + title + "', '" + body + "', current_timestamp, '" + name + "')", (err, result) => {
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