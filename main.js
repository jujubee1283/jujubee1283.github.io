
var searchResults;
var currentPage = 0;
var pageLength = 5;
var maxPage = 1;

function search() {
	var apiUrl = 'https://api.twitch.tv/kraken/search/streams?q=';
	var query = document.getElementById('query').value;

	// turn on loading spinner
	showById('loading-spinner');

	/*// use xhr to get the data. this works but assignment says to use JSONP
	var xhr = new XMLHttpRequest();
	xhr.open('GET', encodeURI(apiUrl+query));
	xhr.onload = function() {
		if (xhr.status === 200) {
			searchResults = JSON.parse(xhr.responseText).streams;
			populateResults();
		} else {
			console.log('Failed! Status: ' + xhr.status);
		}
	};
	xhr.send();*/

	// JSONP
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = apiUrl + query + '&callback=searchCallback';
	document.body.appendChild(script);
	document.body.removeChild(document.body.lastChild); // remove script after it's been executed
	//document.getElementsByTagName('HEAD')[0].appendChild(script);


	/*var data = JSON.parse('{"_total":19,"_links":{"self":"https://api.twitch.tv/kraken/search/streams?limit=10&offset=0&q=hello","next":"https://api.twitch.tv/kraken/search/streams?limit=10&offset=10&q=hello"},"streams":[{"_id":17373626608,"game":"Resident Evil 4","viewers":68,"video_height":720,"average_fps":29.9205143191,"delay":0,"created_at":"2015-10-29T21:19:15Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_foxwellgnr-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_foxwellgnr-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_foxwellgnr-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_foxwellgnr-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/foxwellgnr"},"channel":{"mature":false,"status":"Ooh! What a pretty village! Let\'s go say hello!","broadcaster_language":"en","display_name":"FoxwellGNR","game":"Resident Evil 4","delay":0,"language":"en","_id":61022297,"name":"foxwellgnr","created_at":"2014-04-16T21:11:09Z","updated_at":"2015-10-30T01:15:49Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/foxwellgnr-profile_image-a7f85a85541a8843-300x300.jpeg","banner":null,"video_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/foxwellgnr-channel_offline_image-ec28423f3c2e41b4-1920x1080.jpeg","background":null,"profile_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/foxwellgnr-profile_banner-457e4a47c52e7a08-480.png","profile_banner_background_color":"#000000","partner":false,"url":"http://www.twitch.tv/foxwellgnr","views":21406,"followers":1157,"_links":{"self":"https://api.twitch.tv/kraken/channels/foxwellgnr","follows":"https://api.twitch.tv/kraken/channels/foxwellgnr/follows","commercial":"https://api.twitch.tv/kraken/channels/foxwellgnr/commercial","stream_key":"https://api.twitch.tv/kraken/channels/foxwellgnr/stream_key","chat":"https://api.twitch.tv/kraken/chat/foxwellgnr","features":"https://api.twitch.tv/kraken/channels/foxwellgnr/features","subscriptions":"https://api.twitch.tv/kraken/channels/foxwellgnr/subscriptions","editors":"https://api.twitch.tv/kraken/channels/foxwellgnr/editors","teams":"https://api.twitch.tv/kraken/channels/foxwellgnr/teams","videos":"https://api.twitch.tv/kraken/channels/foxwellgnr/videos"}}},{"_id":17377804512,"game":"Halo 5: Guardians","viewers":58,"video_height":720,"average_fps":59.9939577039,"delay":0,"created_at":"2015-10-30T01:50:28Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_hellogamergirl-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_hellogamergirl-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_hellogamergirl-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_hellogamergirl-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/hellogamergirl"},"channel":{"mature":false,"status":"HAPPY HALO-WEEN [Video Games & Chill] w/ AshlynnArias","broadcaster_language":"en","display_name":"HelloGamerGirl","game":"Halo 5: Guardians","delay":0,"language":"en","_id":35618666,"name":"hellogamergirl","created_at":"2012-08-22T05:47:28Z","updated_at":"2015-10-30T01:49:50Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/hellogamergirl-profile_image-aa000de1978cfe6d-300x300.png","banner":null,"video_banner":null,"background":null,"profile_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/hellogamergirl-profile_banner-3ab6355fa9fca819-480.jpeg","profile_banner_background_color":"#000000","partner":true,"url":"http://www.twitch.tv/hellogamergirl","views":1121882,"followers":18671,"_links":{"self":"https://api.twitch.tv/kraken/channels/hellogamergirl","follows":"https://api.twitch.tv/kraken/channels/hellogamergirl/follows","commercial":"https://api.twitch.tv/kraken/channels/hellogamergirl/commercial","stream_key":"https://api.twitch.tv/kraken/channels/hellogamergirl/stream_key","chat":"https://api.twitch.tv/kraken/chat/hellogamergirl","features":"https://api.twitch.tv/kraken/channels/hellogamergirl/features","subscriptions":"https://api.twitch.tv/kraken/channels/hellogamergirl/subscriptions","editors":"https://api.twitch.tv/kraken/channels/hellogamergirl/editors","teams":"https://api.twitch.tv/kraken/channels/hellogamergirl/teams","videos":"https://api.twitch.tv/kraken/channels/hellogamergirl/videos"}}},{"_id":17377242128,"game":"The Elder Scrolls Online: Tamriel Unlimited","viewers":25,"video_height":720,"average_fps":29.1252723312,"delay":0,"created_at":"2015-10-30T01:11:13Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_soul_3sc4p3-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_soul_3sc4p3-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_soul_3sc4p3-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_soul_3sc4p3-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/soul_3sc4p3"},"channel":{"mature":false,"status":"AD lvl 24, destrc templar! Hello! :D Chill strum!","broadcaster_language":"en","display_name":"SOUL_3SC4P3","game":"The Elder Scrolls Online: Tamriel Unlimited","delay":null,"language":"en","_id":81830390,"name":"soul_3sc4p3","created_at":"2015-02-05T00:07:29Z","updated_at":"2015-10-30T01:10:45Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/soul_3sc4p3-profile_image-83c907b41a3aa8d7-300x300.png","banner":null,"video_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/soul_3sc4p3-channel_offline_image-69518fdfedba25db-1920x1080.jpeg","background":null,"profile_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/soul_3sc4p3-profile_banner-f4029b84005895e2-480.jpeg","profile_banner_background_color":"#321a98","partner":false,"url":"http://www.twitch.tv/soul_3sc4p3","views":1810,"followers":1014,"_links":{"self":"https://api.twitch.tv/kraken/channels/soul_3sc4p3","follows":"https://api.twitch.tv/kraken/channels/soul_3sc4p3/follows","commercial":"https://api.twitch.tv/kraken/channels/soul_3sc4p3/commercial","stream_key":"https://api.twitch.tv/kraken/channels/soul_3sc4p3/stream_key","chat":"https://api.twitch.tv/kraken/chat/soul_3sc4p3","features":"https://api.twitch.tv/kraken/channels/soul_3sc4p3/features","subscriptions":"https://api.twitch.tv/kraken/channels/soul_3sc4p3/subscriptions","editors":"https://api.twitch.tv/kraken/channels/soul_3sc4p3/editors","teams":"https://api.twitch.tv/kraken/channels/soul_3sc4p3/teams","videos":"https://api.twitch.tv/kraken/channels/soul_3sc4p3/videos"}}},{"_id":17375766864,"game":"FIFA 16","viewers":13,"video_height":720,"average_fps":29.9911653345,"delay":0,"created_at":"2015-10-29T23:33:32Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_tfi_wednesday-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_tfi_wednesday-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_tfi_wednesday-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_tfi_wednesday-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/tfi_wednesday"},"channel":{"mature":false,"status":"TFI AND CHILL - FUT GAMES - R2D1 - COME AND SAY HELLO!","broadcaster_language":"en","display_name":"TFI_Wednesday","game":"FIFA 16","delay":null,"language":"en","_id":59656482,"name":"tfi_wednesday","created_at":"2014-03-26T02:01:32Z","updated_at":"2015-10-30T01:15:45Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/tfi_wednesday-profile_image-076aa1210c150471-300x300.png","banner":null,"video_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/tfi_wednesday-channel_offline_image-3eb5c0540a0181f1-1920x1080.png","background":null,"profile_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/tfi_wednesday-profile_banner-4b5f29bc6d65e5f2-480.png","profile_banner_background_color":"#070708","partner":false,"url":"http://www.twitch.tv/tfi_wednesday","views":7870,"followers":4296,"_links":{"self":"https://api.twitch.tv/kraken/channels/tfi_wednesday","follows":"https://api.twitch.tv/kraken/channels/tfi_wednesday/follows","commercial":"https://api.twitch.tv/kraken/channels/tfi_wednesday/commercial","stream_key":"https://api.twitch.tv/kraken/channels/tfi_wednesday/stream_key","chat":"https://api.twitch.tv/kraken/chat/tfi_wednesday","features":"https://api.twitch.tv/kraken/channels/tfi_wednesday/features","subscriptions":"https://api.twitch.tv/kraken/channels/tfi_wednesday/subscriptions","editors":"https://api.twitch.tv/kraken/channels/tfi_wednesday/editors","teams":"https://api.twitch.tv/kraken/channels/tfi_wednesday/teams","videos":"https://api.twitch.tv/kraken/channels/tfi_wednesday/videos"}}},{"_id":17375324112,"game":"Snowboard Kids 2","viewers":12,"video_height":720,"average_fps":59.0001776199,"delay":0,"created_at":"2015-10-29T23:05:04Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_harpooncannon-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_harpooncannon-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_harpooncannon-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_harpooncannon-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/harpooncannon"},"channel":{"mature":false,"status":"SBK2 speedruns of expert mode races for PB/sub 51:30. Hello!","broadcaster_language":"en","display_name":"HarpoonCannon","game":"Snowboard Kids 2","delay":null,"language":"en","_id":39329400,"name":"harpooncannon","created_at":"2013-01-14T04:10:16Z","updated_at":"2015-10-30T01:15:41Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/harpooncannon-profile_image-d83a8fb2faef513c-300x300.png","banner":null,"video_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/harpooncannon-channel_offline_image-6b7f8c3bc454130e-1920x1080.png","background":null,"profile_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/harpooncannon-profile_banner-3b6552ecf6fa1292-480.png","profile_banner_background_color":null,"partner":false,"url":"http://www.twitch.tv/harpooncannon","views":27734,"followers":1572,"_links":{"self":"https://api.twitch.tv/kraken/channels/harpooncannon","follows":"https://api.twitch.tv/kraken/channels/harpooncannon/follows","commercial":"https://api.twitch.tv/kraken/channels/harpooncannon/commercial","stream_key":"https://api.twitch.tv/kraken/channels/harpooncannon/stream_key","chat":"https://api.twitch.tv/kraken/chat/harpooncannon","features":"https://api.twitch.tv/kraken/channels/harpooncannon/features","subscriptions":"https://api.twitch.tv/kraken/channels/harpooncannon/subscriptions","editors":"https://api.twitch.tv/kraken/channels/harpooncannon/editors","teams":"https://api.twitch.tv/kraken/channels/harpooncannon/teams","videos":"https://api.twitch.tv/kraken/channels/harpooncannon/videos"}}},{"_id":17374833472,"game":"League of Legends","viewers":11,"video_height":720,"average_fps":29.9972565158,"delay":0,"created_at":"2015-10-29T22:33:42Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_adorkableex3-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_adorkableex3-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_adorkableex3-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_adorkableex3-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/adorkableex3"},"channel":{"mature":false,"status":"hello world :) ","broadcaster_language":"en","display_name":"adorkableex3","game":"League of Legends","delay":null,"language":"en","_id":26842289,"name":"adorkableex3","created_at":"2011-12-17T15:29:27Z","updated_at":"2015-10-30T01:15:36Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/adorkableex3-profile_image-f0ebe8e0abf0eaca-300x300.png","banner":null,"video_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/adorkableex3-channel_offline_image-29d6a8ba40a49b2c-1920x1080.png","background":null,"profile_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/adorkableex3-profile_banner-c632b12faf4f8f31-480.png","profile_banner_background_color":"#f8fafd","partner":false,"url":"http://www.twitch.tv/adorkableex3","views":248,"followers":61,"_links":{"self":"https://api.twitch.tv/kraken/channels/adorkableex3","follows":"https://api.twitch.tv/kraken/channels/adorkableex3/follows","commercial":"https://api.twitch.tv/kraken/channels/adorkableex3/commercial","stream_key":"https://api.twitch.tv/kraken/channels/adorkableex3/stream_key","chat":"https://api.twitch.tv/kraken/chat/adorkableex3","features":"https://api.twitch.tv/kraken/channels/adorkableex3/features","subscriptions":"https://api.twitch.tv/kraken/channels/adorkableex3/subscriptions","editors":"https://api.twitch.tv/kraken/channels/adorkableex3/editors","teams":"https://api.twitch.tv/kraken/channels/adorkableex3/teams","videos":"https://api.twitch.tv/kraken/channels/adorkableex3/videos"}}},{"_id":17376942896,"game":"The Room","viewers":3,"video_height":720,"average_fps":44.9076305221,"delay":0,"created_at":"2015-10-30T00:51:43Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_leosezhi-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_leosezhi-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_leosezhi-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_leosezhi-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/leosezhi"},"channel":{"mature":true,"status":"Hello Hello Hi","broadcaster_language":"en","display_name":"Leosezhi","game":"The Room","delay":null,"language":"en","_id":15131561,"name":"leosezhi","created_at":"2010-08-29T21:53:03Z","updated_at":"2015-10-30T01:38:49Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/leosezhi-profile_image-ae5fefc9640afd2d-300x300.jpeg","banner":null,"video_banner":null,"background":null,"profile_banner":null,"profile_banner_background_color":null,"partner":false,"url":"http://www.twitch.tv/leosezhi","views":3380,"followers":402,"_links":{"self":"https://api.twitch.tv/kraken/channels/leosezhi","follows":"https://api.twitch.tv/kraken/channels/leosezhi/follows","commercial":"https://api.twitch.tv/kraken/channels/leosezhi/commercial","stream_key":"https://api.twitch.tv/kraken/channels/leosezhi/stream_key","chat":"https://api.twitch.tv/kraken/chat/leosezhi","features":"https://api.twitch.tv/kraken/channels/leosezhi/features","subscriptions":"https://api.twitch.tv/kraken/channels/leosezhi/subscriptions","editors":"https://api.twitch.tv/kraken/channels/leosezhi/editors","teams":"https://api.twitch.tv/kraken/channels/leosezhi/teams","videos":"https://api.twitch.tv/kraken/channels/leosezhi/videos"}}},{"_id":17377783184,"game":"Minecraft","viewers":2,"video_height":0,"average_fps":28.9645892351,"delay":0,"created_at":"2015-10-30T01:48:49Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_finish_909-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_finish_909-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_finish_909-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_finish_909-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/finish_909"},"channel":{"mature":false,"status":"Hello LOVELY viewer! Come and chill ","broadcaster_language":"en","display_name":"Finish_909","game":"Minecraft","delay":null,"language":"en","_id":88405543,"name":"finish_909","created_at":"2015-04-12T23:59:15Z","updated_at":"2015-10-30T01:49:25Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/finish_909-profile_image-3b7f6fb748330e44-300x300.png","banner":null,"video_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/finish_909-channel_offline_image-3b3824b2a692e04d-1920x1080.jpeg","background":null,"profile_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/finish_909-profile_banner-737a9c1875698806-480.jpeg","profile_banner_background_color":"#27f0a9","partner":false,"url":"http://www.twitch.tv/finish_909","views":98,"followers":135,"_links":{"self":"https://api.twitch.tv/kraken/channels/finish_909","follows":"https://api.twitch.tv/kraken/channels/finish_909/follows","commercial":"https://api.twitch.tv/kraken/channels/finish_909/commercial","stream_key":"https://api.twitch.tv/kraken/channels/finish_909/stream_key","chat":"https://api.twitch.tv/kraken/chat/finish_909","features":"https://api.twitch.tv/kraken/channels/finish_909/features","subscriptions":"https://api.twitch.tv/kraken/channels/finish_909/subscriptions","editors":"https://api.twitch.tv/kraken/channels/finish_909/editors","teams":"https://api.twitch.tv/kraken/channels/finish_909/teams","videos":"https://api.twitch.tv/kraken/channels/finish_909/videos"}}},{"_id":17377923152,"game":"Smite","viewers":1,"video_height":720,"average_fps":29.0407124682,"delay":0,"created_at":"2015-10-30T01:59:16Z","is_playlist":false,"preview":{"small":"http://static-cdn.jtvnw.net/previews-ttv/live_user_alibabexo-80x45.jpg","medium":"http://static-cdn.jtvnw.net/previews-ttv/live_user_alibabexo-320x180.jpg","large":"http://static-cdn.jtvnw.net/previews-ttv/live_user_alibabexo-640x360.jpg","template":"http://static-cdn.jtvnw.net/previews-ttv/live_user_alibabexo-{width}x{height}.jpg"},"_links":{"self":"https://api.twitch.tv/kraken/streams/alibabexo"},"channel":{"mature":true,"status":"Hello","broadcaster_language":"en","display_name":"AlibabeXo","game":"Smite","delay":null,"language":"en","_id":91159300,"name":"alibabexo","created_at":"2015-05-16T03:42:30Z","updated_at":"2015-10-30T01:58:46Z","logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/alibabexo-profile_image-753e7a8017aab049-300x300.jpeg","banner":null,"video_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/alibabexo-channel_offline_image-8237ea138ba61f0f-1920x1080.png","background":null,"profile_banner":"http://static-cdn.jtvnw.net/jtv_user_pictures/alibabexo-profile_banner-d0229fc84f76738d-480.png","profile_banner_background_color":"#c14d00","partner":false,"url":"http://www.twitch.tv/alibabexo","views":217,"followers":108,"_links":{"self":"https://api.twitch.tv/kraken/channels/alibabexo","follows":"https://api.twitch.tv/kraken/channels/alibabexo/follows","commercial":"https://api.twitch.tv/kraken/channels/alibabexo/commercial","stream_key":"https://api.twitch.tv/kraken/channels/alibabexo/stream_key","chat":"https://api.twitch.tv/kraken/chat/alibabexo","features":"https://api.twitch.tv/kraken/channels/alibabexo/features","subscriptions":"https://api.twitch.tv/kraken/channels/alibabexo/subscriptions","editors":"https://api.twitch.tv/kraken/channels/alibabexo/editors","teams":"https://api.twitch.tv/kraken/channels/alibabexo/teams","videos":"https://api.twitch.tv/kraken/channels/alibabexo/videos"}}}]}');
	searchResults = data.streams;
	populateResults();*/
}

function searchCallback(data) {
	// turn off loading spinner
	hideById('loading-spinner');
	if (data.status) {
		console.log('Failed! Status: ' + data.status);
	} else {
		searchResults = data.streams;
		populateResults();
	}
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

		var current = resultsToDisplay[i].channel;
		var streamName = current.display_name;
		var gameName = current.game;
		var viewCount = current.views;
		var description = current.status;

		var resultHtml =
				'<img class="image" src="' + imageSrc + '"></img>' +
				'<div class="details">' +
					'<div class="stream-name">' + streamName + '</div>' +
					'<div class="game-and-views">' + gameName + ' - ' + viewCount + ' viewers</div>' +
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
		if(e.keyCode == 13) { // on press enter
			search();
		}
	}
}
