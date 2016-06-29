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
    getInformationByGroup();
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
  string += '<span class="col-xs-6 col-sm-2">CODIGO: </span>';
  string += '<input type="text" class="btn col-xs-6 col-sm-2 Valores"></input> ';
  string += '<span class="col-xs-6 col-sm-2">DESCRIPCION: </span>';
  string += '<input type="text" class="btn col-xs-6 col-sm-2 Valores"></input> ';
  string += '<span class="col-xs-6 col-sm-2">PRECIO: </span>';
  string += '<input type="text" class="btn col-xs-6 col-sm-2 Valores"></input> ';
  string += '<input id="agregar" type="button" class="btn col-xs-12 col-sm-6 col-sm-offset-3" value="AGREGAR">'
  string += '<div class="col-xs-12" id="guardarAlert"></div>';
  return string;
}

function crearTabla(resultData){
  var html = '<div class="catalogo"><table class="table table-hover"><thead><td>CODIGO</td><td>DESCRIPCION</td><td>PRECIO</td><td></td></thead><tbody>';
  var html2 = "";
  for (var i = 0; i < resultData.information.length; i++) {
    html2 = "";
    html += '<tr>';
    html2 += '<td>'+resultData.information[i]['thing'].codigo+'</td>';
    html2 += '<td>'+resultData.information[i]['thing'].descripcion+'</td>';
    html2 += '<td>$'+resultData.information[i]['thing'].precio+'</td>'
    html2 += '<td><input class="eliminar" type="button" value="eliminar"></input>'
    html += html2+'</tr>';
  }
  html += '</tbody></table>';
  html += inputsCatalogo();
  html += '<div>'
  $("#contenedorCentral").html(html);
  $("#agregar").on("click", function(){
    guardarInformacion();
  });
  var botonesEliminar = $(".eliminar");
  for (var i = 0; i < botonesEliminar.length; i++) {
    asignarEliminar(botonesEliminar[i], resultData.information[i]['_id']);
  }
}

function asignarEliminar(boton, id){
  boton.click = function(){
    deleteInformationByItem(id);
  }
}

function deleteInformationByItem(item) {
  var id=item;
  $.ajax({
    url:"http://web-unicen.herokuapp.com/api/delete/" + id,
    method:"DELETE",
    success: function(resultData){
      console.log(resultData);
      getInformationByGroup();
    },
    error:function(jqxml, status, errorThrown){
      alert('Error!');
      console.log(errorThrown);
    }
  });
}

function getInformationByGroup(){
  var grupo = 99;
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
  var grupo = 99;
  var informacion = {
    codigo: null,
    descripcion: null,
    precio: null
  };
  var inputs = $(".Valores");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      alert('debe llenar todos los campos');
      return;
    }
  }
  informacion.codigo = inputs[0].value;
  informacion.descripcion = inputs[1].value;
  informacion.precio = inputs[2].value;
  //la estructura que debemos enviar es especifica de cada servicio que usemos
  //en este caso un hay que enviar un objeto con el numero de grupo y con lo que queramos guardarInformacion
  //thing puede ser un objeto JSON con tanta información como queramos (en este servicio)
  var info = {
 "group": grupo,
 "thing": informacion
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
      $("#guardarAlert").html("Guardado");
      console.log(resultData.information);
      getInformationByGroup();
    },
    error:function(jqxml, status, errorThrown){
      console.log(errorThrown);
      $("#guardarAlert").addClass("alert-danger");
      $("#guardarAlert").html("Error por favor intente mas tarde");
    }
  },
  $("#guardarAlert").html("Cargando...")
);
}


/*$("#catalogo").click(getInformationByItem('576ab2589568d10300a17cf7'));*/

function mostrar(numero){
  for (var i = 0; i < document.getElementsByClassName('prodfiltrado').length; i++){
    document.getElementsByClassName('prodfiltrado')[i].style.display= 'none';
  }
  document.getElementsByClassName('prodfiltrado')[numero].style.display= 'inline-block';
}
