/* HTML code display JS */
$(document).ready(function(){

	// must be the first the JS does or else
	var $pageSource = $('html');

	// generate code for each example
	$pageSource.find('.code-display').each(function(){
		// get data
		var id = $(this).data('code-id');
		var language = ($(this).data('language')) ? $(this).data('language') : '';
		language = ' data-language="' + language + '"';
		// get codeblock and remove excluded code
		var $codeBlock = $('#' + id);
		$codeBlock = excludeCode($codeBlock);

		// create and append code
		var $pre = $('<code' + language + '">' + $codeBlock.html() + '</code>');
		$(this).append($pre);
	});

	// remove code with exclude class
	function excludeCode($obj) {
		$obj.find('.code-display-exclude').each(function(){
			$(this).remove();
		});

		return $obj;
	}


});
