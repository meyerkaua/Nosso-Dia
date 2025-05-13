// Data do início do relacionamento
const dataInicio = new Date("2023-02-14T00:00:00"); // Exemplo: 14 de fevereiro de 2023

function atualizarContador() {
  const agora = new Date();
  const diferenca = agora - dataInicio;

  const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
  const segundos = Math.floor((diferenca / 1000) % 60);

  document.getElementById("contador").innerHTML =
    `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos.`;
}

setInterval(atualizarContador, 1000);
atualizarContador();
