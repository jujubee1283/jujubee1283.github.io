var searchResults;
var currentPage = 0;
var pageLength = 5;
var maxPage = 1;

function search() {
	var apiUrl = 'https://api.twitch.tv/kraken/search/streams?q=';
	var query = document.getElementById('query').value;

	// turn on loading spinner
	showById('loading-spinner');

	// JSONP
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = apiUrl + query + '&callback=searchCallback';
	document.body.appendChild(script);

	// remove script after it's been executed
	document.body.removeChild(document.body.lastChild);
}

function searchCallback(data) {
	// turn off loading spinner
	hideById('loading-spinner');
	if (data.status) {
		console.log('Failed! Status: ' + data.status);
		searchResults = [];
	} else {
		searchResults = data.streams;
	}
	populateResults();
}

function populateResults() {
	maxPage = Math.ceil(searchResults.length / pageLength);
	// set initial currentPage and initialize pagination arrows
	currentPage = 0;
	hideById('left-arrow');
	hideById('right-arrow');
	if (maxPage > 1) {
		showById('right-arrow');
	}
	// display the results section
	document.getElementById('results-section').style.display = 'block';

	// add results count
	var totalNode = document.getElementById('total-results');
	totalNode.innerText = 'Total results: ' + searchResults.length;

	// render results
	var resultsToDisplay = searchResults.slice(0, pageLength);
	renderResults(resultsToDisplay);
}

function renderResults(resultsToDisplay) {
	updatePageNumber();
	var resultsContainer = document.getElementById('results');
	resultsContainer.innerHTML = '';

	// loop through results and add them to the page
	for (var i = 0; i < resultsToDisplay.length; i ++) {
		var imageSrc = resultsToDisplay[i].preview.small;
		var viewers = resultsToDisplay[i].viewers;

		var current = resultsToDisplay[i].channel;
		var streamName = current.display_name;
		var gameName = current.game;
		var description = current.status;

		var resultHtml =
				'<img class="image" src="' + imageSrc + '"></img>' +
				'<div class="details">' +
					'<div class="stream-name">' + streamName + '</div>' +
					'<div class="game-and-views">' + gameName + ' - ' + viewers + ' viewers</div>' +
					'<div class="stream-description">' + description + '</div>' +
				'</div>';

		var resultNode = document.createElement('div');
		resultNode.innerHTML = resultHtml;
		resultNode.className = 'result';
		resultsContainer.appendChild(resultNode);
	}
}

function changePage() {
	updatePageNumber();
	// clear existing results
	document.getElementById('results').innerHTML = '';

	var resultsToDisplay = searchResults.slice(currentPage * pageLength, (currentPage+1) * pageLength);
	renderResults(resultsToDisplay);
}

function updatePageNumber() {
	var pageNumNode = document.getElementById('page-num');
	if (maxPage > 0) {
		pageNumNode.innerText = (currentPage+1) + '/' + (maxPage);
	} else {
		pageNumNode.innerText = '0/0';
	}
}

function pageUp() {
	currentPage += 1;

	changePage();
	if (currentPage === maxPage-1) {
		// hide next page button
		hideById('right-arrow');
	}
	if (currentPage > 0) {
		// show back page button
		showById('left-arrow');
	}
}

function pageDown() {
	currentPage -= 1;

	changePage();
	if (currentPage === 0) {
		// hide back page button
		hideById('left-arrow');
	}
	if (currentPage < maxPage-1) {
		// show next page button
		showById('right-arrow');
	}
}

function hideById(id) {
	document.getElementById(id).style.visibility = 'hidden';
}

function showById(id) {
	document.getElementById(id).style.visibility = 'visible';
}

function initHandler() {
	// do search on enter key pressed in the query input
	document.getElementById('query').onkeypress = function(e) {
		if(e.keyCode == 13) {
			search();
		}
	}
}
