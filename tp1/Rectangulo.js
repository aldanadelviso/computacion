class Rectangulo {
  constructor(x, y, angulo, colorFinal, ancho, alto, redondeo, velocidadY) {
    this.x = x;
    this.y = y;
    this.angulo = angulo;
    this.colorFinal = colorFinal;
    this.ancho = ancho;
    this.alto = alto;
    this.redondeo = redondeo;
    this.velocidadY = velocidadY;
  }
  
  dibujar() {
    push();
    translate(this.x, this.y);
    rotate(this.angulo);
    fill(this.colorFinal);
    rect(0, 0, this.ancho, this.alto, 0, 0, 0, this.redondeo);
    pop();
  }
}
