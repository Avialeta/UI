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
