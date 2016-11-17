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

router.route('/register')	
	.post((request, response) => {
		// if user didn't fill in login (but thus filled in register)
		if(!request.body.name || !request.body.email || !request.body.password){
			// checks if a field is empty, then redirects with message
			response.redirect('/?message=' + encodeURIComponent("Please fill in all fields to register"));
		} else if(request.body.password.length < 8) {
			// checks if password is shorter than 8 characters, then redirects with message
			response.redirect('/?message=' + encodeURIComponent("Password must be at least 8 characters long"));
		} else if(request.body.password != request.body.confirmPassword){
			// checks if password and confirm password don't match, then redirects with message
			response.redirect('/?message=' + encodeURIComponent("Please enter the same password twice to register"));
		} else {
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
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router