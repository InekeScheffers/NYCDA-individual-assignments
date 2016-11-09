//include packages
const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

// create instance of app
const app = express()

// connect to database blogapp
let db = new Sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})

// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
app.use(bodyParser.urlencoded({ extended: true }))
// serve static files in express
app.use(express.static(__dirname + '/static'))
// activate/configure session
app.use(session({
	// passphrase
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}));

// set view engine to pug & set where the view engine is located
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// test if app works
// app.get('/ping', (request, response) => {
// 	response.send('pong')
// })

// when home is requested render localhost:8000
app.get('/', (request, response) => {
	console.log("About to render the register/login page...");
	response.render('login')
})

// When submit button is clicked on leave a login.pug
app.post('/', (request, response) => {	
    // create new user (row) in table users
	User.create ({
		name: 		request.body.name, 
		email: 		request.body.email, 
		password: 	request.body.password
	})
	.then( () => {
		response.render('newsfeed');
	})
})

// create model for tables users
let User = db.define('user', {
	// say name and email have to be unique in this table
	name: {type: Sequelize.STRING, unique: true},
	email: {type: Sequelize.STRING, unique: true},
	password: Sequelize.STRING
});

// {force: true}: so this table is deleted from database
User.sync({force:true})

// set up port to locally run your app in the browser
app.listen(8000, () =>{
	console.log('server is running');
})