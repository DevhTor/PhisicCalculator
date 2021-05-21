var form = document.getElementById("form");
var valor1;
var valor2;
var valor3;
var voltaje1;
var voltaje2;
var voltaje3;
var resultado;
var operacion = document.getElementById("operacion");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  leer();
  parsear();
  ElegirOperacion();
});

function ElegirOperacion() {
  let opcion = operacion.options[operacion.selectedIndex].text;
  if (opcion === "Resistencia-Serie") getResistenciaSerie();
  else if (opcion === "Resistencia-Paralelo") getResistenciaParalelo();
  else if (opcion === "Capacitancia-Serie") getCapacitanciaSerie();
  else if (opcion === "Capacitancia-Paralelo") getCapacitanciaParalelo();
  else if (opcion === "Malla-Lateral") getMallaLateral();
  else if (opcion === "Malla-Central") getMallaCentral();
}

function getResistenciaSerie() {
  resultado.innerHTML = valor1 + valor2 + valor3;
}

function getResistenciaParalelo() {
  valor1 = 1 / valor1;
  valor2 = 1 / valor2;
  valor3 = 1 / valor3;
  let temp = valor1 + valor2 + valor3;
  resultado.innerHTML = 1 / temp;
}

function getCapacitanciaParalelo() {
  resultado.innerHTML = valor1 + valor2 + valor3;
}

function getCapacitanciaSerie() {
  valor1 = 1 / valor1;
  valor2 = 1 / valor2;
  valor3 = 1 / valor3;
  let temp = valor1 + valor2 + valor3;
  resultado.innerHTML = 1 / temp;
}

function getMallaLateral() {
  let volt = voltaje1 + voltaje2;
  resultado.innerHTML = volt / valor1;
}

function getMallaCentral() {
  let mallaLeft = voltaje1 + voltaje2;
  mallaLeft /= valor1;

  let mallaRight = voltaje2 + voltaje3;
  mallaRight /= valor2;

  resultado.innerHTML = mallaLeft - mallaRight;
}

function parsear() {
  valor1 = parseFloat(valor1.value);
  valor2 = parseFloat(valor2.value);
  valor3 = parseFloat(valor3.value);
  voltaje1 = parseFloat(voltaje1.value);
  voltaje2 = parseFloat(voltaje2.value);
  voltaje3 = parseFloat(voltaje3.value);
}

function leer() {
  valor1 = document.getElementById("valor1");
  valor2 = document.getElementById("valor2");
  valor3 = document.getElementById("valor3");
  voltaje1 = document.getElementById("voltaje1");
  voltaje2 = document.getElementById("voltaje2");
  voltaje3 = document.getElementById("voltaje3");
  resultado = document.getElementById("resultado-label");
}
