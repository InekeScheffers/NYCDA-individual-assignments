$( document ).ready(function(){
	$(".button-collapse").sideNav();

	//autocomplete search user, starting when start to type in inputfield: #search
	//so also when you type a Shift to capitalize a letter, so changed to .on('input')
		//$( "#search" ).keyup(function () {}
			// test if .keypress in inputfield works
			// console.log("Handler for .keypress() called.");
			// test if you can console.log the value of the pressed key
			// console.log(event.key);

	//autocomplete search user, starting when there's some input in inputfield
	$( "#search" ).on('input', function (event) {
		//test if you can console.log the whole string in the input field
		// console.log(event.target.value) || console.log($(this).val())

		let inputSearch = {input: event.target.value};
  		// console.log(inputSearch);

  		// everytime something changes in the inputfield a post request is send to /autofill
  		// the callback gets its data from app.js (autofill)
  		$.post('/autofill', inputSearch, function (data) {
  			// first set datalist with #results to empty again when request is made so it's not just appended and added to last result
  			$('#results').empty()
  				// test if you succesfully got passed the data (autofill) from app.js 
  				// console.log(data);
  				for (let i = data.length - 1; i >= 0; i--) {
  					// test if loop works
  					// console.log("this is triggered " + i + " times")
  					// append first+lastname to datalist #results
  					$('#results').append('<option>' + data[i].firstname + " " + data[i].lastname + '</option>')
  				}
  			})
	})

})