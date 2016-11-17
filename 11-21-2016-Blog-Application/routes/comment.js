const express = require('express')
const bodyParser = require('body-parser')
// because session works across files only require session in app.js, still access here
// instead of creating an app (app you only create once in app.js) create a router
const router = express.Router()

let db = require(__dirname + '/../modules/database')

// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/comment')
	// When submit button for comments is clicked on specific post page
	.post((request, response) => {
		// check if input is longer than 9000, then redirect with message
		if(request.body.body.length > 9000) {
			response.redirect('/post/?id=' + request.session.postid + '&message=' + encodeURIComponent("Input cannot be longer than 9000 characters"));
		} else {
	        // create new post (row) in table posts
			db.Comment.create ({
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
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router