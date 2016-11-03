$( () => {
	//highlight current nav
	// looks for # on body, and if a (link) contains the string, than adds a class to that link: active
	$("#leavemessage a:contains('Leave a message')").parent().addClass('active');
	$("#bulletinboard a:contains('Bulletin board')").parent().addClass('active');
})