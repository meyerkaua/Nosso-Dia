// Música
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const audio = document.getElementById('audio');
const albumCover = document.querySelector('.album-cover');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

let rotation = 0;
let animationFrameId;
let lastTime = null;
let isPlaying = false;

function rotateCover(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  rotation += delta * 0.03;
  albumCover.style.transform = `rotate(${rotation}deg)`;

  animationFrameId = requestAnimationFrame(rotateCover);
}

audio.addEventListener('play', () => {
  lastTime = null;
  animationFrameId = requestAnimationFrame(rotateCover);
  isPlaying = true;
  playPauseBtn.textContent = '❚❚';
});

audio.addEventListener('pause', () => {
  cancelAnimationFrame(animationFrameId);
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

playPauseBtn.addEventListener('click', () => {
  isPlaying ? audio.pause() : audio.play();
});

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

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

// Carrossel
const carouselTrack = document.getElementById('carousel');
const originalImages = carouselTrack.querySelectorAll('img');
const totalSlides = originalImages.length;

// Clonar o primeiro e o último slide
const firstClone = originalImages[0].cloneNode(true);
const lastClone = originalImages[totalSlides - 1].cloneNode(true);

carouselTrack.appendChild(firstClone);
carouselTrack.insertBefore(lastClone, carouselTrack.firstChild);

let index = 1;
let autoSlideInterval;
const slideDuration = 3000;

const updateSlidePosition = () => {
  carouselTrack.style.transition = 'transform 0.5s ease';
  carouselTrack.style.transform = `translateX(-${index * 100}%)`;
};

function showSlide(i) {
  index = i;
  updateSlidePosition();
}

function nextSlide() {
  index++;
  updateSlidePosition();
  resetAutoSlide();
}

function prevSlide() {
  index--;
  updateSlidePosition();
  resetAutoSlide();
}

// Corrigir posição após transição falsa
carouselTrack.addEventListener('transitionend', () => {
  if (index === 0) {
    carouselTrack.style.transition = 'none';
    index = totalSlides;
    carouselTrack.style.transform = `translateX(-${index * 100}%)`;
  }
  if (index === totalSlides + 1) {
    carouselTrack.style.transition = 'none';
    index = 1;
    carouselTrack.style.transform = `translateX(-${index * 100}%)`;
  }
});

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, slideDuration);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);

// Iniciar carrossel
showSlide(index);
startAutoSlide();

// Timer
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

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  timer.textContent = `${months} meses, ${days} dias\n${hours} horas, ${minutes} minutos e ${seconds} segundos\n ❤️`;
}

setInterval(updateTimer, 1000);
updateTimer();

// Corações
const heartContainer = document.createElement('div');
heartContainer.classList.add('heart-container');
document.body.appendChild(heartContainer);

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.textContent = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (16 + Math.random() * 24) + 'px';
  const duration = 4 + Math.random() * 3;
  heart.style.animationDuration = `${duration}s`;
  heartContainer.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

// Esta função agora só é chamada depois do clique
function startFallingHearts() {
  const interval = setInterval(createHeart, 200);
  setTimeout(() => {
    clearInterval(interval);
  }, 5000); // 5 segundos de corações
}

// Botão "Clique em mim"
document.getElementById('start-button').addEventListener('click', () => {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('main-content').style.display = 'block';
  startFallingHearts();
});

const abrirCarta = document.getElementById('abrirCarta');
const cartaAberta = document.getElementById('cartaAberta');
const textoDigitado = document.getElementById('textoDigitado');

const mensagem = `Oi meu amor ❤️

 Eu não sou muito bom com textinhos mas vamos lá. Então primeiramente, eu queria ressaltar o quanto eu te amo, e o quanto eu me importo com você, tanto que tentei fazer essa surpresinha para você, eu sei que não é muito, mas foi de coração! Eu realmente não tenho palavras para descrever tudo que eu amo em você, e já que você questiona tanto, eu fiz uma listinha das coisas que eu mais amo abaixo. E meu amor, eu sei que nem faz tanto tempo desde que estamos juntos, mas eu sinto que eu te amo para uma vida, e quero estar sempre ao seu lado, não importa o que aconteça! 

Te amo com todas as forças! 💖

Com amor,
Kauã`;

abrirCarta.addEventListener('click', () => {
  abrirCarta.style.display = 'none';
  cartaAberta.style.display = 'block';
  digitarTexto(mensagem, textoDigitado);
});

function digitarTexto(texto, elemento) {
  let i = 0;
  const intervalo = setInterval(() => {
    elemento.textContent += texto.charAt(i);
    i++;
    if (i >= texto.length) clearInterval(intervalo);
  }, 30); // velocidade da digitação
}
