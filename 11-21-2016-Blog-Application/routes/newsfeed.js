// const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
// because session works across files only require session in app.js, still access here
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

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router