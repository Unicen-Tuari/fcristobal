"use strict";

var valorApuestas = {
  valor: 1,
  paridad: 2,
  color: 2,
  mitad: 2,
  semipleno: 3,
  pleno: 5
}

var apuestas = [];
var doble = false;

/*------------------------------CARGA DE TABLERO----------------------------*/
function jugador(){
/*funcion creadora de jugadores*/
  return{
    credito: 100,
    getCredit: function(){
      return this.credito;
    },
    aumentarCredito: function(monto){
      this.credito = this.credito + monto;
    },
    disminuirCredito: function(monto){
      this.credito = this.credito - monto;
    }
  }
}

function numero(valor, total){
  var mitad = total/2;
  return {
    numero: valor,
    paridad:function () {
      if (this.numero === 0) {
        return null;
      }
      if (this.numero % 2 === 0) {

        return 'par';
      }
      else {
        return 'impar';
      }
    },
    mitad: function(){
      if (this.numero > total/2) {
        return 'Segunda mitad';
      }
      else {
        return 'Primera mitad';
      }
    },
    color: function () {
      if (this.numero === 0) {
        return null;
      }
      if (this.numero < mitad) {
        if (this.numero % 2 === 0 ) {
          return "negro";
        }
        else {
          return "rojo";
        }
      }
      else {
        if (this.numero % 2 === 0 ) {
          return "rojo";
        }
        else {
          return "negro";
        }
      }
    }
  }
}

function apuesta(type, value) {
  return{
    tipo: type,
    valor: value,
    aumentarValor: function(monto) {
      this.valor = this.valor + monto;
    },
    getType: function () {
      return this.tipo;
    },
    getValor: function(){
      return this.valor;
    }
  }
}

function tablero(cantNum){
  var arrNum = [];
  for (var i = 0; i < cantNum; i++) {
    var num = new numero(i, cantNum);
    arrNum.push(num);
  }
  return{
    numeros: arrNum,
    arregloNum: function () {
      return numeros;
    },
    cantidadNum: function () {
      return this.numeros.length;
    },
    mostrarTablero: function(){
      var clase = "";
      var apuestasAdicionales = crearInput(this.numeros.length);
      var string = '<section class="col-sm-6 col-md-4 col-xs-12"><section class="apuestas col-sm-12">'+apuestasAdicionales+'</section><div class="separador"></div></section>'
      string = string + '<section class="col-md-4 col-sm-6 col-xs-12 tabla"><input type="button" id="cero" class="pop col-xs-12" value="0"></input>';
      for (var i = 1; i < this.numeros.length; i++) {
        if (this.numeros[i].color() === "negro") {
          clase = "numN"
        }
        else {
          clase = "numR";
        }
        string = string + '<input type="button" class="pop col-xs-4 '+clase+'" value="' + i + '"></input>';
      }
      string = string + '<div class="separador"></div></section><section class="tablaDeApuestas col-sm-4 col-xs-12"></section><div class="separador"></div>';
      $("#central").html(string);
      mostrarNumeros();
      var pos = ".tabla input";
      for (var i = 0; i < this.numeros.length; i++) {
        agregarEvento(i, pos);
      }
      var BotonesAdicionales = $(".apuestas input");
      var pos = ".apuestas input";
      for (var i = 0; i < BotonesAdicionales.length - 2; i++) {
        agregarEvento(i, pos);
      }
    }
  }
}

function agregarEvento(actual, pos){
  var tipo;
  $(pos)[actual].onclick = function(){
    if (player.getCredit() === 0) {
      return alert('credito insuficiente');
    }
    player.disminuirCredito(valorApuestas.valor);
    if (pos === ".tabla input" && doble && actual > 0 && actual < 10) {
      var noEncontro = true;
      tipo = actual + "-" + (actual+1);
      for (var i = 0; i < apuestas.length; i++) {
        if (apuestas[i].getType() === tipo) {
          noEncontro = false;
          apuestas[i].aumentarValor(valorApuestas.valor);
          mostrarApuestas();
        }
      }
      if (noEncontro){
        apuestas.push(new apuesta(tipo, valorApuestas.valor));
        mostrarApuestas();
      }
      return;
    }
    if (pos === ".apuestas input") {
      if (actual === 0) {
        tipo = "negro";
      }
      else if (actual === 1) {
        tipo = "rojo";
      }
      else if (actual === 2) {
        tipo = "par";
      }
      else if (actual === 3) {
        tipo = "impar";
      }
      else if (actual === 4) {
        tipo = "Primera mitad";
      }
      else if (actual === 5){
        tipo = "Segunda mitad";
      }
    }
    else {
      tipo = actual;
    }
    for (var i = 0; i < apuestas.length; i++) {
      if (apuestas[i].getType() == tipo) {
        apuestas[i].aumentarValor(valorApuestas.valor);
        mostrarApuestas();
        return;
      }
    }
    apuestas.push(new apuesta(tipo, valorApuestas.valor));
    mostrarApuestas();
  };
}

