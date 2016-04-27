"use strict";

var numElejido = -1;
var ganador;
var credito = 100;

function Tirada()
//devuelve un numero del 0 al 9
{
  return Math.floor((Math.random() * 10) );
}

function cambiarColor(numero, color){//cambia el color de un casillero dado
  document.getElementsByName("num")[numero].style.backgroundColor = color;
}

function limpiarTablero() {//devuelve el tablero al color original
  for (var i = 0; i < 10; i++) {
    cambiarColor(i, "#076324");
  }
}

function elejirNum(numero) {//se activa cuando se presiona un boton
  limpiarTablero();
  numElejido = numero;
  cambiarColor(numero, "green");
  document.getElementById("estadoApuesta").innerHTML = "¡Listo para tirar!";
}

function elejirCaso(numero){
  if (numero == 0){//caso 1 = aposto al 0
    var casoElejido = 1;
  }
  else if (numero > 0 && numero < 6) {//segundo caso aposto entre el 1 y e 5
    var casoElejido = 2;
  }
  else {
    var casoElejido = 3;//ultimo caso posible entre 6 y 9
  }
  return casoElejido;
}

function tirarRuleta()
{
  if (numElejido == -1) {alert("ninguna apuesta registrada"); return;}// el -1 significa que no aposto
  if (credito < 5) {alert("WASTED"); return;}//se quedo sin creditos
  if (numElejido == ganador) {//cambia el color del ganador anterior, si es igual al numero elejido lo vuelve a resaltar
    cambiarColor(ganador, "green");
  }
  else if(ganador !== undefined){
    cambiarColor(ganador, "#076324")
  }
  ganador = Tirada();
  var ganancia;
  var casoElejido = elejirCaso(numElejido);
  if (casoElejido == 1)
  {
    if (ganador == 0) {
      credito += 10;
      ganancia = "+10!";
    }
    else {
      credito -= 5;
      ganancia = "-5";
    }
  }
  else if (casoElejido == 2) {
    if (numElejido == ganador) {
      credito += 5;
      ganancia = "+5";
    }
    else {
      credito -= 5;
      ganancia = "-5";
    }
  }
  else {
    if (ganador == numElejido) {
      credito += 3;
      ganancia = "+3";
    }
    else {
      credito -= 5;
      ganancia = "-5";
    }
  }
  cambiarColor(ganador, "red");
  document.getElementById("estadoApuesta").innerHTML = ("Numero ganador: "+ ganador + " ¡apueste de nuevo!")
  document.getElementById("credito").innerHTML = ("credito: $"+credito + "("+ganancia+")");
}
