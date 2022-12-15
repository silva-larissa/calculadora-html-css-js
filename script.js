var visor = document.getElementById("visor");

var listenerBtn = [];

//Botões operadores
listenerBtn.push(document.getElementById("soma"));
listenerBtn.push(document.getElementById("subtracao"));
listenerBtn.push(document.getElementById("divisao"));
listenerBtn.push(document.getElementById("multiplicacao"));

//Botões numéricos
listenerBtn.push(document.getElementById("num0"));
listenerBtn.push(document.getElementById("num1"));
listenerBtn.push(document.getElementById("num2"));
listenerBtn.push(document.getElementById("num3"));
listenerBtn.push(document.getElementById("num4"));
listenerBtn.push(document.getElementById("num5"));
listenerBtn.push(document.getElementById("num6"));
listenerBtn.push(document.getElementById("num7"));
listenerBtn.push(document.getElementById("num8"));
listenerBtn.push(document.getElementById("num9"));

//Botões adicionais
var btnResultado = document.getElementById("resultado");
var btnLimpaVisor = document.getElementById("limparVisor");
var btnApagaDigito = document.getElementById("apagaDigito");
listenerBtn.push(document.getElementById("ponto"));

//Declaração das variáveis de tratamento de ponto duplicado
var contadorPontos = 0;
var limitePontos = 1;

for (var i = 0; i < listenerBtn.length; i++) {
  listenerBtn[i].addEventListener("click", escreveNoVisor); //Adiciona o caractere do botão ao visor
}

btnResultado.onclick = function () {
  calculaResultado();
};

btnApagaDigito.onclick = function () {
  apagaUltimoDigito();
};

btnLimpaVisor.onclick = function () {
  visor.value = "";
  contadorPontos = 0;
};

function calculaResultado() {
  if (verificaOperador(visor.value.substring(visor.value.length - 1, visor.value.length))) {
    apagaUltimoDigito(); //Se o último dígito do visor for um operador, ele é ignorado na expressão matemática
  }

  var valorCalculado = calculaArray(visor.value); //Visor exibe o resultado da expressão

  if (valorCalculado || valorCalculado == "0") {
    visor.value = valorCalculado;
  }
}

function apagaUltimoDigito() {
  if (visor.value.length > 0) {
    if (visor.value[visor.value.length - 1] === ".") {//Se o último caractere deletado for ".", permite recolocar
      contadorPontos = 0;
    }
    visor.value = visor.value.substring(0, visor.value.length - 1);
  }
}

function escreveNoVisor() {
  ultimoDigito = this.value;

  if (verificaOperador(ultimoDigito)){
    contadorPontos = 0;
    if (verificaOperador(visor.value.substring(visor.value.length - 1, visor.value.length))) { //subtituir o valor do operador anterior pelo novo operador digitado
      apagaUltimoDigito();
    }
  } 
    
  if (verificaPonto(ultimoDigito) === true){
    contadorPontos++;
    if (contadorPontos > limitePontos){
      return;
    }    
  } 
  visor.value += ultimoDigito;  
}

function verificaPonto(valorDigitado) {
  if (valorDigitado === ".") {
    return true;
  } else {
    return false;
  }
}

function verificaOperador(valorOperador) {
  switch (valorOperador) {
    case "*":
      return true;
    case "/":
      return true;
    case "+":
      return true;
    case "-":
      return true;
    default:
      return false;
  }
}

//Percorre toda a expressão em forma de String, separa os termos, depois chama as funções que realizam as operações matemáticas
function calculaArray(expressao) {
  expressao = expressao.toString().split("+");
  for (a = 0; a < expressao.length; a++) {
    expressao[a] = expressao[a].split("-");
    for (b = 0; b < expressao[a].length; b++) {
      expressao[a][b] = expressao[a][b].split("*");
      for (c = 0; c < expressao[a][b].length; c++) {
        expressao[a][b][c] = expressao[a][b][c].split("/");
        expressao[a][b][c] = divideArray(expressao[a][b][c]);
      }
      expressao[a][b] = multiplicaArray(expressao[a][b]);
    }
    expressao[a] = subtraiArray(expressao[a]);
  }
  expressao = adicaoArray(expressao);

  return expressao;
}

function multiplicaArray(parametro) {
  var resultadoMult = 1;
  for (var x = 0; x < parametro.length; x++) {
    resultadoMult *= parametro[x];
  }
  return resultadoMult;
}

function divideArray(parametro) {
  var resultadoDiv = parametro[0];
  for (var x = 1; x < parametro.length; x++) {
    resultadoDiv /= parametro[x];
  }
  return resultadoDiv;
}

function subtraiArray(parametro) {
  var resultadoSub = parametro[0];
  for (var x = 1; x < parametro.length; x++) {
    resultadoSub -= parametro[x];
  }
  return resultadoSub;
}

function adicaoArray(parametro) {
  var resultadoAdi = 0;
  for (var x = 0; x < parametro.length; x++) {
    resultadoAdi += parametro[x];
  }
  return resultadoAdi;
}
