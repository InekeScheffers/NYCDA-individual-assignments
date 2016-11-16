const express = require('express')
const bodyParser = require('body-parser')
// because session works across files only require session in app.js, still access here
// instead of creating an app (app you only create once in app.js) create a router
const router = express.Router()

let db = require(__dirname + '/../modules/database')

// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/profile')
	// when profile is requested render localhost:8000/profile
	.get((request, response) => {
		let user = request.session.user;
		// if a user is logged in/started a session, render profile
		if (user) {
			// select * from posts
			// where userId is the id of the user of this session
			// include it's user's data
			db.Post.findAll({
				where: {
					userId: request.session.user.id
				}, 
				include: [db.User]
			}).then((posts)=> {
				// render profile and send user data and data of all his/hers posts to profile.pug 
				response.render('profile', {user: user, posts: posts});
			})
		} else {
			// else redirect to log in and show message
			response.redirect('/?message=' + encodeURIComponent("Please log in to view your profile."));
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router