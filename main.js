console.log("hello");

var searchResults;

function search() {
	var apiUrl = 'https://api.twitch.tv/kraken/search/streams?q=';
	var query = document.getElementById('query').value;

	// use xhr to get the data
	var xhr = new XMLHttpRequest();
	xhr.open('GET', encodeURI(apiUrl+query));
	xhr.onload = function() {
	    if (xhr.status === 200) {
	    	searchResults = JSON.parse(xhr.responseText).streams;
	        console.log(JSON.parse(xhr.responseText).streams);
	        populateResults();
	    } else {
	        console.log('Failed! Status: ' + xhr.status);
	    }
	};
	xhr.send();
}

function populateResults() {
	//add results count
	var totalNode = document.getElementById('total-results');
	totalNode.innerText = 'Total results: ' + searchResults.length;

	var resultsContainer = document.getElementById('results');
	for (var i = 0; i < searchResults.length; i ++) {
		var imageSrc = searchResults[i].preview.small;

		var current = searchResults[i].channel;
		var streamName = current.display_name;
		var gameName = current.game;
		var viewCount = current.views;
		var description = current.status;
		var resultHtml =
			'<div class="result">' +
				'<img class="image" src="' + imageSrc + '"></img>' +
				'<div class="details">' +
					'<div class="stream-name">' + streamName + '</div>' +
					'<div class="game-and-views">' + gameName + ' - ' + viewCount + ' viewers</div>' +
					'<div class="stream-description">' + description + '</div>' +
				'</div>' +
			'</div>';

		var resultNode = document.createElement('div');
		resultNode.innerHTML = resultHtml;
		resultNode.className = 'result';
		resultsContainer.appendChild(resultNode);
	}
}