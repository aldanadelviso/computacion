class Gota {
  constructor(x, y, ancho, alto, velocidadY, tinte, indiceImagen, columna, fila) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.velocidadY = velocidadY;
    this.tinte= tinte;
    this.xOriginal = x;
    this.yOriginal= y;
    this.indiceImagen= indiceImagen;
    this.columna = columna;
    this.fila = fila;
  }

  dibujar(temblor, gotasImagenes) {
    tint(255, this.tinte);
    let x= this.x;
    let y= this.y;
    if (temblor) {
      let escala = 0.2;
      let t = frameCount * 0.01;
      let offsetX = map(noise(this.columna * escala, this.fila * escala, t), 0, 1, -10, 10);
      let offsetY = map(noise(this.columna * escala, this.fila * escala, t + 100), 0, 1, -10, 10);
      x += offsetX;
      y += offsetY;
    }
    image(gotasImagenes[this.indiceImagen], x, y, this.ancho, this.alto);
  }

  posicionOriginal(){
    this.x = this.xOriginal;
    this.y = this.yOriginal;
  }
}
