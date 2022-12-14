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
};

function calculaResultado() {
  var aux = visor.value.substring(visor.value.length - 1, visor.value.length);
  if (verificaOperador(aux)) { //Se o último dígito for um operador, ele é ignorado na expressão matemática
    apagaUltimoDigito();
  }
  
  var valorCalculado = calculaArray(visor.value); //Visor exibe o resultado da expressão

  if (valorCalculado || valorCalculado == "0") {
    visor.value = valorCalculado;
  }
}

function apagaUltimoDigito() {
    if (visor.value.length > 0) {
      visor.value = visor.value.substring(0, visor.value.length - 1);
    }
}

function escreveNoVisor() {
  if (verificaOperador(this.value)) {
    if (verificaOperador(visor.value.substring(visor.value.length - 1, visor.value.length))) { //subtituir o valor do operador anterior pelo novo operador digitado
      apagaUltimoDigito();
    }
  }
  if (this.value) {
    visor.value += this.value;
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

//Percorre toda a expressão separando os termos, depois chama as funções que realizam as operações matemáticas
function calculaArray(exp){ 
    //console.log(exp);
    exp = exp.toString().split('+'); 
    for (a = 0; a < exp.length; a++){ 
                exp[a] = exp[a].split("-"); 
                //console.log(exp[a]);
        for (b = 0; b < exp[a].length; b++) { 
            exp[a][b] = exp[a][b].split("*");
            //console.log(exp[a][b]); 
            for (c = 0; c < exp[a][b].length; c++) { 
                exp[a][b][c] = exp[a][b][c].split("/");
                //console.log(exp[a][b][c]);
                exp[a][b][c] = divideArray(exp[a][b][c]);
            }
            exp[a][b] = multiplicaArray(exp[a][b]);
        }
        exp[a] = subtraiArray(exp[a]);
    }
    exp = adicaoArray(exp);

    return exp;

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
