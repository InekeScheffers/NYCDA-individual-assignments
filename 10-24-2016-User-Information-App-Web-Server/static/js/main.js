$( document ).ready(function(){
	$(".button-collapse").sideNav();

	//autocomplete search user, starting when start to type in inputfield: #search
	//so also when you type a Shift to capitalize a letter
	//$( "#search" ).keyup(function () {}

	//autocomplete search user, starting when there's some input in inputfield
	$( "#search" ).on('input', function (e) {
		// test if .keypress in inputfield works
		// console.log("Handler for .keypress() called.");
		// test if you can console.log the value of the pressed key
		// console.log(event.key);
		//test if you can console.log the whole string in the input field
		// console.log(event.target.value)
		console.log($(this).val())

		let inputSearch = {input: e.target.value};
  		// console.log(inputSearch);

  		$.post('/autofill', inputSearch, function (data) {
  		 $('#results').empty()
  			console.log(data);
  			for (var i = 0; i < data.length; i++) {
  				console.log("this is triggered " + i + " times")
  				$('#results').append('<option>' + data[i].firstname + " " + data[i].lastname + '</option>' + '<option>' + data[i].lastname + " " + data[i].firstname + '</option>')
  			}
  		})



  		// post request (/autofill, object, function (data), {
  			//show data --> jquery
  		// })


  		// $.getJSON( "../users.json", function( data ) {
  		// 	var items = [];
  		// 	$.each( data, function( key, val ) {
  		// 		console.log(val)
  		// 		// if(val.indexOf(event.target.value) >= 0){
   	// 		// 		items.push(val);
   	// 		// 	}
  		// 	});
 
  			// $.post( "search-user", {
    	// 		"class": "autocompleteField",
    	// 		html: items.join( "\n" )
  			// }).appendTo( "body" );
		//})

		// $.post('search-user', data, function(response, status){
		// 	//process response
		// 	//data = autocomplete data as an object

		// })
	// };
	})

})