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
    document.getElementById('Renderlinks').innerHTML = "";

    search();
}

function search() { //S�ker i data-api:et efter relevanta resultat och skriver sedan ut dom via "onSearchResponse"

    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: searchinformation,
        maxResults: 10,
        type: 'video',
    });

    request.execute(onSearchResponse);
}


function onSearchResponse(response) { //Startar showResponse!"
    showResponse(response);
}

function showResponse(response) { //Skriver ut svaret p� vad som har h�mtats fr�n data-Api:et
    console.log(response)
    //var responseString = JSON.stringify(response, '', 2);
    //document.getElementById('response').innerHTML += responseString;

    for (var i = 0; i < response.items.length; i++) { //<-- fixar tumnagelbilder , fungerar inte. Bilderna syns inte, visas dock i konsolen.
        var title = document.createElement("h1");
        var atag = document.createElement("a");
        var thumbnail = document.createElement("img");
        atag.className = "Thumbnail";
        atag.href = "#";
        thumbnail.src = response.items[i].snippet.thumbnails.default.url;
        atag.image = thumbnail;
        atag.style.width = 120 + "px";
        atag.style.height = 90 + "px";

        
        atag.onclick = function () {
            var video = response.items[i].id.videoID;
            //Skicka med video variablen till en videospelare, N�sta veckas jobb.
        };
        console.log(atag.image);

        var Title = response.items[i].snippet.title;
        title.innerHTML = Title;
        console.log(Title);

        Renderlinks.appendChild(title);
        
        Renderlinks.appendChild(atag);
        atag.appendChild(thumbnail);
    }
}