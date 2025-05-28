class Gota {
  constructor(x, y, ancho, alto, velocidadY, tinte) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.velocidadY = velocidadY;
    this.tinte=tinte;
    this.imagen= null;
  }

  dibujar() {
    if (this.imagen){
      tint(255, this.tinte);
      image(this.imagen, this.x, this.y, this.ancho, this.alto);
    }
  }
}
