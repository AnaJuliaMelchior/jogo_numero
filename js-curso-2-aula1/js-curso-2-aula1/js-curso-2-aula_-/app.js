let listaNumSorteados = [];
let numLimite = 10;
let numeroSecreto = gerarAleatorio();
let tentativas = 1;

function textoTela(tag, texto) { //executa sem retorno e tem parametros
    let campo = document.querySelector(tag)
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirInicial() {
    textoTela('h1', 'Jogo número secreto 2.0');
    textoTela('p', 'Escolha um número entre 1 e 10');
}
exibirInicial();


function verificarChute() { //sem parametro e retorno
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        textoTela('h1','Parabéns, você acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        textoTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            textoTela('p', 'O número secreto é menor');
        } else {
            textoTela('p', 'O número secreto é maior');
        }
        tentativas = tentativas + 1;
        limparCampo();
    }
}

function gerarAleatorio() { //tem retorna mas sem parametro
    let numeroEscolhido = parseInt(Math.random() * numLimite + 1); 
    let quantidadeLista = listaNumSorteados.length;

    if (quantidadeLista == numLimite) {
        listaNumSorteados = []
    }

    if (listaNumSorteados.includes(numeroEscolhido)) { //the number is already on the list
        return gerarAleatorio();
      } else { //se o numero ainda nao estiver na lista
        listaNumSorteados.push(numeroEscolhido); //appends new elements to the end of an array, and returns the new length of the array
        console.log(listaNumSorteados);
        return numeroEscolhido;
      }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; //o chute seja uma string vazia
}

function reiniciarJogo(){
    numeroSecreto = gerarAleatorio(); //chama a geração do número
    limparCampo(); //vai limpar o campo
    tentativas = 1; //as tentativas se reiniciarão em 1
    exibirInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}