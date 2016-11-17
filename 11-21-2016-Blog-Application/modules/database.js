// require sequelize
const Sequelize = require('sequelize')

// connect to database blogapp
let db = new Sequelize('blogapp', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
})

// create model for tables users, posts and comments
let User = db.define('user', {
	// say name has to be unique in this table for login purposes
	name: {type: Sequelize.STRING, unique: true},
	email: Sequelize.STRING,
	password: Sequelize.STRING
})

let Post = db.define('post', {
	body: Sequelize.STRING(9001)
})

let Comment = db.define('comment', {
	body: Sequelize.STRING(9001)
})

// define relations
User.hasMany(Post)
Post.belongsTo(User)
User.hasMany(Comment)
Comment.belongsTo(User)
Post.hasMany(Comment)
Comment.belongsTo(Post)

// {force: true}: so all tables in db are deleted
db.sync({force:true}).then(() => {
	console.log("Database synced")
})

// by requiring database.js the code runs one time, by sending User, Post and Comment in an object you can access and create a user and post etc in routes
// for example: db.User.create
module.exports = {User:User, Post:Post, Comment:Comment}