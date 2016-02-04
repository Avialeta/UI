document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('form');
    var inputs = form.querySelectorAll('input:not([type="submit"])');
    var curtain = document.querySelector('.curtain');
    var spinner = document.querySelector('.mdl-spinner');

    form.addEventListener('submit', searchFlights, true);

    function searchFlights(event) {
        event.preventDefault();

        if (!validate()) {
        }

        loadingToggle();
        setTimeout(loadingToggle, 3000);

        // TODO: Sent request.
        // loadingToggle();

        //event.preventDefault();
    }

    function validate() {
        var isValid = true;

        for (var i = 0; i < inputs.length; i++) {
        }

        return isValid;
    }

    function loadingToggle() {
        if (!curtain && !spinner) {
            return;
        }

        curtain.classList.toggle('hidden');
        spinner.classList.toggle('is-active');
    }
});

(function() {
    'use strict';
    var snackbarContainer = document.querySelector('#demo-snackbar-example');
    var showSnackbarButton = document.querySelector('#demo-show-snackbar');
    var handler = function(event) {
        showSnackbarButton.style.backgroundColor = '';
    };
    showSnackbarButton.addEventListener('click', function() {
        'use strict';
        showSnackbarButton.style.backgroundColor = '#' +
        Math.floor(Math.random() * 0xFFFFFF).toString(16);
        var data = {
            message: 'Button color changed.',
            timeout: 0,
            actionHandler: handler,
            actionText: 'Undo'
        };
        snackbarContainer.MaterialSnackbar.showSnackbar(data);
    });
}());