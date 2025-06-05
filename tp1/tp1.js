let anchoBase = 10;
let altoBase = 10;
let espacio = 2;
let gotasImagenes = [];
let tiempoInicio;
let tiempoLimiteIzq = 3000;
let tiempoLimiteDer = 6000;
let obra;
let mic;
let umbral = 0.01;

function preload() {
  for (let i = 0; i < 4; i++) {
    gotasImagenes[i] = loadImage("imagenes/trazo0" + i + ".png");
  }
}

function setup() {
  createCanvas(400, 500);
  imageMode(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  obra = new Obra(anchoBase, altoBase, espacio, gotasImagenes);
}

function draw() {
  let volumen = mic.getLevel() * 10;
  let lluviaActiva = volumen > umbral;

  obra.dibujarFondo();
  /*
  fill(0);
  noStroke();
  rect(10, height - 30, 150, 20);
  fill(255);
  textSize(12);
  text("Volumen: " + nf(volumen, 1, 4), 15, height - 15);*/
  if (lluviaActiva) {
    if (!tiempoInicio) {
      tiempoInicio = millis();
    }
    let intensidad = map(volumen, umbral, 0.3, 2, 5, true);

    let tiempoTranscurrido = millis() - tiempoInicio;
    if (tiempoTranscurrido < tiempoLimiteIzq) {
      obra.lluviaHaciaAbajo(intensidad);
    } else if (tiempoTranscurrido < tiempoLimiteDer) {
      obra.lluviaHaciaCostado(PI / 10, intensidad);
    } else {
      obra.lluviaHaciaCostado(-PI / 10, intensidad);
    }
  } else {
    tiempoInicio = null;
    obra.reiniciarPosicionGotas();
    obra.dibujarGotas();
  }
}