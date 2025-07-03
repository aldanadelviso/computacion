class Gota {
  constructor(x, y, ancho, alto, velocidadY, tinte) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.velocidadY = velocidadY;
    this.tinte= tinte;
    this.xOriginal = x;
    this.yOriginal= y;
    this.imagen= null;
  }

  dibujar(temblor) {
    if (this.imagen){
      tint(255, this.tinte);
      let x= this.x;
      let y= this.y;
      if(temblor){
        x=random(this.x-2, this.x);
        y=random(this.y-2, this.y);
      }
      image(this.imagen, x, y, this.ancho, this.alto);
    }
  }

  posicionOriginal(){
    this.x = this.xOriginal;
    this.y = this.yOriginal;
  }
}
