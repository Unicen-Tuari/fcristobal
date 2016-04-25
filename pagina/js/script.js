

function mostrartabla(nombreclase, tablanum) {
  for (var i = 0; i < document.getElementsByClassName(nombreclase).length; i++) {
    document.getElementsByClassName(nombreclase)[i].style.display = "none";
  }
  document.getElementsByClassName(nombreclase)[tablanum].style.display = "block";
}
