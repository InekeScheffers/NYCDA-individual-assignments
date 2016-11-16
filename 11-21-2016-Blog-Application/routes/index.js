// const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
// because session works across files only require session in app.js, still access here
const bcrypt = require('bcrypt')
// instead of creating an app (app you only create once in app.js) create a router
const router = express.Router()

let db = require(__dirname + '/../modules/database')


// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/')
	// when home is requested
	.get((request, response) => {
		let user = request.session.user;
		// if a user is logged in/started a session, render newsfeed
		if(user) {
			// select * from posts, include user data for userId's attached to these posts
			db.Post.findAll({
				include: [db.User]
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
	// When submit button is clicked on login.pug
	.post((request, response) => {
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
					db.User.create ({
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
						db.User.findOne({
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
			db.User.findOne({
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


// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router