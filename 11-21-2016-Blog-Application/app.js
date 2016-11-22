//include express
const express = require('express')
const session = require('express-session')
// include node-sass
const sass = require('node-sass')
// include fs
const fs = require('fs')
// create instance of app
const app = express()

// configure session, only in app cause it works acrosse files
app.use(session({
	// passphrase
	secret: 'oh wow very secret much security',
	resave: true,
	saveUninitialized: false
}))

// render sass when server is started
sass.render({
	// file to be compiled
	file: __dirname + '/static/sass/main.scss',
	outputStyle: 'compressed'
	// function gets result
}, function(err, result) {
	// write result.css (the css part of the result) to main.css
	fs.writeFile(__dirname + '/static/css/main.css', result.css, 'utf-8')
});

// serve static files in express
// only in app, not in routes: state that html can access js/css files at root: '/'
app.use(express.static(__dirname + '/static'))

// set view engine to pug & set where the view engine is located
// only in app, not in routes/modules
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

// require route/module index.js
let newsfeedRouter = require(__dirname + '/routes/newsfeed')
let registerRouter = require(__dirname + '/routes/register')
let loginRouter = require(__dirname + '/routes/login')
let profileRouter = require(__dirname + '/routes/profile')
let logoutRouter = require(__dirname + '/routes/logout')
let postRouter = require(__dirname + '/routes/post')
let commentRouter = require(__dirname + '/routes/comment')

// use routes
app.use('/', newsfeedRouter)
app.use('/', registerRouter)
app.use('/', loginRouter)
app.use('/', profileRouter)
app.use('/', logoutRouter)
app.use('/', postRouter)
app.use('/', commentRouter)

// set up port to locally run your app in the browser
app.listen(8000, () =>{
	console.log('server is running');
})