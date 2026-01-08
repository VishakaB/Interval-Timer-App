# Interval-Timer-App

## User requirements

The user requires a real time clock aligned interval timer. The user wants to get reminded of each passing "n" time interval with respect to the current time. The app should provide options for the user to select a specific interval out of 1 min, 5 mins, 0 mins, 15 mins. There should be options for the user to start the clock and end the clock. The app should be accessible to the user remotely from anywhere on earth using the web.

## Development Decisions
- Create a progressive web app, PWA (website that uses modern web features to behave like a native app), using HTML for frontend, Javascript for backend, and deploy it as a webapp using Vercel accessible to anyone

## Steps of building the App
- Step 1: Decide the required project Structure and files

-  interval-timer-app/
    ├─ index.html (frontend)
    ├─ style.css (frontend styling)
    ├─ app.js (backend app logic)
    ├─ manifest.json (metadata file with app deployment details)
    ├─ sw.js (enable PWA, offline access, caching, fast loading)
    ├─ alarm.mp3 (audito file for ring)

- Step 2: Timer App Logic

The timer app takes the time interval, and current time as the input. When the start button is clicked, it computes the remaining time for that interval and displays it on the app interface. Once the time is reached it runs the audio file, and resets the interval back to the initial time interval. Once the stop button is clicked, it clears the remaining time data from the cache, and resets the time values.






