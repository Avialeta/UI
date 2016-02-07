document.addEventListener('DOMContentLoaded', function () {
    var ws = new WebSocket('ws://' + window.location.hostname + ':8080/statistic');

    ws.onopen = function(event) {};

    ws.onmessage = function(event) {
        console.log(event.data);
    };

    ws.onclose = function(event) {};
});