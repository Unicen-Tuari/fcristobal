
"use strict";

function color(valor) {
  if (valor === 0) {
    return null;
  }
  var mitad = valor/2;
  if (valor < mitad) {
    if (valor % 2 === 0 ) {
      return "black";
    }
    else {
      return "red";
    }
  }
  else {
    if (valor % 2 === 0 ) {
      return "red";
    }
    else {
      return "black";
    }
  }
}

function numero(valor){
  return {
    numero: valor,
    color: color(valor)
  }
};
