const express = require('express')
// because session works across files only require session in app.js, still access here
// instead of creating an app (app you only create once in app.js) create a router
const router = express.Router()

router.route('/logout')
	// when logout is requested
	.get((request, response) => {
		// destroy session
		request.session.destroy( (err) => {
			if(err) {
				throw err;
			}
			// redirect to log in page and show message
			response.redirect('/?message=' + encodeURIComponent("Successfully logged out."));
		})
	})

// module.exports says: the current file when required will send back this thing
// router refers to variable router = object with all router-routes in it
module.exports = router