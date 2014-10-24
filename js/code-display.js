/* HTML code display JS */
$(document).ready(function(){

	// must be the first the JS does or else
	var $pageSource = $('html');

	// generate code for each example
	$pageSource.find('.code-display').each(function(){
		var id = $(this).attr('data-code-id');
		var $codeBlock = $('#' + id);
	});
});
