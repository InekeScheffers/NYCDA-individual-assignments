// function that finds the sum of two parameters
function findSum(firstnr, secondnr){
	return firstnr + secondnr;
}

//function that finds the product of two parameters
function findProduct(firstnr, secondnr){
	return firstnr * secondnr;
}

/* threeOperation calls the operation parameter as a function so it's able to run and "do" different things 
depending on the global function it takes as a parameter when calling it*/
function threeOperation (x, operation){
	/*put console.log here so it doesn't only returns the result but also prints it in the console first: 
	to check if it gives the right answer when it's called*/
	console.log(operation(3, x));
	return operation(3, x);
}

//Call "threeOperation" with the values of "4" and "findSum"
threeOperation(4, findSum);

//Call "threeOperation" with the values of "5" and "findSum"
threeOperation(5, findSum);

//Call "threeOperation" with the values of "4" and "findProduct"
threeOperation(4, findProduct);

//Call "threeOperation" with the values of "5" and "findProduct"
threeOperation(5, findProduct);