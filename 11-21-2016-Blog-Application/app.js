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

// create model for tables users
let User = db.define('user', {
	// say name has to be unique in this table for login purposes
	name: {type: Sequelize.STRING, unique: true},
	email: Sequelize.STRING,
	password: Sequelize.STRING
});

// {force: true}: so this table is deleted from database
User.sync({force:true})

// test if app works
// app.get('/ping', (request, response) => {
// 	response.send('pong')
// })

// when home is requested render localhost:8000
app.get('/', (request, response) => {
	let user = request.session.user;
	if(user) {
		response.render('newsfeed')
	} else {
		console.log("About to render the register/login page...");
		response.render('login', {message: request.query.message})
	}
})

app.get('/profile', function (request, response) {
	let user = request.session.user;
	if (user === undefined) {
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	} else {
		response.render('profile', {user: user});
	}
});

// When submit button is clicked on leave a login.pug
app.post('/', (request, response) => {
	// if user didn't fill in login
	if(!request.body.loginname){	
	    // create new user (row) in table users
		User.create ({
			name: 		request.body.name, 
			email: 		request.body.email, 
			password: 	request.body.password
			// catch when name isn't unique, redirect without adding to table users
		}).catch(Sequelize.ValidationError, function (err) {
			response.redirect('/?message=' + encodeURIComponent("Your username is already taken, please choose a new name."))
		})
		// when name is unique adds to table and redirects to profile.pug
		.then( () => {
			// check if newly registered user exists in table users
			User.findOne({
				where: {
					name: request.body.name
			}
			}).then(function (user) {
				// if user exists and password in table matched the filled in password
				if (user !== null && request.body.password === user.password) {
					// start session and redirect to profile
					request.session.user = user;
					response.redirect('/profile');
				}
			})
		})
	// if user didn't fill in register
	} else if(!request.body.name){
		// find user in table users with the same name as filled in by user on loginform
		User.findOne({
			where: {
				name: request.body.loginname
			}
		}).then(function (user) {
			// if user exists and password in table matched the filled in password
			if (user !== null && request.body.loginpassword === user.password) {
				// start session and redirect to newsfeed
				request.session.user = user;
				response.redirect('/newsfeed');
			} else {
				// redirect to login page and say name or password is incorrect 
				response.redirect('/?message=' + encodeURIComponent("Invalid name or password."));
			}
		}, function (error) {
			response.redirect('/?message=' + encodeURIComponent("Invalid name or password."));
		});
		}
})

// set up port to locally run your app in the browser
app.listen(8000, () =>{
	console.log('server is running');
})