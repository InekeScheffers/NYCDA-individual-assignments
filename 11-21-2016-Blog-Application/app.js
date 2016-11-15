//include packages
const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const bcrypt = require('bcrypt')

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
}))

// set view engine to pug & set where the view engine is located
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// create model for tables users, posts and comments
let User = db.define('user', {
	// say name has to be unique in this table for login purposes
	name: {type: Sequelize.STRING, unique: true},
	email: Sequelize.STRING,
	password: Sequelize.STRING
})

let Post = db.define('post', {
	body: Sequelize.TEXT
})

let Comment = db.define('comment', {
	body: Sequelize.TEXT
})

// define relations
User.hasMany(Post)
Post.belongsTo(User)
User.hasMany(Comment)
Comment.belongsTo(User)
Post.hasMany(Comment)
Comment.belongsTo(Post)

// {force: true}: so all tables in db are deleted
db.sync({force:true})

// test if app works
// app.get('/ping', (request, response) => {
// 	response.send('pong')
// })

// when home is requested
app.get('/', (request, response) => {
	let user = request.session.user;
	// if a user is logged in/started a session, render newsfeed
	if(user) {
		// select * from posts, include user data for userId's attached to these posts
		Post.findAll({
			include: [User]
		}).then((posts)=> {
			// render newsfeed and send all posts to newsfeed.pug
			response.render('newsfeed', {posts: posts});
		})
	} else {
		// else render register/login, send (possible) message to login.pug
		console.log("About to render the register/login page...");
		response.render('login', {message: request.query.message});
	}
})

// when profile is requested render localhost:8000/profile
app.get('/profile', (request, response) => {
	let user = request.session.user;
	// if a user is logged in/started a session, render profile
	if (user) {
		// select * from posts
		// where userId is the id of the user of this session
		// include it's user's data
		Post.findAll({
			where: {
				userId: request.session.user.id
			}, 
			include: [User]
		}).then((posts)=> {
			// render profile and send user data and data of all his/hers posts to profile.pug 
			response.render('profile', {user: user, posts: posts});
		})
	} else {
		// else redirect to log in and show message
		response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
	}
})

// when logout is requested
app.get('/logout', (request, response) => {
	// destroy session
	request.session.destroy( (err) => {
		if(err) {
			throw err;
		}
		// redirect to log in page and show message
		response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
	})
})

// when specific post is requested by clicking to leave a comment on it
app.get('/post', (request, response) => {
	Promise.all([
		// find the specific post with the postId of the post the user wants to comment on
		// include user data of the user that posted this post
		Post.findOne({
			where: {
				// this id of specific post is sent in the comment-url
				id: request.query.id
			}, 
			include: [User]
		}),
		// select * from comments with the postId matching the postId of the post the user wants to comment on
		// include user data of the user that commented this comment
		Comment.findAll({
			where: {
				postId: request.query.id
			}, 
			include: [User]
		})
	]).then((allPromises)=>{
		// add postId of this specific post to session object
		request.session.postid = request.query.id;
		// render /post and send specific post with it's user data and all comments with matching postId (with their users' data) to post.pug
		response.render('post', {post: allPromises[0], comments: allPromises[1]});
	})
})

// When submit button is clicked on login.pug
app.post('/', (request, response) => {
	// if user didn't fill in login (but thus filled in register)
	if(!request.body.loginname){
		// declare variable password which stores the password input under registration by user
		let password = request.body.password;

		// hash password, and store hashed password in password column in table users
		bcrypt.hash(password, 8, (err, hash) => {
			if (err) {
				throw err;
			} else {
				// create new user (row) in table users
				User.create ({
					name: 		request.body.name, 
					email: 		request.body.email,
					// store hashed password 
					password: 	hash
					// catch when name isn't unique, redirect without adding to table users
				}).catch( (err) => {
					response.redirect('/?message=' + encodeURIComponent("Your username is already taken, please choose a new name."));
					throw err
				})
				// when name is unique
				.then( () => {
					// check if newly registered user exists in table users
					User.findOne({
						where: {
							name: request.body.name
						}
					}).then( (user) => {
						// compare (hashed) typed in password, with (hashed) stored password of this user
						bcrypt.compare(password, user.password, (err, res) => {
							if(err) {
								throw err;
							// if user exists and (hashed) filled in password matches (hashed) password in db
							} else if (user !== null && res === true) {
								// start session and redirect to profile
								request.session.user = user;
								response.redirect('/profile');
							}
						})
					})
				})
			}
		})	
	// if user didn't fill in register (thus filled in login)
	} else if(!request.body.name){
		// declare variable password which stores the password input under login by user
		let password = request.body.loginpassword;

		// find user in table users with the same name as filled in by user on loginform
		User.findOne({
			where: {
				name: request.body.loginname
			}
		}).then( (user) => {
			// compare (hashed) input by user for password under login, to his/her stored (hashed) password
			bcrypt.compare(password, user.password, (err, res) => {
				if(err) {
					throw err;
				} else {
					// if user exists and (hashed) password in table matched the filled in (hashed) password
					if (user !== null && res === true) {
						// start session and redirect to newsfeed
						request.session.user = user;
						response.redirect('/');
					} else {
						// redirect to login page and say name or password is incorrect 
						response.redirect('/?message=' + encodeURIComponent("Invalid name or password."));
					}
				}
			})
		}, (err) => {
			response.redirect('/?message=' + encodeURIComponent("Invalid name or password."));
		});
		}
})

// When submit button for post is clicked on newsfeed
app.post('/post', (request, response) => {
        // create new post (row) in table posts
		Post.create ({
			body: request.body.body,
			// add userId with id of the user of this session, added to session object after login/registering app.get('/')
			userId: request.session.user.id
		})
		.then( () => {
			// redirect to newsfeed with new post added on top
			response.redirect('/');
		})
})

// When submit button for comments is clicked on specific post page
app.post('/comment', (request, response) => {
        // create new post (row) in table posts
		Comment.create ({
			body: request.body.body,
			// add postId with id of this specific post added to session object in app.get('/post')
			postId: request.session.postid,
			// add userId with id of the user of this session, added to session object after login/registering app.get('/')
			userId: request.session.user.id
		})
		.then( () => {
			// redirect to /postspecificpostid with new comment above
			response.redirect('/post/?id=' + request.session.postid);
		})
})

// set up port to locally run your app in the browser
app.listen(8000, () =>{
	console.log('server is running');
})