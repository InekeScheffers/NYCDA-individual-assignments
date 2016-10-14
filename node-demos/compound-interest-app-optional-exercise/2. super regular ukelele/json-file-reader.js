//require fylesystem library so you can use it's function fs.readFile
const fs = require('fs');

//function as wrapper, so you can call this whole piece of code inside your app
// the second parameter is callback so you can run the function in the second parameter
// in app.js, it only runs when calcCompoundInterest is finished
function calcCompoundInterest(filename){

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

		calculate(parsedData, functionsObject);
	})

		//test if function is working, in this one customer.pension.endamount doesn't exist
		//console.log(customer);
		//add key to object, start with 0, set end amount prop
		// customer.pension.endamount = 0;
		// change to keep track of 3 different interest cases
	function calculate(customers, functionsObject){
		for (var j = customers.length - 1; j >= 0; j--) {
			customers[j].pension.endamount = {
				pessimistic: customers[j].finances.startcapital,
				average: 	 customers[j].finances.startcapital,
				optimistic:  customers[j].finances.startcapital
			}
			//test if it works, customer.pension.endamount should be added now
			// console.log(customer);
			//set duration prop, calculate years untill pension, that's how many years you should loop

			customers[j].pension.duration = (customers[j].pension.age - customers[j].age);

			//check if customer.pension.duration is added
			// console.log(customer);

			//first one is faster: because starting point is checked once, end point every time, in large file it is thus faster, count reversed	
			// for (var i = Things.length - 1; i >= 0; i--) {
			// 	Things[i]
			// }
			// for (var i = 0; i < Things.length; i++) {
			// 	Things[i]
			// }

			for (var i = customers[j].pension.duration - 1; i >= 0; i--) {
				// check if it loops 39 times 38-0
				//console.log("I looped " + i + " times");
				//calculate monthly add
				customers[j].pension.endamount.pessimistic  += (customers[j].finances.monthlyadd * 12); 
				customers[j].pension.endamount.average 		+= (customers[j].finances.monthlyadd * 12);
				customers[j].pension.endamount.optimistic 	+= (customers[j].finances.monthlyadd * 12);
				//calculate added interest after a year
				customers[j].pension.endamount.pessimistic 	*= customers[j].pension.interest.pessimistic;
				customers[j].pension.endamount.average 		*= customers[j].pension.interest.average;
				customers[j].pension.endamount.optimistic 	*= customers[j].pension.interest.optimistic;
			}
			//output our data
			console.log("Welcome " + customers[j].name + " to our advanced pension planner!");
			console.log("You're starting with: " + customers[j].finances.startcapital + " and add a monthly amount of " + customers[j].finances.monthlyadd);
			console.log("When you retire at age: " + customers[j].pension.age + " you will have the following: ")
			//output calculation stuff
			console.log("In a pessimistic scenario: €" 	+ functionsObject.prettyNr(customers[j].pension.endamount.pessimistic));
			console.log("In a average scenario: €" 		+ functionsObject.prettyNr(customers[j].pension.endamount.average));
			console.log("In a optimistic scenario: €" 	+ functionsObject.prettyNr(customers[j].pension.endamount.optimistic));
		}
	}
}

module.exports = calcCompoundInterest;