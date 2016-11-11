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
})

let Post = db.define('post', {
	name: Sequelize.STRING,
	body: Sequelize.TEXT
})

// {force: true}: so this table is deleted from database
User.sync({force:true})
Post.sync({force:true})

// test if app works
// app.get('/ping', (request, response) => {
// 	response.send('pong')
// })

// when home is requested
app.get('/', (request, response) => {
	let user = request.session.user;
	// if a user is logged in, started a session, render newsfeed
	if(user) {
		// select * from posts
		Post.findAll().then((posts)=> {
			// render all-comments and send decodedResults array to all-comments.pug
			response.render('newsfeed', {data: posts});
		})
	} else {
		// else render register/login
		console.log("About to render the register/login page...");
		response.render('login', {message: request.query.message})
	}
})

// when home is requested render localhost:8000/profile
app.get('/profile', (request, response) => {
	let user = request.session.user;
	// if a user is logged in, started a session, render profile
	if (user) {
		// select * from posts
		Post.findAll({
			where: {
				name: user.name
			}
		}).then((posts)=> {
			// render all-comments and send decodedResults array to all-comments.pug
			response.render('profile', {user: user, data: posts});
		})
	} else {
		// else redirect to log in and show message
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	}
})

// when logout is requested
app.get('/logout', (request, response) => {
	// destroy session
	request.session.destroy(function(error) {
		if(error) {
			throw error;
		}
		// redirect to log in page and show message
		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
})

app.get('/post', (request, response) => {
/////!!!! id ophalen met request.query.id
})

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
				response.redirect('/');
			} else {
				// redirect to login page and say name or password is incorrect 
				response.redirect('/?message=' + encodeURIComponent("Invalid name or password."));
			}
		}, function (error) {
			response.redirect('/?message=' + encodeURIComponent("Invalid name or password."));
		});
		}
})

// When submit button for post is clicked on newsfeed
app.post('/post', (request, response) => {
        // create new post (row) in table posts
		Post.create ({
//////////!!!!!!!!!!			// added name of current user, but didn't relate tables users with posts now!
			name: request.session.user.name,
			body: request.body.body
		})
		.then( () => {
			// redirect to all-comments, so we only render all-users in app.get(all-users), so we don't keep on storing the same
			// message when we reload after submitting
			response.redirect('/');
		})
})

// set up port to locally run your app in the browser
app.listen(8000, () =>{
	console.log('server is running');
})