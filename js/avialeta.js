document.addEventListener('DOMContentLoaded', function () {
    var api = '/api';
    var form = document.querySelector('form');
    var inputs = form.querySelectorAll('input:not([type="submit"])');
    var curtain = document.querySelector('.curtain');
    var spinner = document.querySelector('.mdl-spinner');
    var result = document.querySelector('.result');

    var tplDatalist = document.querySelector('.templates datalist');
    var tplTable = document.querySelector('.templates .mdl-data-table');
    var tplList = document.querySelector('.templates .mdl-list');

    form.addEventListener('submit', searchFlights, false);
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].id == 'pointA' || inputs[i].id == 'pointB') {
            inputs[i].addEventListener('input', searchLocations, false);
        }
    }

    var xhrFlights = new XMLHttpRequest();
    xhrFlights.addEventListener('load', function() {
        var flights = {};

        switch (event.target.status) {
            case 200:
                flights = JSON.parse(event.target.responseText);
                break;

            case 404:
                alert('no data');
                break;

            case 500:
                alert('error');
                break;

            // TODO: Remove dirty hack!
            case 502:
                xhrFlights.open('GET', event.target.responseURL, true);
                xhrFlights.send();
                return;
        }

        outputFlights(flights);

        loadingToggle();
    }, false);


    function searchFlights(event) {
        event.preventDefault();

        if (!validate()) {}

        loadingToggle();

        var values = '';
        for (var i = 0; i < inputs.length; i++) {
            if (i) { values += '&'; }
            values += inputs[i].id + '=' + inputs[i].value;
        }

        // TODO: test values
        //values = 'pointA=Minsk&pointB=Petersburg&outboundDate=2016-02-06&inboundDate=2016-02-12';
        //values = 'pointA=Minsk&pointB=Petersburg&outboundDate=2016-02-09&inboundDate=';

        xhrFlights.open('GET', api + '/flights/?' + values, true);
        xhrFlights.send();
    }

    function searchLocations(event) {
        var target = event.target;

        if (target.type == 'text' && target.value.length <= 2) {
            return;
        }

        var xhrLocations = new XMLHttpRequest();
        xhrLocations.addEventListener('load', function(event) {
            if (event.target.status != 200) {
                return;
            }

            var locations = JSON.parse(event.target.responseText);
            outputLocations(locations, target);
        }, false);

        xhrLocations.open('GET', api + '/locations/?search=' + target.value, true);
        xhrLocations.send();
    }

    function validate() {
        var isValid = true;

        for (var i = 0; i < inputs.length; i++) {
        }

        return isValid;
    }

    function outputFlights(flights) {
        if (!Object.keys(flights).length || !Object.keys(flights.variants).length) {
            return;
        }

        var table = result.querySelector('table.mdl-data-table');
        if (table) {
            result.removeChild(table);
        }

        table = tplTable.cloneNode(true);
        var tbody = table.querySelector('tbody');
        var row = tbody.querySelector('tr');
        for(var i in flights.variants) {
            var variants = flights.variants[i];

            var td = row.querySelectorAll('td');
            var list = tplList.cloneNode(true);
            var departure = list.querySelector('.departure').cloneNode(true);
            var arrival = list.querySelector('.arrival').cloneNode(true);
            list.removeChild(list.querySelector('.departure'));
            list.removeChild(list.querySelector('.arrival'));
            for (var j in variants.segments[0].flights) {
                var flight = variants.segments[0].flights[j];
                var item = '';
                item += flight.departure + " " + flight.departureDate + " " + flight.departureTime;
                item += ' -> '
                item += flight.arrival + " " + flight.arrivalDate + " " + flight.arrivalTime;
                departure.innerHTML = item;
                list.appendChild(departure);
                departure = departure.cloneNode(true);
            }

            td[0].appendChild(list);
            td[1].innerHTML = variants.currency + ' ' + variants.price;

            tbody.appendChild(row);
            row = row.cloneNode(true);
        }

        result.appendChild(table);
    }

    function outputLocations(locations, target) {
        var textfield = target.parentElement;

        var datalist = textfield.querySelector('datalist');
        if (datalist) { textfield.removeChild(datalist); }

        if (!locations.length) { return; }

        datalist = tplDatalist.cloneNode(true);
        datalist.id = target.getAttribute('list');

        var option = datalist.querySelector('option');
        for(var i in locations) {
            option.value = locations[i].Name;
            datalist.appendChild(option);
            option = option.cloneNode(true);
        }

        textfield.appendChild(datalist);
    }

    function loadingToggle() {
        if (!curtain && !spinner) {
            return;
        }

        curtain.classList.toggle('hidden');
        spinner.classList.toggle('is-active');
    }
});
