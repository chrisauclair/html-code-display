/* HTML code display JS */
$(document).ready(function(){

	// must be the first the JS does or else
	var $pageSource = $('html');

	// generate code for each example
	$pageSource.find('.code-display').each(function(){
		// ignore if parent has ignore class
		var $ignore = $(this).closest('.code-display-ignore, .cd-ignore');
		if($ignore.length !== 0) {
			return true;
		}

		// get data
		var id = $(this).data('code-id');
		var language = ($(this).data('language')) ? $(this).data('language') : '';
		language = ' data-language="' + language + '"';

		// get codeblock and skip if none found for id
		var $codeBlock = $('#' + id);
		$codeBlock = $codeBlock.clone();
		if($codeBlock.length === 0){
			return true;
		}

		// clear content
        $(this).html('');

		// remove excluded code from block
		$codeBlock = excludeCode($codeBlock);
		var s = formatCodeBlock($codeBlock);

		// create pre and code elements
		var $pre = $('<pre></pre>');
		var $code = $('<code' + language + '></code>');
		$pre.append($code);

		// encode entities to avoid rendering XHTML namespace declaration
		$code.text(s).html();

		// append to dom
		$(this).append($pre);
	});

	// remove code with exclude class
	function excludeCode($obj) {
		// code collapse
		$obj.find('.code-display-collapse, .cd-collapse').each(function(){
			$(this).replaceWith('...');
		});

		// code ignore
		$obj.find('.code-display-ignore, .cd-ignore').each(function(){
			$(this).replaceWith('');
		});

		return $obj;
	}

	// remove blanks from array
	function removeBlanks(array) {
		var newArray = [];
		for(var i = 0; i < array.length; i++) {
			var string = array[i];
			if(string !== "" && string !== undefined && string.match(/\S+$/)) {
				newArray.push(string);
			}
		}

		return newArray;
	}

	// remove extra indentation from html source
	function formatCodeBlock($obj) {
		var blockString = $obj.html();

		var strings = blockString.split('\n');
		strings = removeBlanks(strings);

		var minLength = 0;
		for(var i = 0; i < strings.length; i++) {
			var lineString = strings[i];

			// remove XHTML namespace declaration from string
			lineString = lineString.replace(' xmlns="http://www.w3.org/1999/xhtml"', '');

			// replace tabs with 4 spaces
			lineString = lineString.replace(/\t/g,'    ');

			// get length of whitespace
			var whitespace = lineString.replace(/^(\s*)\S.*$/,/$1/);
			var length = whitespace.length;

			// format ellipsis for collapsed code
			lineString = formatEllipsis(lineString, minLength, length);

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

	function formatEllipsis(string, prevLength, length) {
		if(string.match(/\s\.\.\.$/) && prevLength <= length) {
			string = '    ' + string;
		}

		return string;
	}

});
