let anchoBase = 10;
let altoBase = 10;
let espacio = 2;
let gotasImagenes = [];
let tiempoInicio;
let tiempoLimiteIzq = 3000;
let tiempoLimiteDer = 6000;
let obra;
let alturaOnda = 0;
let velocidadSubida = 10;
let ascendiendo= true;

let AMP_MIN = 0.001; // umbral de ruido de fondo
let AMP_MAX = 0.15; // umbral superior, amplitud máxima del sonido de entrada
let FREC_MIN = 120; // frecuencia más baja que se va a cantar
let FREC_MAX = 270; // frecuencia más alta
let amortiguacion = 0.9; //calibrar el factor (porcentaje) de amortiguación (0 = nada amortiguado || 1 = todo amoritiguado)
let monitor = false; 
//------Variables de sonido
let mic; // variable para cargar la entrada de audio

let ampCruda; // variable para almacenar la amplitud del sonido de entrada SIN PROCESAR / DIRECTA DEL MIC
let amp; // variable para almacenar la amplitud del sonido de entrada YA FILTRADA/ AMORTIGUADA x el gestor

let frecCruda; // variable para cargar la frecuencia cruda/directa, sin procesar
let frec; // variable para cargar la frecuencia procesada x el gestor

let pitch; // objeto de ML que carga y procesa todos los datos de frecuencia
let audioContext;
const pichModel = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/'; // modelo entrenado para reconocer frecuencia

let gestorSenial; // declarando un gestor de señal para amortitguar, suavizar o filtrar la señal de amplitud
let gestorFrec;

let haySonido = false; // ESTADO
let antesHabiaSonido = false; //ESTADO

let temblor=false;

function preload() {
  for (let i = 0; i < 4; i++) {
    gotasImagenes[i] = loadImage("imagenes/trazo0" + i + ".png");
  }
}

function setup() {
  createCanvas(400, 500);
  imageMode(CENTER);
  obra = new Obra(anchoBase, altoBase, espacio, gotasImagenes);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  userStartAudio();
  gestorAmp =  new GestorSenial(AMP_MIN, AMP_MAX);
  gestorAmp.f = amortiguacion;
  gestorFrec =  new GestorSenial(FREC_MIN, FREC_MAX);
  gestorFrec.f = amortiguacion;
}

function draw() {
  obra.dibujarFondo();
  ampCruda = mic.getLevel(); // señal de entrada de mic DIRECTA
  gestorAmp.actualizar(ampCruda); // el gestor está procesando la señal de entrada (ampmlitud cruda / directa)
  amp = gestorAmp.filtrada; // cargo en mi variable amp la señal ya filtrada/amortiguada que me devuelve el gestor
  frec = gestorFrec.filtrada;  // cargo en mi variable frec la señal ya filtrada/amortiguada que me devuelve el gestor
  haySonido = amp > 0.1; // Condición que definie true o false a la variable. Si superar el límite inferior del piso que nos devuelve el gestor 
  let vel = map(frec, 0, 1, 0, 15); // mapeo la freucunca (filtrada x el gestor) de la misma manera

  if (haySonido) {
    if(esVozGrave()){
      iniciarOnda();
    } else if (esVozAguda()) {
      iniciarLluvia(vel);
    }else{
      finalizarEfectos();
      temblor=true;
    }
  } else {
    finalizarEfectos();
  }

  obra.dibujarGotas(temblor);
}

// --- Modelo para detectar el pitch (frecuencia) de la librería ML5 (versión 0.12.2)
function startPitch() {
  pitch = ml5.pitchDetection(pichModel, audioContext , mic.stream, modelLoaded); // inicializa el modelo entrenado
}

function modelLoaded() {
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      frecCruda = frequency; // cargo la respuesta del análisis (frequency) en mi variablel frecCruda;
      gestorFrec.actualizar(frecCruda); // proceso la señal directa de frecuencia por el gestor
    } else {
    }
    getPitch();
  })
}

function esVozGrave(){
    return frec < 0.01 ;
}

function esVozAguda(){
    return frec > 0.7;
}

function iniciarOnda() {
  finalizarEfectoLluvia();
  finalizarEfectoTemblor();
  if (alturaOnda < height && ascendiendo){
    alturaOnda += velocidadSubida;
  } else{
    ascendiendo=false;
    alturaOnda -= velocidadSubida;
  }
  if(alturaOnda<=0){
    finalizarEfectoOnda();
  }
  obra.dibujarFondoOnda(alturaOnda);
}

function finalizarEfectoLluvia() {
    tiempoInicio=null;
}

function finalizarEfectoOnda(){
    ascendiendo=true;
    alturaOnda=0;
}

function finalizarEfectoTemblor(){
  temblor=false;
}

function finalizarEfectos(){
  finalizarEfectoLluvia();
  finalizarEfectoOnda();
  finalizarEfectoTemblor();
  obra.reiniciarPosicionGotas();
}

function iniciarLluvia(vel){
    finalizarEfectoOnda();
    finalizarEfectoTemblor();
    if (!tiempoInicio) {
      tiempoInicio = millis();
    }
    let intensidad = map(vel, 0.1, 0.3, 2, 5, true);

    let tiempoTranscurrido = millis() - tiempoInicio;
    if (tiempoTranscurrido < tiempoLimiteIzq) {
      obra.lluviaHaciaAbajo(intensidad);
    } else if (tiempoTranscurrido < tiempoLimiteDer) {
      obra.lluviaHaciaCostado(PI / 10, intensidad);
    } else {
      obra.lluviaHaciaCostado(-PI / 10, intensidad);
    }
}