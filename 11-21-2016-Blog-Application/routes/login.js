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

router.route('/login')	
	// When submit button is clicked on login.pug
	.post((request, response) => {
		if(!request.body.loginname || !request.body.loginpassword){
			response.redirect('/?message=' + encodeURIComponent("Please fill in all fields to login"));
		} else {
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