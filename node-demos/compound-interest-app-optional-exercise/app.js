var outputCalcCompound = require(__dirname + '/json-file-reader.js');

// function to calculate compound interest from a customer object
outputCalcCompound('customer.json', function pensionCalcTemplate(customer, functionsObject){
	//output our data
	console.log("Welcome " + customer.name + " to our advanced pension planner!");
	console.log("You're starting with: " + customer.finances.startcapital + " and add a monthly amount of " + customer.finances.monthlyadd);
	console.log("When you retire at age: " + customer.pension.age + " you will have the following: ")
	//output calculation stuff
	console.log("In a pessimistic scenario: €" 	+ functionsObject.prettyNr(customer.pension.endamount.pessimistic));
	console.log("In a average scenario: €" 		+ functionsObject.prettyNr(customer.pension.endamount.average));
	console.log("In a optimistic scenario: €" 	+ functionsObject.prettyNr(customer.pension.endamount.optimistic));
})



// var dataJSON = require(__dirname + '/json-file-reader.js'); // module that gives data. Output: (JSON) calc function.
//var pensionCalculators = require(__dirname + '/pension-calculators.js'); // mdoule that calculates pension. Input: (JSON) data. Output: msg to user.
//app.js. Input: modules. Output: modules result.

//pensionCalculators(dataJSON('customer.json'))

// // function to calculate compound interest from a customer object
// let pensionCalcTemplate = (customer, functionsObject) => {
// 	//output our data
// 	console.log("Welcome " + customer.name + " to our advanced pension planner!");
// 	console.log("You're starting with: " + customer.finances.startcapital + " and add a monthly amount of " + customer.finances.monthlyadd);
// 	console.log("When you retire at age: " + customer.pension.age + " you will have the following: ")
// 	//output calculation stuff
// 	console.log("In a pessimistic scenario: €" 	+ functionsObject.prettyNr(customer.pension.endamount.pessimistic));
// 	console.log("In a average scenario: €" 		+ functionsObject.prettyNr(customer.pension.endamount.average));
// 	console.log("In a optimistic scenario: €" 	+ functionsObject.prettyNr(customer.pension.endamount.optimistic));
// }
// outputCalcCompound('customer.json',pensionCalcTemplate)

