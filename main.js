console.log("hello");

var apiUrl = 'https://api.twitch.tv/kraken/search/streams?q=starcraft';

var xhr = new XMLHttpRequest();
xhr.open('GET', encodeURI(apiUrl));
xhr.onload = function() {
    if (xhr.status === 200) {
        console.log(xhr.responseText);
    }
    else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();