// PROTOTYPE PRACTICE
// emailList is a prototype/object constructor
function emailList(nameEmailList) {
	//returns instance which contains the name of the email list
	this.nameEmailList = nameEmailList;
	//returns an instance which contains an array of the email in that list
	this.listOfEmails = [];
	//adds email adress to the array listOfEmails
	this.addEmail = function(emailAddress){
		this.listOfEmails.push(emailAddress);
	};
	//sends an email to each adress in the list with as its content textEmail
	this.sendEmailToAll = function(textOfEmail){
		console.log("Email content: " + textOfEmail + "\n Sending email to:" + this.listOfEmails);
	};
}

// Construct a new emailList
var myEmailList = new emailList("NYCDA");

// Testing emailList
myEmailList.addEmail("info@NYCDA.com");

myEmailList.sendEmailToAll("bla bla");

/* 
--- if you want to add another function to the prototype from outside of the prototype you do it like this:---

emailList.prototype.addEmail = function(emailAddress){
		this.listOfEmails.push(emailAdress);
	};

emailList.prototype.sendEmailToAll = function(textOfEmail){
		console.log("Email content: " + textOfEmail + "\n Sending email to:" + this.listOfEmails);
	};
*/

/* via namePrototype.prototype.nameNewProperty = newValue; toevoegen is wel degelijk beter: het zorgt ervoor 
 dat dat stukje alleen een keer wordt gecreeerd als prototype in de object constructor en niet voor elke instance, waardoor het programma sneller is. 
 Wel elke instance kan erbij via de prototype van de object constructor */


// ADDITIONALLY
// 1. function that returns the area of a circle
function areaOfCircle(radius){
	return Math.PI * radius * radius;
}

// first: print of expected value and print result of test
console.log("Expected value = 50.265482");
console.log(areaOfCircle(4));

// second: print of expected value and print result of test
console.log("Expected value = 314.159265");
console.log(areaOfCircle(10));




// 2. function that returns the last character of a string
function returnLastCharacter(string){
	return string[string.length - 1];
}

// first: print of expected value and print result of test
console.log("Expected value = g");
console.log(returnLastCharacter("Thong Song"));

// second: print of expected value and print result of test
console.log("Expected value = o");
console.log(returnLastCharacter("Sisqo"));




// 3. function that prints out stars in the length of the parameter (number)
function printStars(howManyStars){
	for(var i = "*"; i.length <= howManyStars; i += "*"){
		if(i.length == howManyStars){
			console.log(i);
		}
	}
}

// first: print of expected value and print result of test
console.log("Expected value = ****");
printStars(4);

// second: print of expected value and print result of test
console.log("Expected value = ********");
printStars(8);




// 4. function that prints out a square of stars of the length of the parameter (number)
function printSquareOfStars(lengthOfStars){
	for(var i = "*"; i.length <= lengthOfStars; i += "*"){
		if(i.length == lengthOfStars){
			for(var x = "*"; x.length <= lengthOfStars; x += "*"){
			console.log(i);
		}
		}
	}
}

// first: print of expected value and print result of test
console.log("Expected value = \n ** \n **");
printSquareOfStars(2);

// second: print of expected value and print result of test
console.log("Expected value = \n **** \n **** \n **** \n ****");
printSquareOfStars(4);




// 5. function to find the average of an array of integers
function averageOfArray(arrayName){
	var total = 0;
	for(var i = 0; i < arrayName.length; i++){
		total += arrayName[i];
	}
	return total / arrayName.length;
}

// first: print of expected value and print result of test
var myGrades = [8, 9, 10, 7];
console.log("Expected value = 8.5");
console.log(averageOfArray(myGrades));

// second: print of expected value and print result of test
var yourGrades = [6, 8, 10, 6];
console.log("Expected value = 7.5");
console.log(averageOfArray(yourGrades));




// OPTIONAL CHALLENGE
// function to find largest common integer of two arrays
function largestCommonInteger(arrayOne, arrayTwo){
	/* 	set variable 'largest' to smallest possible: 0, so when you compare in your loop 
	 	it will set itself to the new value when that is bigger */
	var largest = 0;
	// loop through the first array
	for(var i = 0; i < arrayOne.length; i++){
		// loop through the second array
		for(var x = 0; x < arrayTwo.length; x++) {
		/* 	if number of the first array is the same as a number in the second array 
			AND it is also bigger than 'largest', set it as the new value of 'largest'
			this loop continues untill the both whole arrays are checked */
			if(arrayOne[i] == arrayTwo[x] && arrayOne[i] > largest){
				largest = arrayTwo[x]
			}
		}
	}
	return largest;
}	

// declared two arrays to compare
var someNumbers =[3, 7, 2];
var otherNumbers = [2, 1, 10, 7];

// print expected value
console.log("Expected value = 7");

// call and print the function to find the largest common integer
console.log(largestCommonInteger(someNumbers, otherNumbers));

// voorbeeld: vind de grootste integer in array en return die
// function testfunctie () {
// 	var array = [6,564,2321,8,7];
// 	var grootste = 0;
// 	for (var y = 0; y < array.length; y++) {
// 		if (array[i] > grootste) {
// 			grootste = array[0];
// 		}
// 	}
// 	return grootste 
// }








