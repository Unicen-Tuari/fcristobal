"use strict";

var casoElejido = 0;//ninguno de los 3 casos posibles
var ganador = "0";
var credito = 100;

function limpiarTablero(){
  cambiarfondo(ganador, "");//saca el fondo rojo al ganador anterior
  for (var i = 0; i < 10; i++) {
    cambiarfondo(i, "");
  }
}

function Tirada()
//devuelve un numero del 0 al 9
{
  return Math.floor((Math.random() * 10) );
}

function cambiarfondo(numero, color)
//cambia el color de fondo de un casillero dado el numero que lo identifica y un color
{
  var casillero = document.getElementById(numero);
  casillero.style.backgroundColor = color;
}

function elejirNum(caso) {
  limpiarTablero();
  casoElejido = caso;
  if (caso == 1) {
    cambiarfondo(0, "green");
  }
  else if (caso == 2) {
    for (var i = 1; i < 6; i++) {
      cambiarfondo(i, "green");
    }
  }
  else if (caso == 3) {
    for (var i = 6; i < 10; i++) {
      cambiarfondo(i, "green");
    }
  }
  document.getElementById("estadoApuesta").innerHTML = "¡Listo para tirar!";
}

function tirarRuleta()
{
  if (casoElejido == 0) {alert("ninguna apuesta registrada"); return;}
  if (credito < 5) {alert("WASTED"); return;}
  ganador = Tirada();
  cambiarfondo(ganador, "red");
  if (casoElejido == 1)//caso 1 = aposto al 0
  {
    if (ganador == 0) {
      credito += 10;
    }
    else {
      credito -= 5;
    }
  }
  else if (casoElejido == 2) {//segundo caso aposto entre el 1 y e 5
    if (ganador > 0 && ganador <6) {
      credito += 5;
    }
    else {
      credito -= 5;
    }
  }
  else {//ultimo caso posible
    if (ganador > 5) {
      credito += 3;
    }
    else {
      credito -= 5;
    }
  }
  document.getElementById("estadoApuesta").innerHTML = ("Numero ganador: "+ ganador + " apueste de nuevo!")
  document.getElementById("credito").innerHTML = ("credito: $"+credito);
  casoElejido = 0;
}
