function onClientLoad() { //När plug:inet laddas körs detta och "onYoutubeApiLoad körs"
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
    document.getElementById("searchbar").focus();
}
function onYouTubeApiLoad() { //Sätter api nyckeln

    gapi.client.setApiKey('AIzaSyCxZBGJHV6dTszSVQ2c6lKDUmlx5EfmOws');
}


window.addEventListener("load", function () { //Sätter funktion på knappen som finns så att man kan kan använda den till att söka på saker.
    var tag = document.createElement('script');
    chrome.runtime.getBackgroundPage(initialize); //Fixa på onsdag, kastar massor av fel i dagsläget

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    document.getElementById("searchbar").addEventListener("keydown", TimedSearch, false);


}, false);

var searchinformation = ""; //Variabeln som används för att söka skapas
String(searchinformation); //Sätts till sträng

var timer = null;
function TimedSearch() {
    clearTimeout(timer);
    timer = setTimeout(addSearch,500)
};

function addSearch() { //Hämtar sökrutan, tar informationen och skickar iväg den som sträng, rensar också listan från tidigare sök

    searchinformation = document.getElementById('searchbar').value;
    document.getElementById('Renderlinks').innerHTML = "";

    search();
}
function search() { //Söker i data-api:et efter relevanta resultat och skriver sedan ut dom via "onSearchResponse"

    

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
var _scrollpos = null;
function showResponse(response) { //Skriver ut svaret på vad som har hämtats från data-Api:et

    //document.getElementById("searchbar").blur();

    for (var i = 0; i < response.items.length; i++) { //<-- fixar Tumnaglar, Titel, beskrivning och bild. Samt sätter onclick event
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

        Renderlinks.appendChild(area);
        
        area.appendChild(title);
        area.appendChild(desc);
        area.appendChild(atag);
        atag.appendChild(thumbnail);

        area.onclick = function () { //Onlclickeventet fungerar att när du tycker skapas en spelare om ingen existerar, Finns redan en video som spelas tas den bort innan en ny skapas
            _scrollpos = window.scrollY;
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
            var childs = this.childNodes;
            for (i = 0; i < childs.length; i++) {
                childs[0].setAttribute("style", "display: none;");
                childs[1].setAttribute("style", "display: none;");
                childs[2].setAttribute("style", "display: none;");

            }
            


            newPlayer(currentVideoID, tmpplayer);
        };
    }
}
function onYouTubeIframeAPIReady() {
    //Visar att skapar spelar api:et har laddats in och går sedan vidare
}

function newPlayer(id, elem) { //Fått extremt mycket hjälp med detta, anvädner googles webrequest api.
    player = new YT.Player(elem, {
        height: '410',
        width: '670',
        videoId: id,
        playerVars: {
            'controls': 1,
            'fs': 0,
        },
        events: {
            'onReady': onPlayerReady,
        }
    });

    function onPlayerReady(event) { //Autostart på videon      
        window.scrollTo(0, _scrollpos);
        event.target.playVideo();
    }
};

