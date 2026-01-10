const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const intervalSelect = document.getElementById("interval");

const alarm = new Audio("assets/alarm.mp3");

let timeoutId = null;
let intervalMinutes = 5;

startBtn.addEventListener("click", async () => {
  intervalMinutes = Number(intervalSelect.value);

  await unlockAudio();
  await requestNotificationPermission();

  scheduleNextAlarm();
});

stopBtn.addEventListener("click", stopTimer);

function stopTimer() {
  clearTimeout(timeoutId);
  timeoutId = null;
}

function startTimer() {
  intervalMs = Number(intervalSelect.value) * 60 * 1000;
  endTime = Date.now() + intervalMs;

  updateDisplay(intervalMs);

  if (timerId) return;

  timerId = setInterval(tick, 1000);


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
  alarm.play().then(() => alarm.pause());

  if (Notification.permission === "granted") {
    new Notification("⏰ Interval Timer", {
      body: "Time boundary reached",
    });
  }
}

async function unlockAudio() {
  try {
    await alarm.play();
    alarm.pause();
  } catch {}
}

async function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission !== "granted") {
    await Notification.requestPermission();
  }
}


function updateDisplay(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");
  display.textContent = `${m}:${s}`;
}

function updateCountdown(targetMs) {
  function tick() {
    const remaining = targetMs - Date.now();

    if (remaining <= 0) return;

    displayTime(remaining);
    requestAnimationFrame(tick);
  }

  tick();
}

function displayTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");

  display.textContent = `${m}:${s}`;
}


if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

function getNextAlignedTime(intervalMinutes) {
  const now = new Date();

  const intervalMs = intervalMinutes * 60 * 1000;
  const nowMs = now.getTime();

  const nextMs =
    Math.ceil(nowMs / intervalMs) * intervalMs;

  return new Date(nextMs);
}

function displayTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const m = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const s = String(totalSeconds % 60).padStart(2, "0");

  display.textContent = `${m}:${s}`;
}

function scheduleNextAlarm() {
  const now = Date.now();
  const intervalMs = intervalMinutes * 60 * 1000;

  const nextAlarmMs =
    Math.ceil(now / intervalMs) * intervalMs;

  const delay = nextAlarmMs - now;

  updateCountdown(nextAlarmMs);

  timeoutId = setTimeout(() => {
    ring();
    scheduleNextAlarm(); // schedule the next boundary
  }, delay);
}
