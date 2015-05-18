function onClientLoad() { //N�r plug:inet laddas k�rs detta och "onYoutubeApiLoad k�rs"
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    document.getElementById("searchbar").focus();
}
function onYouTubeApiLoad() { //S�tter api nyckeln

    gapi.client.setApiKey('AIzaSyCxZBGJHV6dTszSVQ2c6lKDUmlx5EfmOws');
}


window.addEventListener("load", function () { //S�tter funktion p� knappen som finns s� att man kan kan anv�nda den till att s�ka p� saker.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    document.getElementById("form")
            .addEventListener("submit", addSearch, false);

    document.getElementById("searchbar").addEventListener("keydown",TimedSearch,false)

    document.getElementById("searchbar")
}, false);

var searchinformation = ""; //Variabeln som anv�nds f�r att s�ka skapas
String(searchinformation); //S�tts till str�ng

var timer = null;
function TimedSearch() {
    clearTimeout(timer);
    timer = setTimeout(addSearch,1000)
};

function addSearch() { //H�mtar s�krutan, tar informationen och skickar iv�g den som str�ng, rensar ocks� listan fr�n tidigare s�k

    searchinformation = document.getElementById('searchbar').value;
    document.getElementById('Renderlinks').innerHTML = "";

    search();
}
function search() { //S�ker i data-api:et efter relevanta resultat och skriver sedan ut dom via "onSearchResponse"

    //chrome.runtime.getBackgroundPage(initialize);

    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: searchinformation,
        maxResults: 10,
        format: 5,
        type: 'video',
    });
    request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    showResponse(response);
}

function showResponse(response) { //Skriver ut svaret p� vad som har h�mtats fr�n data-Api:et
    document.getElementById("searchbar").blur();
    for (var i = 0; i < response.items.length; i++) { //<-- fixar Tumnaglar, Titel, beskrivning och bild. Samt s�tter onclick event
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
        area.setAttribute("tabindex", [i]);

        Renderlinks.appendChild(area);
        
        area.appendChild(title);
        area.appendChild(desc);
        area.appendChild(atag);
        atag.appendChild(thumbnail);

        area.onclick = function () { //Onlclickeventet fungerar att n�r du tycker skapas en spelare om ingen existerar, Finns redan en video som spelas tas den bort innan en ny skapas
            
            var currentVideoID = this.getAttribute("video-id");
            
            var tmpplayer = document.getElementById("playertmp");
            if (tmpplayer) {
                tmpplayer.parentElement.setAttribute("style", "height:125px;  background-color:grey;")
                var childs = tmpplayer.parentElement.childNodes;
                for (i = 0; i < childs.length; i++) {
                    childs[0].setAttribute("style", "display: block; color:white;");
                    childs[1].setAttribute("style", "display: block; color:white;");
                    childs[2].setAttribute("style", "display: block;");
                }

                tmpplayer.parentElement.removeChild(tmpplayer);
            }
            tmpplayer = document.createElement("div");
            tmpplayer.id = "playertmp";
            this.appendChild(tmpplayer);
            this.setAttribute("style", "height:410px;  background-color:#1B1B1B;");
            var h1 = this.querySelector("#videoTitle");
            var p = this.querySelector("#videoDescription");
            var a = this.querySelector("#clickablePicture");
            h1.setAttribute("style", "display: none;");
            p.setAttribute("style", "display: none;");
            a.setAttribute("style", "display: none;");

            console.log(this);
            this.focus();
            newPlayer(currentVideoID, tmpplayer);
        };
    }
}
function onYouTubeIframeAPIReady() {
    //Visar att skapar spelar api:et har laddats in och g�r sedan vidare
}

function newPlayer(id, elem) { //F�tt extremt mycket hj�lp med detta, anv�dner googles webrequest api.
    player = new YT.Player(elem, {
        height: '410',
        width: '670',
        videoId: id,
        playerVars: {
            'controls': 1,
            'fs': 1,
        },
        events: {
            'onReady': onPlayerReady,
        }
    });

    function onPlayerReady(event) { //Autostart p� videon      
        event.target.playVideo();
    }
};

