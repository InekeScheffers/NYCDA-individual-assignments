var fs = require('fs');

fs.writeFile(__dirname + '/content.txt', "super mega ukelele", function(mistake){
	if (mistake) throw mistake;
})