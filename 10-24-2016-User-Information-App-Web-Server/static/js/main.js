$( document ).ready(function(){
	$(".button-collapse").sideNav();

	//autocomplete search user, starting when start to type in inputfield: #search
	//$( "#search" ).keyup(function () {}
	//autocomplete search user, starting when there's some input in inputfield
	$( "#search" ).on('input', function () {
		// test if .keypress in inputfield works
		// console.log("Handler for .keypress() called.");
		// test if you can console.log the value of the pressed key
		// console.log(event.key);
		//test if you can console.log the whole string in the input field
		// console.log(event.target.value)
		console.log($(this).val())

		let inputSearch = {input: event.target.value};
  		// console.log(inputSearch);

  		$.post('/autofill', inputSearch, function (data) {
  			// console.log(data);
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