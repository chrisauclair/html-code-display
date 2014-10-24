/* HTML code display JS */
$(document).ready(function(){

	// must be the first the JS does or else
	var $pageSource = $('html');

	// generate code for each example
	$pageSource.find('.code-display').each(function(){
		var id = $(this).attr('data-code-id');
		var language = ($(this).attr('data-language')) ? $(this).attr('data-language') : '';
		var $codeBlock = $('#' + id);
		var $pre = $('<pre><code data-language="' + language + '">' + $codeBlock.html() + '</code></pre>');
		$(this).append($pre);
	});
});
