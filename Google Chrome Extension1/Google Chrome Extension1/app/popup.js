function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {

    gapi.client.setApiKey('AIzaSyCxZBGJHV6dTszSVQ2c6lKDUmlx5EfmOws');

    search();
}

function search() {

    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: "shut up and dance", //Vad den s�ker p� , h�rdkodat atm
    });

    request.execute(onSearchResponse);
}


function onSearchResponse(response) {
    showResponse(response);
}