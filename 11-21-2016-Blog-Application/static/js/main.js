$(document).ready( () => {
	$( () => {
		//highlight current nav
		// looks for # on body, and if a (link) contains the string, than adds a class to that link: active
		$("#newsfeed a:contains('Newsfeed')").parent().addClass('active');
		$("#profile a:contains('Profile')").parent().addClass('active');
	})
});