class Obra {
  constructor(anchoBase, altoBase, espacio, gotasImagenes) {
    this.anchoBase = anchoBase;
    this.altoBase = altoBase;
    this.espacio = espacio;
    this.gotasImagenes = gotasImagenes;
    this.gotas = [];
    this.columnas = Math.floor(width / (altoBase + espacio)) + 2;
    this.filas = Math.floor(height / (anchoBase + espacio)) + 2;
    this.inicializarGotas();
  }

  inicializarGotas() {
    for (let fila = 0; fila < this.filas; fila++) {
      for (let columna = 0; columna < this.columnas; columna++) {
        let x = columna * (this.anchoBase + this.espacio);
        let y = fila * (this.altoBase + this.espacio);
        if (columna % 2 === 0) {
            y=y+5;
        }
        let velocidadY = random(3, 5);
        let indiceImagen = int(random(0, this.gotasImagenes.length));
        let tinte = random(75, 100);
        let gota = new Gota(x, y, this.anchoBase, this.altoBase, velocidadY, tinte, indiceImagen, columna, fila);
        this.gotas.push(gota);
      }
    }
  }

  dibujarFondo() {
    background(255);
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(100, 0, 0), color(255, 240, 230), inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  dibujarFondoMovedizo(tiempo){
    let desplazamiento = sin(tiempo) * 500;
    for (let y = 0; y < height; y++) {
      let inter = map(y + desplazamiento, 0, height, 0, 1);
      let c = lerpColor(color(100, 0, 0), color(255, 240, 230), constrain(inter, 0, 1));
      stroke(c);
      line(0, y, width, y);
    }
  }

  reiniciarPosicionGotas() {
    for (let g of this.gotas) {
      g.posicionOriginal();
    }
  }

  dibujarGotas(temblor) {
    for (let g of this.gotas) {
      g.dibujar(temblor, this.gotasImagenes);
    }
  }

  lluviaHaciaAbajo(intensidad) {
    for (let g of this.gotas) {
      g.y += g.velocidadY * intensidad;
      if (g.y > height - g.alto) {
        g.y = -g.alto;
      }
      g.dibujar(false, this.gotasImagenes);
    }
  }

  lluviaHaciaCostado(angulo, intensidad) {
    for (let g of this.gotas) {
      g.x += sin(angulo) * g.velocidadY * intensidad;
      g.y += cos(angulo) * g.velocidadY * intensidad;
      g.y += g.velocidadY * intensidad;

      if (g.y > height + 50 || g.x < -50) {
        let offset = random(-200, width + 200);
        g.x = offset;
        g.y = -100;
        g.x -= sin(angulo) * 100;
        g.y -= cos(angulo) * 100;
      }

      g.dibujar(false, this.gotasImagenes);
    }
  }
}