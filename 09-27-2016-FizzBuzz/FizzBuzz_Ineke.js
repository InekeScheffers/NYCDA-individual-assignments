for(var i = 1; i <= 100; i++){ 		// start at 1; run code until reached 100, stop when reached 101; add 1
	if(i % 3 == 0 && i % 5 == 0){ 	// if i = divisible by 3 and divisible by 5 log FizzBuzz
		console.log("FizzBuzz");
	} else if(i % 3 == 0) { 		// if i = a multiple of 3 only, log Fizz
		console.log("Fizz");
	} else if (i % 5 == 0) {		// if i = a multiple of 5 only, log Buzz
		console.log("Buzz");
	} else {						// in any other case log i (the integer)
		console.log(i);
	}
}


/* Note to self: 

--- interesting Eloquent JavaScript solution ---

for (var n = 1; n <= 100; n++) {
 var output = "";
 if (n % 3 == 0)
   output += "Fizz";
 if (n % 5 == 0)
   output += "Buzz";
 console.log(output || n);
}

--- a second interesting solution: ---

for (var i = 1; i <= 100; i++) {
  var f = i % 3 == 0, b = i % 5 == 0;
  console.log(f ? b ? "FizzBuzz" : "Fizz" : b ? "Buzz" : i);
}

--- a third interesting solution: ---

for(i=0;i<100;)console.log((++i%3?'':'Fizz')+(i%5?'':'Buzz')||i)

*/