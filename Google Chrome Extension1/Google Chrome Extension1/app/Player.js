var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: publicVideo,//video, //Variabeln från andra scriptet ska in här.
        events: {
            'onReady': onPlayerReady,
            //'onStateChange': onPlayerStateChange
        }
    });

    function onPlayerReady(event) {
        event.target.playVideo();
    }


}

window.addEventListener("load", function () { //Sätter funktion på knappen som finns för att gå tillbaka till söksidan.
    document.getElementById("returnbutton").onclick = function () {
        location.href = "popup.html";
    }
}, false);