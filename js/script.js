"use strict";

$( document ).ready(function() {
  getInformationByItem("../html/home.html", "#home");
  $("#home").on("click", function(){
    cargarContenido("../html/home.html", "#home");
  });

  $("#contacto").on("click", function(){
    cargarContenido("../html/contacto.html", "#contacto");
  });

  $("#catalogo").on("click", function(){
    cargarContenido("../html/catalogo.html", "#catalogo");
  });
});

function cargarContenido(html, btn){
  getInformationByItem(html);
  $(".activado").toggleClass("activado");
  $(btn).toggleClass("activado");
}

function getInformationByItem(item){
  $.ajax({
    method: "GET",
    dataType: 'html',
    url: item,
    success: function(resultData){
      //al decir que dataType es JSON, ya resultData es un objeto
      var html = "";
      html += resultData;
      $("#contenedorCentral").html(html);
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}

function inputsCatalogo(){
  var string = "Agregar valores nuevos: <br />"
  string += "CODIGO: ";
  string += '<input type="text" class="btn Valores"></input> ';
  string += "DESCRIPCION: ";
  string += '<input type="text" class="btn Valores"></input> ';
  string += "PRECIO: ";
  string += '<input type="text" class="btn Valores"></input> ';
  string += '<input id="agregar" type="button" class="btn" value="AGREGAR">'
  string += '<div id="guardarAlert"></div>';
  return string;
}

function crearTabla(resultData){
  var html = '<table class="table table-hover"><thead><td>CODIGO</td><td>DESCRIPCION</td><td>PRECIO</td></thead><tbody>';
  var html2 = "";
  for (var i = 0; i < resultData.information.length; i++) {
    html += '<tr>';
    html2 += resultData.information[i]['thing'];
    html += html2+'</tr>';
  }
  html += '</tbody></table>';
  html += inputsCatalogo();
  $("#contenedorCentral").html(html);
  $("#agregar").on("click", function(){
    guardarInformacion();
  });
}


function getInformationByGroup(){
  var grupo = 159;
  $.ajax({
    method: "GET",
    dataType: 'JSON',
    url: "http://web-unicen.herokuapp.com/api/group/" + grupo,
    success:function (resultData){
      crearTabla(resultData);
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
    }
  });
}

function guardarInformacion(){
  var grupo = 159;
  var informacion = "";
  var inputs = $(".Valores");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      alert('debe llenar todos los campos');
      return;
    }
    informacion += '<td>';
    informacion += inputs[i].value;
    informacion += '</td>';
  }
  //la estructura que debemos enviar es especifica de cada servicio que usemos
  //en este caso un hay que enviar un objeto con el numero de grupo y con lo que queramos guardarInformacion
  //thing puede ser un objeto JSON con tanta información como queramos (en este servicio)
  var info = {
    group: grupo,
    thing: informacion //puede ser un objeto JSON!
  };
  $.ajax({
    method: "POST",
    dataType: 'JSON',
    //se debe serializar (stringify) la informacion (el "data:" de ida es de tipo string)
    data: JSON.stringify(info),
    contentType: "application/json; charset=utf-8",
    url: "http://web-unicen.herokuapp.com/api/create",
    success: function(resultData){
      $("#guardarAlert").removeClass("alert-danger")
      $("#guardarAlert").addClass("alert-success")
      //como le dimos dataType:"JSON" el resultData ya es un objeto
      //la estructura que devuelve es especifica de cada servicio que usemos
      $("#guardarAlert").html("Guardado=" + resultData.information._id);
      console.log(resultData);
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
      $("#guardarAlert").addClass("alert-danger");
      $("#guardarAlert").html("Error por favor intente mas tarde");
    }
  });
}


function agregarComportamiento(){
  $("#agregar").on("click", guardarInformacion());
}

/*$("#catalogo").click(getInformationByItem('576ab2589568d10300a17cf7'));*/

function mostrar(numero){
  for (var i = 0; i < document.getElementsByClassName('prodfiltrado').length; i++){
    document.getElementsByClassName('prodfiltrado')[i].style.display= 'none';
  }
  document.getElementsByClassName('prodfiltrado')[numero].style.display= 'inline-block';
}
