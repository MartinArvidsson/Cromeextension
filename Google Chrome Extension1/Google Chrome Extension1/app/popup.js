function showResponse(response) { //Skriver ut svaret p� vad som har h�mtats fr�n data-Api:et
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

function onClientLoad() { //N�r plug:inet laddas k�rs detta och "onYoutubeApiLoad k�rs"
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() { //S�tter api nyckeln

    gapi.client.setApiKey('AIzaSyCxZBGJHV6dTszSVQ2c6lKDUmlx5EfmOws');
}

window.addEventListener("load", function () { //S�tter funktion p� knappen som finns s� att man kan kan anv�nda den till att s�ka p� saker.
    document.getElementById("searchbutton")
            .addEventListener("click", addSearch, false);
}, false);

var searchinformation = ""; //Variabeln som anv�nds f�r att s�ka skapas
String (searchinformation); //S�tts till str�ng

function addSearch() { //H�mtar s�krutan, tar informationen och skickar iv�g den som str�ng, rensar ocks� listan fr�n tidigare s�k

    searchinformation = document.getElementById('searchbar').value;

    document.getElementById('response').innerHTML = "";

    search();
}

function search() { //S�ker i data-api:et efter relevanta resultat och skriver sedan ut dom via "onSearchResponse"

    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: searchinformation,
    });

    request.execute(onSearchResponse);
}


function onSearchResponse(response) { //Startar showResponse!"
    showResponse(response);
}