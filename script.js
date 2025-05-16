// Música
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');

progressBar.addEventListener('click', (e) => {
  const barWidth = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / barWidth) * duration;
});

let isDragging = false;

progressBar.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const rect = progressBar.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const width = rect.width;
  const duration = audio.duration;

  if (offsetX >= 0 && offsetX <= width) {
    audio.currentTime = (offsetX / width) * duration;
  }
});


// Também atualiza a barra com o tempo
audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
  isPlaying ? audio.pause() : audio.play();
});

audio.addEventListener('play', () => {
  isPlaying = true;
  playPauseBtn.textContent = '❚❚';
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  playPauseBtn.textContent = '▶';
});

audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}


// Carrossel
const carousel = document.getElementById('carousel');
const images = carousel.querySelectorAll('img');
let index = 0;

function showSlide(i) {
  const width = carousel.clientWidth;
  carousel.style.transform = `translateX(-${i * 100}%)`;
}

document.querySelector('.prev').addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  showSlide(index);
});

document.querySelector('.next').addEventListener('click', () => {
  index = (index + 1) % images.length;
  showSlide(index);
});

// Auto-play
setInterval(() => {
  index = (index + 1) % images.length;
  showSlide(index);
}, 5000);

const timer = document.getElementById('timer');
const startDate = new Date('2025-02-23T16:30:00');

function updateTimer() {
  const now = new Date();

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  // Ajustes se algum valor for negativo
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  timer.textContent = `${years} anos, ${months} meses, ${days} dias, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
}

setInterval(updateTimer, 1000);
updateTimer();



