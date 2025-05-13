const dataInicio = new Date("2023-03-25T22:00:00"); // altere a data e hora aqui
const contador = document.getElementById("contador");

function atualizarContador() {
  const agora = new Date();
  let diff = agora - dataInicio;

  const segundos = Math.floor(diff / 1000) % 60;
  const minutos = Math.floor(diff / (1000 * 60)) % 60;
  const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;

  let diasTotais = Math.floor(diff / (1000 * 60 * 60 * 24));
  let anos = Math.floor(diasTotais / 365);
  diasTotais %= 365;
  let meses = Math.floor(diasTotais / 30);
  let dias = diasTotais % 30;

  contador.innerHTML = `${anos} anos, ${meses} meses, ${dias} dias, ${horas} horas, ${minutos} minutos, ${segundos} segundos juntos 💞`;
}

setInterval(atualizarContador, 1000);
atualizarContador();

function tocarMusica() {
  const audio = document.getElementById("audio");
  audio.play();
}
