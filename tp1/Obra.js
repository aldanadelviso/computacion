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
        let velocidadY = random(3, 5);
        let indice = int(random(0, this.gotasImagenes.length));
        let tinte = random(75, 100);

        let gota = new Gota(x, y, this.anchoBase, this.altoBase, velocidadY, tinte);
        gota.imagen = this.gotasImagenes[indice];
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
  
  dibujarFondoOnda(alturaOnda){
    if(alturaOnda) {
      let inicioX = 0;
      let finX = width;

      for (let x = 0; x < width; x++) {
        let yLimite;

        if (x >= inicioX && x <= finX) {
          let t = map(x, inicioX, finX, 0, PI);
          let onda = sin(t) * 20;
          yLimite = height - alturaOnda - onda;
        } else {
          yLimite = height - alturaOnda;
        }

        if (yLimite < height) {
          let c = color(100, 0, 0);
          stroke(c);
          line(x, yLimite, x, height);
        }
      }
    }
  }

  reiniciarPosicionGotas() {
    for (let g of this.gotas) {
      g.posicionOriginal();
    }
  }

  dibujarGotas(temblor) {
    for (let g of this.gotas) {
      g.dibujar(temblor);
    }
  }

  lluviaHaciaAbajo(intensidad) {
    for (let g of this.gotas) {
      g.y += g.velocidadY * intensidad;
      if (g.y > height - g.alto) {
        g.y = -g.alto;
      }
      g.dibujar();
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

      g.dibujar();
    }
  }
}