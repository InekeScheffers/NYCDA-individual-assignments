$( document ).ready(function(){
	$(".button-collapse").sideNav();

	// to make sure my AJAX request only happens once every 300 milliseconds, but when I load the search page it doesn't have to wait
	// I first set lastCall to 0
	let lastCall = 0;

	//autocomplete search user, listening to when there's new input in inputfield
	$( "#search" ).on('input', function (event) {
		//test if you can console.log the whole string in the input field
		// console.log(event.target.value) || console.log($(this).val())

		// this if statement makes sure the AJAX request only runs when the lastCall was at least 300 milliseconds ago
		if(lastCall + 300 < Date.now()){
			let inputSearch = {input: event.target.value};
	  		// console.log(inputSearch);

	  		// when something changes in the inputfield a post request is send to /autofill
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

	  		// after the AJAX request is handled, it sets lastCall to Date.now(), so it doesn't runs immediately again when there is new input
	  		lastCall = Date.now();
  		}
	})

})