document.addEventListener('DOMContentLoaded', function () {
    var delay = 5;

    var api = '/api';
    var xhrFoo = new XMLHttpRequest();
    xhrFoo.addEventListener('load', function() {
        console.log(event.target.status);
        console.log(event.target.responseText);
    });
    xhrFoo.open('GET', api + '/foo/?delay=' + delay, true);
    xhrFoo.send();
});
