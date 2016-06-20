"use strict";

/*------------------------------CARGA DE TABLERO----------------------------*/

function numero(valor, total){
  return {
    numero: valor,
    color: function () {
      if (this.numero === 0) {
        return null;
      }
      var mitad = total/2;
      if (this.numero < mitad) {
        if (this.numero % 2 === 0 ) {
          return "black";
        }
        else {
          return "red";
        }
      }
      else {
        if (this.numero % 2 === 0 ) {
          return "red";
        }
        else {
          return "black";
        }
      }
    }
  }
};

function tablero(cantNum){
  var arrNum = [];
  for (var i = 0; i < cantNum; i++) {
    var num = new numero(i, cantNum);
    arrNum.push(num);
  }
  return{
    numeros: arrNum,
    mostrarTablero: function(){
      var clase = "";
      var apuestasAdicionales = crearInput(this.numeros.length);
      var string = '<section class="col-md-4 col-sm-12"><section class="apuestas col-md-12">'+apuestasAdicionales+'</section></section>'
      string = string + '<section class="col-md-4 col-sm-12 tabla"><input type="button" id="cero" class="pop col-md-12" value="0"></input>';
      for (var i = 1; i < this.numeros.length; i++) {
        if (this.numeros[i].color() === "black") {
          clase = "numN"
        }
        else {
          clase = "numR";
        }
        string = string + '<input type="button" class="pop col-md-4 '+clase+'" value="' + i + '"></input>';
      }
      string = string + "<footer></footer></section>";
      $("#central").html(string);
      mostrarNumeros();
    }
  };
};

function jugador(){
  var arreglo = [];
  return{
    apuestas: arreglo,
  }
};

function mostrarNumeros() {
  var botones = $("#central input");
  for (var i = 0; i < botones.length; i++) {
    mostrarUno(botones, i);
  }
};

function mostrarUno(arrInput, i) {
  var timer = i*75;
  setTimeout(function(){arrInput[i].style.display = "block";}, timer);
};

$("#generaTablero").submit(function(){
  var nums = document.getElementById('cantidad').value;
  var tableroR = new tablero(nums);
  tableroR.mostrarTablero();
});

function crearInput(cantNum){
  var mitad = Math.floor(cantNum/2);
  var string = '<input type="button" class="pop numN col-md-6" value="negros"></input>';
  string = string + '<input type="button" class="pop numR col-md-6" value="rojos"></input>';
  string = string + '<input type="button" class="pop adicionales col-md-6" value="pares"></input>';
  string = string + '<input type="button" class="pop adicionales col-md-6" value="impares"></input>';
  string = string + '<input type="button" class="pop adicionales col-md-6" value="'+"1-"+mitad+'"></input>';
  mitad++;
  string = string + '<input type="button" class="pop adicionales col-md-6" value="'+mitad+'-'+cantNum+'"></input>';
  return string;
};

/*------------------------TERMINA CARGA DE TABLERO----------------------------------------------------*/
