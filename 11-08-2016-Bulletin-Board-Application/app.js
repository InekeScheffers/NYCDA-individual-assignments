// include node express lib
const express = require('express')
//include sequelize package
const Sequelize = require('sequelize')
//connect to database bulletinboard
const sequelize = new Sequelize('postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost/bulletinboard')
// include node body parsing middleware
const bodyParser = require('body-parser')
//include node html-entities lib
const Entities = require('html-entities').XmlEntities

// create app as instance of express
const app = express()
// create instance of entities, so I can use all it's functions
const entities = new Entities()

// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
app.use(bodyParser.urlencoded({ extended: true }))

// serve static files in express
app.use(express.static(__dirname + '/static/'))

// set view engine to pug & set where the view engine is located
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// make table messages in database bulletinboard with js instead of in psql
var Message = sequelize.define ('message', {
	name: 	Sequelize.STRING,
	title: 	Sequelize.STRING,
	// .TEXT because string has limit of 255 characters and I don't want to limit a message to 255 characters
	body: 	Sequelize.TEXT 
})

// ensure the table messages exists
// {force: true}: so this table is deleted from database, before creating it anew with Message.create
// {force: true} only in development
// when you set it to false a new message is added to already crowded table message. In this case it's handy for Paul to first clean it
Message.sync({force:true})
// Message is now ready to be used 

// when home is requested render localhost:8000
app.get('/', (request, response) => {
	console.log("About to render the leave a message page...");
	response.render('index')
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
		let name = entities.encode(request.body['name'])		
			
        // create new message (row) in table messages
		Message.create ({
			name: 	name, 
			title: 	title, 
			body:  	body
		})
		.then( () => {
			// redirect to all-comments, so we only render all-users in app.get(all-users), so we don't keep on storing the same
			// message when we reload after submitting
			response.redirect('all-comments');
		})
    	
	}
})

// when bulletin board is requested render /all-comments
app.get('/all-comments', (request, response) => {
	console.log("About to render the bulletinboard...");

	// select * from messages
	Message.findAll()
		.then( (messages) => {
			// decode: replacing the entities in the database for normal characters again, so it prints exactlty what's typed in
			// use .map() to loop through all objects in array result.rows and replacing title, body and name for string with decoded characters
			let decodedResults = messages.map( (i) => {
				return {
					// new array, with same id and time, but decoded name, title, body 
					id: 		i.id,
					name: 		entities.decode(i.name),
					title: 		entities.decode(i.title),
					body: 		entities.decode(i.body),
					time: 		i.createdAt
				}
			})
			// render all-comments and send decodedResults array to all-comments.pug
			response.render('all-comments', {data: decodedResults});
		})
})

// set up port to locally run your app in the browser
app.listen(8000, () =>{
	console.log('server is running');
})