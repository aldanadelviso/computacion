let gotas = [];
let filas = 28;
let columnas = 18;
let anchoBase= 10;
let altoBase= 10;
let lluviaActiva=false;
let gotasImagenes = [];

function preload() {
  for (let i = 0; i < 4; i++) {
    gotasImagenes[0]= loadImage("imagenes/trazo0"+i+".png");
  }
}

function setup() {
  createCanvas(400, 500);
  rectMode(CENTER);
  inicializargotas();
}

function draw() {
  dibujarFondo();
  noStroke();
  if (mouseIsPressed) {
    lluviaActiva=true;
  } else {
   lluviaActiva=false;
  }
  dibujarGotas(lluviaActiva);
}

//Funcion para crear los gotas y guardarlos en el arreglo para luego dibujarlos.
function inicializargotas() {
  for (let fila = 0; fila < filas; fila++) {
    for (let columna = 0; columna < columnas; columna++) {
      let x = columna * (width / columnas) + random(-6, 6);
      let y = fila * (height / filas) + random(-6, 6);
      let velocidadY= random(1.5, 3);
      let indice= int(random(0,3));
      let tinte= random(75, 100);
      let gota= new Gota(x, y, anchoBase, altoBase, velocidadY, tinte);
      gota.imagen= gotasImagenes[indice];
      gotas.push(gota); 
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

//Funcion para hacer aparecer los gotas
function dibujarGotas(lluviaActiva){
  for (let g of gotas) {
    if (lluviaActiva) {
      g.y += g.velocidadY;
      if (g.y > height + g.alto) {
        g.y = -g.alto; // reaparece arriba
      }
    }
    g.dibujar();
  }
}
