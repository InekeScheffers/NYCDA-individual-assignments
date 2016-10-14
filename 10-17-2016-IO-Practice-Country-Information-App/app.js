//require module json-file-reader so you can use it's function here
var readParsedObject = require(__dirname + '/json-file-reader.js'); 

// call function from module, first parameter = filename it should read (it's the first 
	// parameter the function in the module needs), second parameter is 
	// a callback function (= always anonymous), the second parameter the function
	// in the module needs. Because it is a callback function, it only runs when the first
	// (readParsedObject) is finished
	// the parameter in this callback function is the resulted data of the module (callback(readObject)), 
	// in this case the read Countries file: a new JS object (you can call it everything, doesn't 
	// have to correspond to result of module function (readObject), readCountries is more 
	// discriptive for this app)
readParsedObject('countries.json', function(readCountries){
	//loop through new JS object (an array in this case so not a for/in loop)
	for (var i = 0; i < readCountries.length; i++) {
		//object[index].key when you fill in Afghanistan in terminal on index 2 it thus stands for:
		//readCountries[0].name === Afghanistan
		if(readCountries[i].name === process.argv[2]){
			//You are now in the, in the case of Afghanistan at: object[0],
			//so you can to the value of name so you can also access the value of topLevelDomain
			console.log("Country: " + readCountries[i].name + "\nTop Level Domain: " + readCountries[i].topLevelDomain);
		}
	}
})