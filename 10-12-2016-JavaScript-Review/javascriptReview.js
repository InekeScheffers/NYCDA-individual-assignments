// write a function that takes in three parameters and returns the sum of those three parameters
function sumOfThings(x, y, z){
	return x + y + z;
}

console.log("I expect 6");
console.log(sumOfThings(1, 2, 3));

// given a string, create a function that returns the last character in that string.
// examples:
// "cattywampus" --> s
function returnLastCharacter(string){
	return string[string.length - 1];
}

console.log("I expect h");
console.log(returnLastCharacter("Choccywoccydoodah"));

// write a function that takes in one parameter and returns the cube of that parameter
// examples:
// 3 --> 27
// 4 --> 64
function calculateCube(width){
	return Math.pow(width, 3);
}

console.log("I expect 64");
console.log(calculateCube(4));


// define a function that takes in a string and reverses it. you are not allowed to
// call the "reverse" function (or any other string functions)
function reverseString(string){
	var stringInReverse = "";
	for (var i = string.length - 1; i >= 0; i--) {
		stringInReverse += string[i];
	}
	return stringInReverse;
}

console.log("I expect ekenI");
console.log(reverseString("Ineke"));


// write a function that takes in two arrays of the same length as parameters. From those two arrays,
// create, then return an object which contains the elements of the first array as keys, and the
// elements of the second array as values.
// examples:
// ["exciting", "exotic"], ["markets", "britain"] --> { exciting: "markets", exotic: "britain" }
// ["a", "b", "c"], ["x", "y", "z"] --> { a: "x", b: "y", c: "z" }
function creatObjectFromArrays(array1, array2){
	var objectFromArrays = {};
	for(var i = 0; i < array1.length; i++){
		objectFromArrays[array1[i]] = array2[i];
	}
	return objectFromArrays;
}

// test:

var keys = ['one', 'two', 'three'];
var values = ['a', 'b', 'c'];

creatObjectFromArrays(keys, values);

// Given an object with keys and values, create two arrays: one which contains the object's keys,
// and one which contains the object's values. Wrap this into a function which takes in one object
// that contains keys and values, and returns a different object that contains two keys. The first key
// should be named "keys" and will have the first array as a value. The second key should be named
// "values" and will have the second array as a value.
// examples:
// { exciting: "markets", exotic: "britain" } --> { keys: ["exciting", "exotic"], values: ["markets", "britain"] }
// { a: "x", b: "y", c: "z" } --> { keys: ["a", "b", "c"], values: ["x", "y", "z"] }

var margeritha = {
	name: "margeritha",
	sauce: "tomato sauce",
	topping: "cheese"
}

function splitObject(object){
// create properties named "keys" and "values"
// keys and values of object as seperate arrays
// these two arrays are the values of the new object, with the properties "keys" and "values"
	var array1 = [];
	var array2 = [];
	for(var keys in object){
		array1.push(keys);
		array2.push(object[keys]);
	}
	return {
		keys: array1,
		values: array2
	} 
}

splitObject(margeritha);

// OPTIONAL CHALLENGE 1
// write a function that takes in two parameters, x and n, and computes x to the nth power
// you may not use Math.* functions
function xToTheNthPower(x, n){
	var result = x;
	for(var i = 1; i < n; i++) {
		result *= x; 		
	}
	return result;
}

console.log("I expect 81");
console.log(xToTheNthPower(3, 4));

// OPTIONAL CHALLENGE 2
// Jon has terrible social anxiety, and wishes to sit as far away from everyone as possible.
// Given an array of booleans, where the array represents a row of seated people, and each
// boolean represents whether the seat is occupied or not, find the ideal seat for Jon.

// false is available, true is occupied

//var rowOne = [false, true, true, false, true, true, true, false];
var rowOne = [true, false, false, true, false, false, false, true];
// Expected best seat: seat 6 or rowOne[5];
//var rowTwo = [true, true, true, true, true, false, true, false];
var rowTwo = [false, true, false, false, false, false, false, true];
// Expected best seat: seat 5 or rowOne[4];

