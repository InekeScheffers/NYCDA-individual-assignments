//require fylesystem library so you can use it's function fs.readFile
var fs = require('fs');

//function as wrapper, so you can call this whole piece of code inside your app
// the second parameter is callback so you can run the function in the second parameter
// in app.js, it only runs when fs.readFile is finished
function readJSON(filename, callback){
	//read the JSON file if it doesn't throw an error
	fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data){
		if (err) {
			throw err;
		}
		//read data
		//save data in object you declare
		//parse the read JSON data into JavaScript object (an array is also an object)
		var readObject = JSON.parse(data);
		//run the callback function in the app with the data stored in the var readObject
		callback(readObject);
	});
}

//make the function readJSON accessible outside this file
module.exports = readJSON;