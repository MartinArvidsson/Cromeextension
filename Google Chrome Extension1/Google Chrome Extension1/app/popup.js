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

var publicVideo = null; //F�r att jag ska n� den i player.js ligger den h�r, B�ttre l�sningar?


function showResponse(response) { //Skriver ut svaret p� vad som har h�mtats fr�n data-Api:et
    var videoResponse = null;
    videoResponse = response;
    for (var i = 0; i < response.items.length; i++) { //<-- fixar tumnagelbilder , fungerar inte. Bilderna syns inte, visas dock i konsolen.
        var area = document.createElement("div");
        area.id = "videoArea";
        var title = document.createElement("h1");
        title.id = "videoTitle";
        var desc = document.createElement("p");
        desc.id = "videoDescription";
        var atag = document.createElement("a");
        atag.id = "clickablePicture";
        var tempvideoID = document.createElement("p");
        tempvideoID.id = "hiddenID";
        var thumbnail = document.createElement("img");
        thumbnail.id = "pictureThumbnail";

        atag.className = "Thumbnail";
        atag.href = "#";
        thumbnail.src = videoResponse.items[i].snippet.thumbnails.default.url;
        atag.image = thumbnail;
        atag.style.width = 120 + "px";
        atag.style.height = 90 + "px";

        var _title = response.items[i].snippet.title;
        title.innerHTML = _title;

        var _desc = response.items[i].snippet.description;
        desc.innerHTML = _desc;

        var _tempvideoID = response.items[i].id.videoId;
        tempvideoID.innerHTML = _tempvideoID;
              
        Renderlinks.appendChild(area);

        area.appendChild(title);
        area.appendChild(desc);
        area.appendChild(atag);
        area.appendChild(tempvideoID);
        atag.appendChild(thumbnail);

        area.onclick = function () {
            var currentVideoID = this.lastChild.innerHTML;
            publicVideo = currentVideoID;
            
            location.href = "Player.html";
        };
    }




}