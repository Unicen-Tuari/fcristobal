

function mostrartabla(nombreclase, tablanum) {
  if (nombreclase == "tablainst") {
    for (var i = 0; i < document.getElementsByClassName("instrumento").length; i++) {
      document.getElementsByClassName("instrumento")[i].style.display = "none";
    }
  }
  for (var i = 0; i < document.getElementsByClassName(nombreclase).length; i++) {
    document.getElementsByClassName(nombreclase)[i].style.display = "none";
  }
  document.getElementsByClassName(nombreclase)[tablanum].style.display = "block";
}
