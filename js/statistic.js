document.addEventListener('DOMContentLoaded', function () {
    var ws = new WebSocket('ws://' + window.location.hostname + '/api/statistic');

    /*webSocket.onopen = function(event) {
        alert('onopen');
        webSocket.send("Hello Web Socket!");
    };

    webSocket.onmessage = function(event) {
        alert('onmessage, ' + event.data);
    };

    webSocket.onclose = function(event) {
        alert('onclose');
    };*/
});