let gotas = [];
let anchoBase = 10;
let altoBase = 10;
let espacio = 2;
let lluviaActiva=false;
let gotasImagenes = [];
let columnas;
let filas;
let tiempoInicio;
let tiempoLimiteIzq = 5000; 
let tiempoLimiteDer = 10000; 

function preload() {
  for (let i = 0; i < 4; i++) {
    gotasImagenes[i]= loadImage("imagenes/trazo0"+i+".png");
  }
}

function setup() {
  createCanvas(400, 500);
  columnas = Math.floor(width / (altoBase + espacio)) +2;
  filas = Math.floor(height / (anchoBase + espacio));
  imageMode(CENTER);
  inicializarGotas();
}

function draw() {
  dibujarFondo();
  noStroke();
  if (mouseIsPressed) {
    lluviaActiva=true;
    if (!tiempoInicio){
      tiempoInicio= millis();
    }
  } else {
    lluviaActiva=false;
    tiempoInicio=null;
    reiniciarPosicionGotas();
  }

  if (lluviaActiva){
    let tiempoTranscurrido = millis() - tiempoInicio;
    if (tiempoTranscurrido < tiempoLimiteIzq) {
      dibujarLluviaHaciaAbajo();
    }else if (tiempoTranscurrido < tiempoLimiteDer) {
      dibujarLluviaHaciaCostado(PI / 10);
    } else {
      dibujarLluviaHaciaCostado(-PI / 10);
    }
  }else{
    dibujarGotas();
  }

}

//Funcion para crear los gotas y guardarlos en el arreglo para luego dibujarlos.
function inicializarGotas() {
  for (let fila = 0; fila < filas; fila++) {
    for (let columna = 0; columna < columnas; columna++) {
      let x = columna * (anchoBase + espacio);
      let y = fila * (altoBase + espacio);
      let velocidadY = random(3, 5);
      let indice = int(random(0, 3));
      let tinte = random(75, 100);

      let gota = new Gota(x, y, anchoBase, altoBase, velocidadY, tinte);
      gota.imagen = gotasImagenes[indice];
      gotas.push(gota); 
    }
  }
}

function reiniciarPosicionGotas() {
  for (let g of gotas) {
    g.posicionOriginal();
  }
}

//Funcion para pintar el fondo degradado
function dibujarFondo(){
  for (let y = 0; y < height; y++) {
    let interpolacion = map(y, 0, height, 0, 1);
    let colorFondo = lerpColor(color(100, 0, 0), color(255, 240, 230), interpolacion);
    stroke(colorFondo);
    line(0, y, width, y);
  }
}

//Funcion para hacer aparecer los gotas
function dibujarGotas(){
  for (let g of gotas) {
    g.dibujar();
  }
}


function dibujarLluviaHaciaAbajo(){
  for (let g of gotas) {
    g.y += g.velocidadY;
    if (g.y > height -g.alto) {
      g.y = -g.alto;
    }
    g.dibujar();
  }
}

function dibujarLluviaHaciaCostado(angulo){
  for (let g of gotas) {
      g.x += sin(angulo) * g.velocidadY;
      g.y += cos(angulo) * g.velocidadY;
      g.y += g.velocidadY;
      if (g.y > height + 50 || g.x < -50) {
          let offset = random(-200, width + 200);
          g.x = offset;
          g.y = -100;
          g.x -= sin(angulo) * 100;
          g.y -= cos(angulo) * 100;
      }
      g.dibujar();
    }
}