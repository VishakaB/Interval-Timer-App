const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const intervalSelect = document.getElementById("interval");
const alarm = new Audio("assets/alarm.mp3");

let timerId = null;
let endTime = null;
let intervalMs = 5 * 60 * 1000;

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);


function startTimer() {
  intervalMs = Number(intervalSelect.value) * 60 * 1000;
  endTime = Date.now() + intervalMs;

  updateDisplay(intervalMs);

  if (timerId) return;

  timerId = setInterval(tick, 1000);

  alarm.play().then(() => alarm.pause());
}

function tick() {
  const remaining = endTime - Date.now();

  if (remaining <= 0) {
    ring();
    endTime = Date.now() + intervalMs;
  }

  updateDisplay(remaining);
}

function ring() {
  alarm.currentTime = 0;
  alarm.play();
}

function updateDisplay(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  display.textContent = `${m}:${s}`;
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
