//CONEXÕES HTTP 
var http = new XMLHttpRequest();
var url = 'http://localhost:3000/add';

function colocaOsComentarios(){ // coloca os comentários do banco de dados na tala
    if(http.readyState == 4)
    {
        res = JSON.parse(http.responseText);
        let comentarios = document.getElementById('comentarios');
        comentarios.innerHTML = '';
        for(let i = 0;i < res.length; i++)
        {
            let comentario = '';
            comentario += '<div class="comentario">';
            comentario += '<div class="cmts">';
            comentario +=   `<p>${res[i].comentario}</p>`;
            comentario += '</div>';
            comentario += '<div class="div-ouvir">';
            comentario +=   `<audio src="audio/${res[i].audio}.wav" id="${res[i].audio}">`;
            comentario +=   '</audio>';
            comentario +=    `<button class="button-audio" onclick="tocaAudio('${res[i].audio}')">Ouvir</button>`;
            comentario += '</div>';
            comentario += '</div>';
            comentarios.innerHTML += comentario;
        }
        http.readyState = 0;
    }
};

function sendParams(params) { //faz o post e quando finalizar coloca os comentários
    http.open('POST', url, true);
    http.onreadystatechange = colocaOsComentarios;
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(params); 
}

function readText() { //retorna o texto para fazer o post e zera o textArea
    let element = document.getElementById('text-coment');
    let text = element.value;
    let correctText = '';
    for(let i = 0; i < text.length; i++)
    {
        correctText += text[i];
    }
    element.value = '';
    correctText = 'comment='+correctText;

    return correctText;
}

function tocaAudio(param) { //carrega o audio para o navegador com o click do botão
    let audio =new Audio('http://localhost:3000/audio/'+param+'.wav');
    audio.play();
}



document.getElementById('sub').addEventListener("click",() =>{
    sendParams(readText()); 
    
});

window.onload = () => {
    http.open('POST', url, true);
    http.onreadystatechange = colocaOsComentarios;
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send('comment=');
}
