// require libraries uses in /post routes
const express = require('express')
const bodyParser = require('body-parser')
// because session works across files only require session in app.js, still access here
// instead of creating an app (app you only create once in app.js) create a router
const router = express.Router()

// require database.js module
let db = require(__dirname + '/../modules/database')

// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/post')
// when specific post is requested by clicking to leave a comment on it
	.get((request, response) => {
		Promise.all([
			// find the specific post with the postId of the post the user wants to comment on
			// include user data of the user that posted this post
			db.Post.findOne({
				where: {
					// this id of specific post is sent in the comment-url
					id: request.query.id
				}, 
				include: [db.User]
			}),
			// select * from comments with the postId matching the postId of the post the user wants to comment on
			// include user data of the user that commented this comment
			db.Comment.findAll({
				where: {
					postId: request.query.id
				}, 
				include: [db.User]
			})
		]).then((allPromises)=>{
			// add postId of this specific post to session object
			request.session.postid = request.query.id;
			// render /post and send specific post with it's user data and all comments with matching postId (with their users' data) to post.pug
			response.render('post', {post: allPromises[0], comments: allPromises[1], message: request.query.message});
		})
	})
	// When submit button for post is clicked on newsfeed
	.post((request, response) => {
		// check if input is longer than 9000, then redirect with message
		if(request.body.body.length > 9000) {
			response.redirect('/?message=' + encodeURIComponent("Input cannot be longer than 9000 characters"));
		} else {
	        // create new post (row) in table posts
			db.Post.create ({
				body: request.body.body,
				// add userId with id of the user of this session, added to session object after login/registering app.get('/')
				userId: request.session.user.id
			})
			.then( () => {
				// redirect to newsfeed with new post added on top
				response.redirect('/');
			})
		}
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router
