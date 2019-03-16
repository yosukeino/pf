'use strict'
{
    var timer = document.getElementById('timer');
    var start = document.getElementById('start');
    var stop = document.getElementById('stop');
    var reset = document.getElementById('reset');

    var startTime;
    var elapsedTime = 0;
    var timerId;
    var timeToAdd = 0;
    var isRunning = false;

    function updateTimerText() {
        var m = Math.floor(elapsedTime/60000);
        var s = Math.floor(elapsedTime % 60000 / 1000);
        var ms = elapsedTime % 1000;

        m = ('0'+m).slice(-2);
        s = ('0'+s).slice(-2);
        ms = ('00'+ms).slice(-3);

        timer.textContent = m + ':' + s + '.' + ms;
    }

    function countUp() {
        timerId = setTimeout(function() {
            elapsedTime = Date.now() - startTime + timeToAdd;
            updateTimerText();
            countUp();
        }, 10);
    }

    // start.className = 'btn';
    // stop.className = 'btn inactive';
    // reset.className = 'btn inactive';

    function updateButtonState(startButtonState, stopButtonState, resetButtonState) {
        start.className = startButtonState ? 'btn' : 'btn inactive';
        stop.className = stopButtonState ? 'btn' : 'btn inactive';
        reset.className = resetButtonState ? 'btn' : 'btn inactive';
    }

    updateButtonState(true, false, false);

    start.addEventListener('click', function() {
        updateButtonState(false, true, false);
        if (isRunning) {
            return;
        }
        isRunning = true;
        startTime = Date.now();
        countUp();
    });

    stop.addEventListener('click', function() {
        updateButtonState(true, false, true);
        if (isRunning === false) {
            return;
        }
        isRunning = false;
        clearTimeout(timerId);
        timeToAdd += Date.now() - startTime;
    });

    reset.addEventListener('click', function() {
        updateButtonState(true, false, false);
        elapsedTime = 0;
        timeToAdd = 0;
        updateTimerText();
    })
}