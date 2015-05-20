function initialize() {
    console.log("Entered")
    chrome.webRequest.onBeforeSendHeaders.addListener(_onChromeWebRequestBeforeSendHeaders, {
        urls: ["https://www.youtube.com/embed/*"]
    }, ['blocking', 'requestHeaders']);
}
function _onChromeWebRequestBeforeSendHeaders(info) {
    var refererRequestHeader = _getHeader(info.requestHeaders, 'Referer');
    var referer = 'https://www.youtube.com/';

    info.requestHeaders.push({
        name: 'Referer',
        value: referer
    });

    return {requestHeaders: info.requestHeaders};
}
function _getHeader(requestHeaders, headerName) {
    var refererRequestHeader = find(requestHeaders, function (requestHeader) {
        return requestHeader.name === headerName;
    });
    return refererRequestHeader;
}

//Chrome extension's don't provide a 'Referer' value by design. You need to send a 'Referer' when making requests to YouTube in order to be able to watch a lot of their videos.
//    https://github.com/MeoMix/StreamusChromeExtension/blob/Development/src/js/background/view/youTubePlayerView.js#L63

//https://developer.chrome.com/extensions/webRequest
//    I'd read up on some of the documentation here. You have to put a blocking interceptor on sending a request.