console.log("hello");


function search(query) {
	var apiUrl = 'https://api.twitch.tv/kraken/search/streams?q=';

	// use xhr to get the data
	var xhr = new XMLHttpRequest();
	xhr.open('GET', encodeURI(apiUrl+query));
	xhr.onload = function() {
	    if (xhr.status === 200) {
	        console.log(xhr.responseText);
	    } else {
	        console.log('Request failed.  Returned status of ' + xhr.status);
	    }
	};
	xhr.send();
}

search('hello');