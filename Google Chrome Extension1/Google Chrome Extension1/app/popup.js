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

var publicVideo = null; //För att jag ska nå den i player.js ligger den här, Bättre lösningar?


function showResponse(response) { //Skriver ut svaret på vad som har hämtats från data-Api:et
    var videoResponse = null;
    videoResponse = response;
    for (var i = 0; i < response.items.length; i++) { //<-- fixar tumnagelbilder , fungerar inte. Bilderna syns inte, visas dock i konsolen.
        var title = document.createElement("h1");
        var desc = document.createElement("p");
        var atag = document.createElement("a");
        var area = document.createElement("div");
        var thumbnail = document.createElement("img");
        atag.className = "Thumbnail";
        atag.href = "#";
        thumbnail.src = videoResponse.items[i].snippet.thumbnails.default.url;
        atag.image = thumbnail;
        atag.style.width = 120 + "px";
        atag.style.height = 90 + "px";
        
        //ALTERNATIV LÖSNING: Skapa 1 publicVideo variabel för varje gång "i" loopar. Sätt den sedan till array positionens videoid , anropa sedan  i onclick 
        area.onclick = function () {
            
            console.log(videoResponse.items);
            publicVideo = videoResponse.items["Vad ska vara här ? Matchande plats som atagen har? hur ?"].id.videoId; // [i] måste bytas ut mot något unikt för just den (a) taggen, den läser sista positionen i arrayen just nu (10) dagsläget.
            alert(publicVideo);
            //Skicka med video variablen till en videospelare, Nästa veckas jobb.
        };
        
        console.log(response);
        var _title = response.items[i].snippet.title;
        title.innerHTML = _title;
        
        var _desc = response.items[i].snippet.description;
        desc.innerHTML = _desc;

        Renderlinks.appendChild(area);

        area.appendChild(title);
        area.appendChild(desc);
        area.appendChild(atag);
        atag.appendChild(thumbnail);
        
    }
}