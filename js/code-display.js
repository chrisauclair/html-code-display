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
		var s = formatCodeBlock($codeBlock);

		// create and append code
		var $pre = $('<code' + language + '">' + s + '</code>');
		$(this).append($pre);
	});

	// remove code with exclude class
	function excludeCode($obj) {
		$obj.find('.code-display-exclude').each(function(){
			$(this).remove();
		});

		return $obj;
	}

	// remove extra indentation from html source
	function formatCodeBlock($obj) {
		var blockString = $obj.html();
		var strings = blockString.split('\n');

		var minLength = 0;
		for(var i = 0; i < strings.length; i++) {
			var lineString = strings[i];

			// get length of whitespace
			var whitespace = lineString.replace(/^(\s*)\S.*$/,/$1/);
			var length = whitespace.length;		

			// set minimum length to remove
			if(minLength === 0 || minLength > length) {
				minLength = length;
			}

			// remove minimum whitespace from start of string
			lineString = lineString.substr(minLength - 2);
			strings[i] = lineString;
		}

		blockString = strings.join("\n");

		return blockString;
	}

});