function seatForSocialAnxietyJon(rowOfSeats){
	var bestSeatScore = null;
	var bestSeatIndex = null;

	for(var seatIndex = 0; seatIndex < rowOfSeats.length; seatIndex++) {
		// start by -1, 'cause an occupied seat is no option: -1, a free seat is an option, but still can have occupied seats right next to it: 0, and only if seat next to it is free it gets a point
		var seatScore = -1;

		// check to see if seat is free: false, only then I want to check if seat has most empty seats next to it, true/occupied seats aren't an option
		if(!rowOfSeats[seatIndex]) {
			//how many seats are false to the left of checked seat?
			//if seat is false/empty he can sit, but only gets a point for every seat to the left that's free, stops when one is occupied/true
			var leftSideSeatScore = 0;
			//loop to the left of array
			for (var i = seatIndex - 1; i >= 0; i--) {
				//if seat to the left is free, leftSideSeatscore + 1, untill there is an occupied seat
				if(!rowOfSeats[i]) { 
					leftSideSeatScore++;
				} else {
					break;
				}

			}

			//how many seats are false to the right of checked seat?
			//if seat is false/empty he can sit, but only gets a point for every seat to the right that's free, stops when one is occupied/true
			var rightSideSeatScore = 0;
			//loop to the right of array
			for (var o = seatIndex + 1; o < rowOfSeats.length; o++) {
				//if seat to the right is free, rightSideSeatscore + 1, untill there is an occupied seat
				if(!rowOfSeats[o]) { 
					rightSideSeatScore++;
				} else {
					break;
				}

			}
			
			//compare leftSideSeatScore to rightSideSeatscore, smallest is the seatscore, cause you can have seats to on side that are free, but if seat on other side is occopied you still sit closest to another person
			if(leftSideSeatScore < rightSideSeatScore){
				seatscore = leftSideSeatScore;
			} else {
				seatScore = rightSideSeatScore;
			}
		}

		//check what is the highest seatscore in array and set that to bestSeatScore and bestSeatIndex
		if(seatScore > bestSeatScore) {
			bestSeatScore = seatScore;
			bestSeatIndex = seatIndex;
		}
	}
	//if you count seats starting at one, from left to right, the best seat is the index (index from 0) + 1
	console.log("Best seat is: " + (bestSeatIndex + 1) );
}


seatForSocialAnxietyJon(rowOne);
seatForSocialAnxietyJon(rowTwo);


/// jeroen's code, nog niet af

// var rowOne = [true, false, false, true, false, false, false, true];
// // seat 6 or rowOne[5];
// //var rowTwo = [true, true, true, true, true, false, true, false];
// var rowTwo = [false, false, false, false, false, true, false, true];
// // seat 3 or rowTwo[2];
// var rowThree = [true, false, false, true, false, false, false, false];

// function seatForSocialAnxietyJon(rowOfSeats){
// 	var bestSeatScore = -1;
// 	var bestSeatIndex = -1;

// 	for(var seatIndex = 0; seatIndex < rowOfSeats.length; seatIndex++) {
// 		var seatScore = -1;

// 		// hier checken we of de stoel vrij is (true is niet vrij false is vrij)
// 		if(!rowOfSeats[seatIndex]) {
// 			//  hier gaan we berekenen

// 			//hoeveel links van de stoel false 
// 			var leftSideSeatScore = 0;
//       var seatsfreetillbeginningofrow = true;

// 			// hoeveel stoelen zijn er links van de huidige stoel vrij?
// 			for (var i = seatIndex - 1; i >= 0; i--) {
// 				if(!rowOfSeats[i]) { 
// 					leftSideSeatScore++;
// 				} else {
//         	seatsfreetillbeginningofrow = false;
// 					break;
// 				}

// 			}
      
// 			var rightSideSeatScore = 0;
// 			//hoeveel rechts van de stoel op false
// 			for (var i = seatIndex + 1; i < rowOfSeats.length; i++) {
// 				if(!rowOfSeats[i]) { 
// 					rightSideSeatScore++;
// 				} else {
// 					break;
// 				}

// 			}
// 			//het kleinste getal is de score
//       if(leftSideSeatScore != seatIndex && leftSideSeatScore < rightSideSeatScore && rightSideSeatScore != rowOfSeats.length -1){
//       	seatScore = leftSideSeatScore;
//       } else {
//       	seatScore = rightSideSeatScore;
//       }
// 		}
//     console.log("seatscore is: " + seatScore + " for seatindex: " + seatIndex);
    
// 		if(seatScore > bestSeatScore) {
// 			bestSeatScore = seatScore;
// 			bestSeatIndex = seatIndex;
// 		}
		
// 	}
// }
//   console.log("one ================");
// seatForSocialAnxietyJon(rowOne);
//   console.log("two ================");
// seatForSocialAnxietyJon(rowTwo);
//   console.log("three ================");
//   seatForSocialAnxietyJon(rowThree);














