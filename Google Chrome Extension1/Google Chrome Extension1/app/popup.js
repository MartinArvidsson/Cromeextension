function onClientLoad() { //När plug:inet laddas körs detta och "onYoutubeApiLoad körs"
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() { //Sätter api nyckeln

    gapi.client.setApiKey('AIzaSyCxZBGJHV6dTszSVQ2c6lKDUmlx5EfmOws');
}


window.addEventListener("load", function () { //Sätter funktion på knappen som finns så att man kan kan använda den till att söka på saker.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    document.getElementById("form")
            .addEventListener("submit", addSearch, false);
}, false);

var searchinformation = ""; //Variabeln som används för att söka skapas
String (searchinformation); //Sätts till sträng

function addSearch(e) { //Hämtar sökrutan, tar informationen och skickar iväg den som sträng, rensar också listan från tidigare sök
    e.preventDefault();
    searchinformation = document.getElementById('searchbar').value;
    document.getElementById('Renderlinks').innerHTML = "";

    search();
}

function search() { //Söker i data-api:et efter relevanta resultat och skriver sedan ut dom via "onSearchResponse"

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




function showResponse(response) { //Skriver ut svaret på vad som har hämtats från data-Api:et
    //var videoResponse = null;
    //videoResponse = response;
    for (var i = 0; i < response.items.length; i++) { //<-- fixar tumnagelbilder , fungerar inte. Bilderna syns inte, visas dock i konsolen.
        var area = document.createElement("div");
        area.id = "videoArea";
        var title = document.createElement("h1");
        title.id = "videoTitle";
        var desc = document.createElement("p");
        desc.id = "videoDescription";
        var atag = document.createElement("a");
        atag.id = "clickablePicture";
        var thumbnail = document.createElement("img");
        thumbnail.id = "pictureThumbnail";
        var videoplayer = document.createElement("div");
        videoplayer.id = "player"


        atag.className = "Thumbnail";
        atag.href = "#";
        thumbnail.src = response.items[i].snippet.thumbnails.default.url;
        atag.image = thumbnail;
        atag.style.width = 120 + "px";
        atag.style.height = 90 + "px";

        var _title = response.items[i].snippet.title;
        title.innerHTML = _title;

        var _desc = response.items[i].snippet.description;
        desc.innerHTML = _desc;

        var _tempvideoID = response.items[i].id.videoId;
        area.setAttribute("video-id", _tempvideoID);
              
        Renderlinks.appendChild(area);

        area.appendChild(title);
        area.appendChild(desc);
        area.appendChild(atag);
        atag.appendChild(thumbnail);
        area.appendChild(videoplayer);



        area.onclick = function () {
            var currentVideoID = this.getAttribute("video-id");

            

            var player = this.lastChild;

            var tmpplayer = document.getElementById("playertmp");
            if (tmpplayer)
                tmpplayer.parentElement.removeChild(tmpplayer);
            tmpplayer = document.createElement("div");
            tmpplayer.id = "playertmp";
            this.appendChild(tmpplayer);

            newPlayer(currentVideoID, tmpplayer);

            console.log(player); 
        };
    }
}

function onYouTubeIframeAPIReady() {
    console.log("Entered function onyoutubeapiready THIS IS GLOBAL") // DEN HÄR blir anropad inte den andra, måste tydligen ligga globalt . Fml
    
}

function newPlayer(id,elem) {

    player = new YT.Player(elem, {
        height: '390',
        width: '640',
        videoId: id,
        events: {
            'onReady': onPlayerReady,
        }
    });

    function onPlayerReady(event) {
        event.target.playVideo();
    }
}