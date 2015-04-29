function showResponse(response) { //Skriver ut svaret på vad som har hämtats från data-Api:et
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString;
}

function onClientLoad() { //När plug:inet laddas körs detta och "onYoutubeApiLoad körs"
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() { //Sätter api nyckeln

    gapi.client.setApiKey('AIzaSyCxZBGJHV6dTszSVQ2c6lKDUmlx5EfmOws');
}

window.addEventListener("load", function () { //Sätter funktion på knappen som finns så att man kan kan använda den till att söka på saker.
    document.getElementById("searchbutton")
            .addEventListener("click", addSearch, false);
}, false);

var searchinformation = ""; //Variabeln som används för att söka skapas
String (searchinformation); //Sätts till sträng

function addSearch() { //Hämtar sökrutan, tar informationen och skickar iväg den som sträng, rensar också listan från tidigare sök

    searchinformation = document.getElementById('searchbar').value;

    document.getElementById('response').innerHTML = "";

    search();
}

function search() { //Söker i data-api:et efter relevanta resultat och skriver sedan ut dom via "onSearchResponse"

    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: searchinformation,
    });

    request.execute(onSearchResponse);
}


function onSearchResponse(response) { //Startar showResponse!"
    showResponse(response);
}