let startTime;
let elapsed = 0;
let timer;
let running = false;
let lapCount = 0;
let lastLap = 0;

const display  = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const lapBtn   = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsEl   = document.getElementById('laps');

// Format milliseconds into MM:SS.cs
function format(ms) {
  const m  = Math.floor(ms / 60000);
  const s  = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return (
    String(m).padStart(2, '0') + ':' +
    String(s).padStart(2, '0') +
    '<span>.' + String(cs).padStart(2, '0') + '</span>'
  );
}

// Update the display every ~30ms
function update() {
  elapsed = Date.now() - startTime;
  display.innerHTML = format(elapsed);
}

// Start / Pause / Resume
startBtn.addEventListener('click', function () {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(update, 30);
    running = true;
    startBtn.textContent = 'Pause';
    startBtn.classList.add('running');
    lapBtn.disabled = false;
  } else {
    clearInterval(timer);
    running = false;
    startBtn.textContent = 'Resume';
    startBtn.classList.remove('running');
    lapBtn.disabled = true;
  }
});

// Record a lap
lapBtn.addEventListener('click', function () {
  lapCount++;
  const lapTime = elapsed - lastLap;
  lastLap = elapsed;

  const div = document.createElement('div');
  div.className = 'lap-item';

  const numSpan  = document.createElement('span');
  numSpan.className = 'lap-num';
  numSpan.textContent = 'LAP ' + String(lapCount).padStart(2, '0');

  const timeSpan = document.createElement('span');
  timeSpan.className = 'lap-time';

  // Plain text version of format (no HTML tags)
  const m  = Math.floor(lapTime / 60000);
  const s  = Math.floor((lapTime % 60000) / 1000);
  const cs = Math.floor((lapTime % 1000) / 10);
  timeSpan.textContent =
    String(m).padStart(2, '0') + ':' +
    String(s).padStart(2, '0') + '.' +
    String(cs).padStart(2, '0');

  div.appendChild(numSpan);
  div.appendChild(timeSpan);
  lapsEl.prepend(div);
});

// Reset everything
resetBtn.addEventListener('click', function () {
  clearInterval(timer);
  running  = false;
  elapsed  = 0;
  lapCount = 0;
  lastLap  = 0;

  display.innerHTML = '00:00<span>.00</span>';
  startBtn.textContent = 'Start';
  startBtn.classList.remove('running');
  lapBtn.disabled = true;
  lapsEl.innerHTML = '';
});
