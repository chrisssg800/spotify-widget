// Local demonstration mode.
// In the real Spotify-connected version, Spotify playback state will control show()/hide().
// This keeps the visual structure inspired by Nutty's open-source Spotify widget,
// but uses local demo data because a Spotify Web API app requires Premium in
// current Spotify Development Mode.

const tracks = [
  { name: "Blinding Lights", artist: "The Weeknd", duration: 212 },
  { name: "I Just Died in Your Arms", artist: "Cutting Crew", duration: 277 },
  { name: "Still Loving You", artist: "Scorpions", duration: 390 },
  { name: "Con te partirò", artist: "Andrea Bocelli", duration: 260 }
];

let trackIndex = 0;
let progress = 42;
let playing = false;

const main = document.getElementById("mainContainer");
const song = document.getElementById("songLabel");
const artist = document.getElementById("artistLabel");
const progressBar = document.getElementById("progressBar");
const progressTime = document.getElementById("progressTime");
const timeRemaining = document.getElementById("timeRemaining");

function formatTime(seconds) {
  seconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function setTrack(index, reset = true) {
  trackIndex = (index + tracks.length) % tracks.length;
  const t = tracks[trackIndex];

  song.classList.add("fade");
  artist.classList.add("fade");

  setTimeout(() => {
    song.textContent = t.name;
    artist.textContent = t.artist;
    song.classList.remove("fade");
    artist.classList.remove("fade");
  }, 180);

  if (reset) progress = 0;
  updateProgress();
  if (playing) show();
}

function updateProgress() {
  const t = tracks[trackIndex];
  const pct = Math.min(100, (progress / t.duration) * 100);
  progressBar.style.width = `${pct}%`;
  progressTime.textContent = formatTime(progress);
  timeRemaining.textContent = `-${formatTime(t.duration - progress)}`;
}

function show() {
  playing = true;
  main.classList.add("visible");
}

function hide() {
  playing = false;
  main.classList.remove("visible");
}

document.getElementById("playBtn").onclick = () => { playing = true; show(); };
document.getElementById("pauseBtn").onclick = () => { playing = false; hide(); };
document.getElementById("nextBtn").onclick = () => setTrack(trackIndex + 1);
document.getElementById("prevBtn").onclick = () => setTrack(trackIndex - 1);

setInterval(() => {
  if (!playing) return;
  progress++;
  if (progress >= tracks[trackIndex].duration) {
    setTrack(trackIndex + 1);
  } else {
    updateProgress();
  }
}, 1000);

updateProgress();
