document.getElementById('button').onclick = function() {
	//alert when not all fields are filled out when the submit button is clicked
	if (!document.forms['user-form']['firstname'].value || !document.forms['user-form']['lastname'].value || !document.forms['user-form']['email'].value) {
		alert("Oops, you have to fill in all fields to add a user. Try again!")
	}
}

//konami on document ready?