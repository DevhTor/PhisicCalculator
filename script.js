var form = document.getElementById("form");
var R1;
var R2;
var R3;
var Req;
var C1;
var C2;
var C3;
var Ceq;
var CargaCeq;
var V1;
var V2;
var V3;
var VR1;
var VR2;
var VR3;
var I1;
var I2;
var I3;
var PR1;
var PR2;
var PR3;
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
  else if (opcion === "Malla-Izquierda") getMallaIzquierda();
  else if (opcion === "Malla-Izquierda 2R") getMallaIzquierda2R();
  else if (opcion === "Malla-Derecha") getMallaDerecha();  
  else if (opcion === "Malla-Central") getMallaCentral();
  else if (opcion === "Potencia R1") getPotenciaR1();
  else if (opcion === "Potencia R2") getPotenciaR2();
  else if (opcion === "Potencia R3") getPotenciaR3();
}

function getResistenciaSerie() {
  Req.innerHTML = R1 + R2 + R3;
}

function getResistenciaParalelo() {
  if(R1 != 0) R1 = 1 / R1;
  if(R2 != 0) R2 = 1 / R2;
  if(R3 != 0) R3 = 1 / R3;
  let temp = R1 + R2 + R3;
  Req.innerHTML = 1 / temp;
}

function getCapacitanciaParalelo() {
  let c = C1 + C2 + C3;
  Ceq.innerHTML = c;
  CargaCeq.innerHTML = (c * Math.pow(10,-6)) * V1;
}

function getCapacitanciaSerie() {
  if(C1 != 0) C1 = 1 / C1;
  if(C2 != 0) C2 = 1 / C2;
  if(C3 != 0) C3 = 1 / C3;
  let temp = C1 + C2 + C3;
  let c = 1/temp;
  Ceq.innerHTML = c;
  CargaCeq.innerHTML = c * V1;
}

function getMallaIzquierda(){
  let volt = V1 + -V2;
  I1.value = volt / -R1;
}

function getMallaIzquierda2R(){
  let volt = V1 + -V2;
  let ohm = R1 + R2;
  let amp = volt / -ohm;
  I1.value = amp;
  VR1.innerHTML = R1 * amp;
  VR2.innerHTML = R2 * amp;
}

function getMallaDerecha(){
  let volt = V2 + -V3; 
  I2.value = volt / -R2; 

}

function getMallaCentral() {
  let mallaLeft = V1 + -V2;
  mallaLeft /= -R1;

  let mallaRight = V2 + -V3;
  mallaRight /= -R2;

  I3.value = mallaRight - mallaLeft;
}

function getPotenciaR1(){
  
  PR1.innerHTML = (parseFloat(I1.value) * parseFloat(I1.value)) * R1;
}

function getPotenciaR2(){
  PR2.innerHTML = (parseFloat(I2.value) * parseFloat(I2.value)) * R2;
}

function getPotenciaR3(){
  PR3.innerHTML = (parseFloat(I3.value) * parseFloat(I3.value)) * R3;
}


function parsear() {
  //R
  R1 = parseFloat(R1.value);
  R2 = parseFloat(R2.value);
  R3 = parseFloat(R3.value);
  //C
  C1 = parseFloat(C1.value);
  C2 = parseFloat(C2.value);
  C3 = parseFloat(C3.value);
  //VR
  V1 = parseFloat(V1.value);
  V2 = parseFloat(V2.value);
  V3 = parseFloat(V3.value);

}

function leer() {
  //R
  R1 = document.getElementById("R1");
  R2 = document.getElementById("R2");
  R3 = document.getElementById("R3");
  Req = document.getElementById("Req-label");
  //C
  C1 = document.getElementById("C1");
  C2 = document.getElementById("C2");
  C3 = document.getElementById("C3");
  Ceq = document.getElementById("Ceq-label");
  CargaCeq = document.getElementById("CargaCeq-label");
  //V
  V1 = document.getElementById("V1");
  V2 = document.getElementById("V2");
  V3 = document.getElementById("V3");
  //VR
  VR1 = document.getElementById("VR1-label");
  VR2 = document.getElementById("VR2-label");
  VR3 = document.getElementById("VR3-label");
  //I
  I1 = document.getElementById("I1");
  I2 = document.getElementById("I2");
  I3 = document.getElementById("I3");
  //P
  PR1 = document.getElementById("PR1-label");
  PR2 = document.getElementById("PR2-label")
  PR3 = document.getElementById("PR3-label")
  
  
}
