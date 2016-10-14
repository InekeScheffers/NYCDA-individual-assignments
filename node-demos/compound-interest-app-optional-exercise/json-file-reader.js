//require fylesystem library so you can use it's function fs.readFile
const fs = require('fs');

//function as wrapper, so you can call this whole piece of code inside your app
// the second parameter is callback so you can run the function in the second parameter
// in app.js, it only runs when calcCompoundInterest is finished
function calcCompoundInterest(filename,callback){

	//helper funtion for prettyNr
	// get at most 2 decimals behind dot
	let functionsObject = {
		roundDecimal: (number) => {
			return Math.round(number * 100) / 100;
		},

		//helper funtion for prettyNr
		//get commas at every 1000
		addCommas: (number) => {
			return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},

		//add commas and round to twoe decimals
		prettyNr: (number) => {
			return functionsObject.addCommas(functionsObject.roundDecimal(number))
		}
	}

	//read the customer data json
	// () => {} short way to write a function
	// (err, data) => {} same as function(err, data){}
	fs.readFile(__dirname + "/" + filename, 'utf-8', (err, data) => {
		// let = another var: The difference is scoping. var is scoped to the nearest function block and let is scoped to the nearest enclosing block (both are global if outside any block), which can be smaller than a function block. Also, variables declared with let are not accessible before they are declared in their enclosing block. As seen in the demo, this will throw an exception.
		//parse the file to a readable (customer) object
		let parsedData = JSON.parse(data);
		//check if it does read the json-file
		//console.log(parsedData);

		calculate(parsedData, functionsObject, callback);
	})

		//test if function is working, in this one customer.pension.endamount doesn't exist
		//console.log(customer);
		//add key to object, start with 0, set end amount prop
		// customer.pension.endamount = 0;
		// change to keep track of 3 different interest cases
	function calculate(customer, functionsObject, callback){
		customer.pension.endamount = {
			pessimistic: customer.finances.startcapital,
			average: 	 customer.finances.startcapital,
			optimistic:  customer.finances.startcapital
		}
		//test if it works, customer.pension.endamount should be added now
		// console.log(customer);
		//set duration prop, calculate years untill pension, that's how many years you should loop

		customer.pension.duration = (customer.pension.age - customer.age);

		//check if customer.pension.duration is added
		// console.log(customer);

		//first one is faster: because starting point is checked once, end point every time, in large file it is thus faster, count reversed	
		// for (var i = Things.length - 1; i >= 0; i--) {
		// 	Things[i]
		// }
		// for (var i = 0; i < Things.length; i++) {
		// 	Things[i]
		// }

		for (var i = customer.pension.duration - 1; i >= 0; i--) {
			// check if it loops 39 times 38-0
			//console.log("I looped " + i + " times");
			//calculate monthly add
			customer.pension.endamount.pessimistic  += (customer.finances.monthlyadd * 12); 
			customer.pension.endamount.average 		+= (customer.finances.monthlyadd * 12);
			customer.pension.endamount.optimistic 	+= (customer.finances.monthlyadd * 12);
			//calculate added interest after a year
			customer.pension.endamount.pessimistic 	*= customer.pension.interest.pessimistic;
			customer.pension.endamount.average 		*= customer.pension.interest.average;
			customer.pension.endamount.optimistic 	*= customer.pension.interest.optimistic;
		}
	callback(customer, functionsObject);
	}
}

module.exports = calcCompoundInterest;