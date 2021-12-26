var form = document.getElementById("form");
var operacion = document.getElementById("operacion");

var R1, R2, R3, Req_label;
var C1, C2, C3, Ceq_label;
var V1, V2, V3;
var I1, I2, I3;

var QCeq_label;

var VR1_label, VR2_label, VR3_label;
var PR1_label, PR2_label, PR3_label, PRT_label;

var PR1 = 0,
  PR2 = 0,
  PR3 = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  leer();
  ElegirOperacion();
});

function leer() {
  //R
  R1 = LeerInput("R1");
  R2 = LeerInput("R2");
  R3 = LeerInput("R3");
  Req_label = LeerLabel("Req-label");
  //C
  C1 = LeerInput("C1");
  C2 = LeerInput("C2");
  C3 = LeerInput("C3");
  Ceq_label = LeerLabel("Ceq-label");
  QCeq_label = LeerLabel("CargaCeq-label");
  //V
  V1 = LeerInput("C1");
  V2 = LeerInput("C2");
  V3 = LeerInput("C3");
  //VR
  VR1_label = LeerInput("VR1-label");
  VR2_label = LeerInput("VR2-label");
  VR3_label = LeerInput("VR3-label");
  //PR
  PR1_label = LeerLabel("PR1-label");
  PR2_label = LeerLabel("PR2-label");
  PR3_label = LeerLabel("PR3-label");
  PRT_label = LeerLabel("PRT-label");
  //I
  I1 = LeerLabel("I1");
  I2 = LeerLabel("I2");
  I3 = LeerLabel("I3");
}

function LeerInput(clave) {
  return parseFloat(document.getElementById(clave).value);
}

function LeerLabel(clave) {
  return document.getElementById(clave);
}

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
  else if (opcion === "Potencia RT") getPotenciaRT();
}

function getResistenciaSerie() {
  Req_label.innerHTML = R1 + R2 + R3;
}

function getResistenciaParalelo() {
  if (R1 !== 0) R1 = 1 / R1;
  if (R2 !== 0) R2 = 1 / R2;
  if (R3 !== 0) R3 = 1 / R3;
  let temp = R1 + R2 + R3;
  Req_label.innerHTML = 1 / temp;
}

function getCapacitanciaParalelo() {
  let c = C1 + C2 + C3;
  Ceq_label.innerHTML = c;
  let convert = c * Math.pow(10, -6);
  QCeq_label.innerHTML = convert * V1;
}

function getCapacitanciaSerie() {
  if (C1 !== 0) C1 = 1 / C1;
  if (C2 !== 0) C2 = 1 / C2;
  if (C3 !== 0) C3 = 1 / C3;
  let temp = C1 + C2 + C3;
  let c = 1 / temp;
  Ceq_label.innerHTML = c;
  let convert = c * Math.pow(10, -6);
  QCeq_label.innerHTML = convert * V1;
}

function getMallaIzquierda() {
  let volt = V1 + -V2;
  I1.value = volt / -R1;
}

function getMallaIzquierda2R() {
  let volt = V1 + -V2;
  let ohm = R1 + R2;
  let amp = volt / -ohm;
  I1.value = amp;
  VR1_label.innerHTML = R1 * amp;
  VR2_label.innerHTML = R2 * amp;
}

function getMallaDerecha() {
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

function getPotenciaR1() {
  PR1 = Math.pow(parseFloat(I1.value), 2) * R1;
  PR1_label.innerHTML = PR1;
  getPotenciaRT();
}

function getPotenciaR2() {
  PR2 = Math.pow(parseFloat(I2.value), 2) * R2;
  PR2_label.innerHTML = PR2;
  getPotenciaRT();
}

function getPotenciaR3() {
  PR3 = Math.pow(parseFloat(I3.value), 2) * R3;
  PR3_label.innerHTML = PR3;
  getPotenciaRT();
}

function getPotenciaRT() {
  PRT_label.innerHTML = PR1 + PR2 + PR3;
}
