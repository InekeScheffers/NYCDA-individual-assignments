//include node postgres lib
let pg = require('pg');

// create var with path to bulletinboard database, my username is read from environment variable POSTGRES_USER
const connectionString = 'postgres://' + process.env.POSTGRES_USER + ':' + '@localhost/bulletinboard';

//connect to database
pg.connect(connectionString, (err, client, done) => {
	if (err) throw err;
	//add new message
	client.query("insert into messages (title, body) values ('first message', 'bla bla bla bla bla')", (err, result) => {
		if (err) throw err;

		//prints INSERT: 1, you need backticks for this!
		console.log(`${result.command}: ${result.rowCount}`);
		// call done to close loop/query connection
		done();
		// call end to close full connection to postgres
		pg.end();
	});
});