function mostrarApuestas(){
  var string = "";
  for (var i = 0; i < apuestas.length; i++) {
    string = string + '<span>'+apuestas[i].getType()+': $'+apuestas[i].getValor()+'</span>';
  }
  string = string + '<span class="pop" id="ganador"></span>';
  $(".tablaDeApuestas").html(string);
  string = 'Credito = $'+player.getCredit();
  $("#credito").html(string);
}

function mostrarNumeros() {
  var botones = $("#central input");
  for (var i = 0; i < botones.length; i++) {
    mostrarUno(botones, i);
  }
}

function mostrarUno(arrInput, i) {
  var timer = i*75;
  setTimeout(function(){arrInput[i].style.display = "block";}, timer);
}

function crearInput(cantNum){
  var mitad = Math.floor(cantNum/2);
  var string = '<input type="button" class="pop numN col-xs-12 col-sm-6" value="negros"></input>';
  string = string + '<input type="button" class="pop numR col-xs-12 col-sm-6" value="rojos"></input>';
  string = string + '<input type="button" class="pop adicionales col-xs-12 col-sm-6" value="pares"></input>';
  string = string + '<input type="button" class="pop adicionales col-xs-12 col-sm-6" value="impares"></input>';
  string = string + '<input type="button" class="pop adicionales col-xs-12 col-sm-6" value="'+"1-"+mitad+'"></input>';
  mitad++;
  string = string + '<input type="button" class="pop adicionales col-xs-12 col-sm-6" value="'+mitad+'-'+cantNum+'"></input>';
  string = string + '<input id="dobles" type="button" class="pop adicionales col-xs-12" value="dobles"></input>'
  string = string + '<input id="tirar" type="button" class="pop adicionales col-xs-12" value="TIRAR!"></input><div class="separador"></div>';
  return string;
}



/*------------------------TERMINA CARGA DE TABLERO----------------------------------------------------*/

var player = new jugador();

$("#generaTablero").submit(function(){
  var nums = $('#cantidad').val();
  var tableroR = new tablero(nums);
  tableroR.mostrarTablero();
  /*$(".apuestas .numN").hover(
  function(){$(".numN").css("text-shadow", "0px 0px 10px white")},
  function(){$(".numN").css("text-shadow", "0px 0px 0px white")}
);*/
$("#dobles").click(function(){
  if (doble) {
    doble = false;
    $(this).css("background-color", "transparent");
  }
  else {
    doble = true;
    $(this).css("background-color", "green");
  }
})
$("#tirar").click(function(){
  var totalnum = tableroR.cantidadNum();
  var ganador = tirarRuleta(totalnum);
  var caract = tableroR.numeros[ganador];
  var string = 'ganador: '+ ganador;
  var gananciaTotal = 0;
  for (var i = 0; i < apuestas.length; i++) {
    if (apuestas[i].getType() === caract.color()) {
      gananciaTotal = gananciaTotal + (apuestas[i].getValor() * valorApuestas.color);
    }
    else if (apuestas[i].getType() === ganador) {
      gananciaTotal = gananciaTotal + (apuestas[i].getValor() * valorApuestas.pleno);
    }
    else if (apuestas[i].getType() === caract.paridad()) {
      gananciaTotal = gananciaTotal + (apuestas[i].getValor() * valorApuestas.paridad);
    }
    else if (apuestas[i].getType() === caract.mitad()) {
      gananciaTotal = gananciaTotal + (apuestas[i].getValor() * valorApuestas.mitad);
    }
    else {
      var posibleApuesta1 = ganador + "-" + (ganador+1);
      var posibleApuesta2 = (ganador-1) + "-" + ganador;
      if (posibleApuesta1 === apuestas[i].getType() || apuestas[i].getType() === posibleApuesta2) {
        gananciaTotal = gananciaTotal + (apuestas[i].getValor() * valorApuestas.semipleno);
      }
    }
  }
  player.aumentarCredito(gananciaTotal);
  mostrarApuestas();
  var diferencia = ' (+$'+ gananciaTotal+')';
  $("#diferencia").html(diferencia);
  $("#ganador").html(string);
  apuestas = [];
})
});

function tirarRuleta(totalnum){
  return Math.floor((Math.random() * totalnum));
}
