let rectangulos = [];
let filas = 28;
let columnas = 18;
let anchoBase= 8;
let altoBase= 12;
let redondeo= 4;

let mic, amplitude;
let micStarted = false;
let umbralVolumen = 0.004;

function setup() {
  createCanvas(400, 500);
  rectMode(CENTER);
  amplitude = new p5.Amplitude();
  inicializarRectangulos();
}

function draw() {
  dibujarFondo();
  noStroke();
  if (!micStarted) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("Haz clic para activar el micrófono", width / 2, height / 2);
    return;
  }

  let nivelVolumen = amplitude.getLevel();
  let lluviaActiva = nivelVolumen > umbralVolumen;
  dibujarRectangulos(lluviaActiva);
  
    // Opcional: mostrar el nivel actual
  fill(255);
  textSize(12);
  text(`Volumen: ${nivelVolumen.toFixed(3)}`, 10, height - 10);
  
}

//Funcion para crear los rectangulos y guardarlos en el arreglo para luego dibujarlos.
function inicializarRectangulos() {
  for (let fila = 0; fila < filas; fila++) {
    for (let columna = 0; columna < columnas; columna++) {
      let x = columna * (width / columnas) + random(-6, 6);
      let y = fila * (height / filas) + random(-6, 6);
      let angulo = random(-PI / 10, PI / 10);
      let colorBase = color(255, 240, 240);
      let colorAlternativo = color(150 + random(-20, 10), 40 + random(0, 20), 40 + random(0, 20));
      let mezcla = random(0.05, 0.4);
      let colorFinal = lerpColor(colorBase, colorAlternativo, mezcla);
      colorFinal.setAlpha(random(150, 220));
      let velocidadY= random(0.5, 1.5);
      let rectangulo= new Rectangulo(x, y, angulo, colorFinal, anchoBase, altoBase, redondeo, velocidadY);
      rectangulos.push(rectangulo);
    }
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

//Funcion para hacer aparecer los rectangulos
function dibujarRectangulos(lluviaActiva){
  for (let r of rectangulos) {
    if (lluviaActiva) {
      r.y += r.velocidadY;
      if (r.y > height + r.alto) {
        r.y = -r.alto; // reaparece arriba
      }
    }
    r.dibujar();
  }
}

function mousePressed() {
  if (!micStarted) {
    mic = new p5.AudioIn();
    mic.start(() => {
      amplitude.setInput(mic);
      micStarted = true;
      console.log("Micrófono activado");
    });
  }
}
