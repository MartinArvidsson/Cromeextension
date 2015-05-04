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
            //Skicka med video variablen till en videospelare, Nästa veckas jobb.
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