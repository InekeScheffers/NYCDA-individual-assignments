//include packages
const Sequelize = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

// create instance of app
const app = express()

// connect to database blogapp
const sequelize = new Sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})

// Parse incoming request bodies in a middleware before your handlers, availabe under the req.body property
app.use(bodyParser.urlencoded({ extended: true }))

// serve static files in express
app.use(express.static(__dirname + '/static/'))

// set view engine to pug & set where the view engine is located
app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get('/ping', (request, response) => {
	response.send('pong')
})

// set up port to locally run your app in the browser
app.listen(8000, () =>{
	console.log('server is running');
})