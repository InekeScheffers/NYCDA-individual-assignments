// main.js will not touch browser
// so has to require sass
// so its compiles in app.js (frontend)
require('../sass/main.scss')

$(document).ready( () => {
	$( () => {
		//highlight current nav
		// looks for # on body, and if a (link) contains the string, than adds a class to that link: active
		$("#newsfeed a:contains('Newsfeed')").parent().addClass('active');
		$("#profile a:contains('Profile')").parent().addClass('active');
	})
});