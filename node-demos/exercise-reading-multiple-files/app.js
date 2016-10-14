//------oplossing 1: --------

// var fs = require('fs');

// fs.readdir(__dirname + '/files', 'utf8', function(err,data){
// 	if (err) {
// 		console.log(err);
// 		throw err
// 	}
// 	for (var i = 0; i < data.length; i++) {
// 		var filedata = fs.readFileSync(__dirname + '/files/' + data[i], 'utf8');
// 		console.log(data[i] + "\n" + filedata + "\n---------");
// 	}
// })





//------oplossing 2: --------
var fs = require('fs');


fs.readdir(__dirname + '/files', 'utf8', function(err,data){
	if (err) {
		console.log(err);
		throw err
	}
	for (var i = 0; i < data.length; i++) {
		readFiledata(data[i]);
	}
});


function readFiledata(filename) {
	fs.readFile(__dirname + '/files/' + filename, 'utf8', function(err, data){
		if (err) {
			console.log(err);
			throw err
		}
		console.log(filename + "\n" + data + "\n---------");
	});
}






//-------oplossing 3: ----------
// met alles in functies zetten kun je meerdere directories uitlezen (callen) zonder code aan te hoeven passen

// var fs = require('fs');

// function readFilesInDir(dirToRead) {
// 	fs.readdir(__dirname + '/' + dirToRead, 'utf8', function(err,data){
// 		if (err) {
// 			console.log(err);
// 			throw err
// 		}
// 		for (var i = 0; i < data.length; i++) {
// 			readFiledata(data[i], dirToRead);
// 		}
// 	});
// }

// function readFiledata(filename, dir) {
// 	fs.readFile(__dirname + '/' + dir + '/' + filename, 'utf8', function(err, data){
// 		if (err) {
// 			console.log(err);
// 			throw err
// 		}
// 		console.log(filename + "\n" + data + "\n---------");
// 	});
// }

// readFilesInDir('files');
// readFilesInDir('otherfiles');






//----  readFile notatie -----
// fs.readFile(__dirname + '/firsttext.txt', 'utf8', function(err, data){
// 	if (err) {
// 		console.log(err);
// 		throw err
// 	}
// 	console.log(data);
// })

// fs.readFile(__dirname + '/secondtext.txt', 'utf8', function(err, data){
// 	if (err) {
// 		console.log(err);
// 		throw err
// 	}
// 	console.log(data);
// })

// fs.readFile(__dirname + '/thirdtext.txt', 'utf8', function(err, data){
// 	if (err) {
// 		console.log(err);
// 		throw err
// 	}
// 	console.log(data);
// })

// var numFilesRead = 0;
// 			function complete(){
// 				numFilesRead++;
// 				if(numFilesRead === 3) {
// 					console.log(data[i] + "\n" + files + "\n---------");
// 				}
// 			}