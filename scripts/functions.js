/*
 * Author: Vincent Besson
 */

// FUNCTIONS

/*
 * Adds a distinct() function to Array.
 * Date: 08 July 2010
 * Ref: http://www.bytechaser.com/en/functions/xjfj6grjfr/create-a-distinct-list-from-a-javascript-array.aspx
 */
Array.prototype.distinct = function () {
	ignorecase = true; // For instance
	array = this;
	if(typeof ignorecase =="undefined"||array==null||array.length==0) return null;
	if(typeof ignorecase =="undefined") ignorecase=false;
	var sMatchedItems="";
	var foundCounter=0;
	var newArray=[];
	for(var i=0;i<array.length;i++) {
		var sFind=ignorecase?array[i].toLowerCase():array[i];
		if(sMatchedItems.indexOf("|"+sFind+"|")<0) {
			sMatchedItems+="|"+sFind+"|";
			newArray[foundCounter++]=array[i];
		}
	}
	return newArray;
}

/*
 * Finds all hashtags in text string and returns an array list of it.
 */
function hashtag_it(text){
	// TODO: take accound of special chars in hashtags id "-"
	var hashtag = /#\S*/g;
	return text.match(hashtag);
}

/*
 * Data mines an array of hashtags
 */
function dataMines(array){
	
	// Flatten arrays and find uniques
	var ker = array.join().split(',');
	var im = ker.distinct();
	var freqArray = new Array(im.length);
	
	// Counts members of im in ker
	// TODO: use jQuery instead of for loops!
	var freq = 0;
	for (var i = 0; i < im.length; i += 1) {
		for (var j = 0; j < ker.length; j += 1) {
			if (im[i].match(ker[j])) {
				freq = freq + 1;
			}
		}
		freqArray[i] = freq;
		freq = 0;	
	}

	// Returns an associative array (hash table)
	var data = {};
	for (var i = 0; i < im.length; i += 1) {
		eval("var temp = {'"+im[i]+"': "+freqArray[i]+'}'); // -_-'
		$.extend(data, temp);
	}
	return data;
}

/*
 * Prints data
 */
function visual_it(data){
	$('#graph').html('<span></span>');
	$.each(data, function(key, value){
		$('#graph').append('<div class="bar" style="width: '+value*5+'%;">'+key+'</div>');
	});
}

/*
 * Timer
 */
waiter = function(){

	// Progress bar
	switch($('#progress').attr('title')) {
		case '0':
			$('#progress').css('width','20%').attr('title','1');
			console.log('Refresh in 50s');
			break;
		case '1':
			$('#progress').css('width','40%').attr('title','2');
			console.log('Refresh in 40s');
			break;
		case '2':
			$('#progress').css('width','60%').attr('title','3');
			console.log('Refresh in 30s');
			break;
		case '3':
			$('#progress').css('width','80%').attr('title','4');
			console.log('Refresh in 20s');
			break;
		case '4':
			$('#progress').css('width','100%').attr('title','5');
			console.log('Refresh in 10s');
			break;
		case '5':
			$('#progress').css('width','0%').attr('title','0');
			console.log('Refresh!');
			break;
		default:
			// code
	}
}

/*
 * Grabs data, prints it.
 * ! Javascript that is added dynamically to a page needs to be eval-d in order to correctly initialise.
 */
works = function (){

	console.log('Beginning request...');

	// Creates the request URL.
	twitter_api_url = 'http://search.twitter.com/search.json';
	twitter_request = '?callback=?&q=since%3A2012-01-01%20%23jeuvideo%20OR%20%23jeuxvideo%20OR%20%23jeuxvideos%20lang%3Afr';

	// Gets the result (JSON) from twitter and parses it.
	data = {};
	myHashTags = [];

	$.getJSON(
		twitter_api_url + twitter_request,
		function(json){
			$.each(json.results, function(i, tweet) {
				texte = tweet.text;
				myHashTags.push(hashtag_it(texte));
			});
			console.log('...end request.');
			console.log('Mining data.');
			data = dataMines(myHashTags);
			console.log('Visual effects');
			visual_it(data);
		}
	);
}
