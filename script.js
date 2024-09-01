let timer;
let isRunning = false;
let milliseconds = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');
const laps = document.getElementById('laps');
const clearLapsBtn = document.getElementById('clearLapsBtn');

function formatTime(milliseconds) {
    const hrs = String(Math.floor(milliseconds / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((milliseconds % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
    const millis = String(Math.floor((milliseconds % 1000) / 10)).padStart(2, '0');
    return `${hrs}:${mins}:${secs}:${millis}`;
}

function startStopwatch() {
    timer = setInterval(() => {
        milliseconds += 10;
        display.textContent = formatTime(milliseconds);
    }, 10);
}

function stopStopwatch() {
    clearInterval(timer);
}

function addLap() {
    const lapTime = formatTime(milliseconds);
    const lapElement = document.createElement('div');
    lapElement.classList.add('lap');
    lapElement.textContent = `Lap ${laps.children.length + 1}: ${lapTime}`;
    laps.insertBefore(lapElement, laps.firstChild);

    lapsContainer.classList.remove('hidden');
    lapBtn.disabled = false;
    clearLapsBtn.classList.remove('hidden');
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
        startStopBtn.textContent = 'Start';
        lapBtn.disabled = true;
    } else {
        startStopwatch();
        startStopBtn.textContent = 'Pause';
        lapBtn.disabled = false;
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    stopStopwatch();
    milliseconds = 0;
    display.textContent = formatTime(milliseconds);
    startStopBtn.textContent = 'Start';
    isRunning = false;
    lapBtn.disabled = true;
    laps.innerHTML = '';
    lapsContainer.classList.add('hidden');
});

lapBtn.addEventListener('click', addLap);

clearLapsBtn.addEventListener('click', () => {
    laps.innerHTML = '';
    lapsContainer.classList.add('hidden');
});
