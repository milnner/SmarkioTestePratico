var http = new XMLHttpRequest();
var url = 'http://localhost:3000/add';

function colocaOsComentarios(){ // coloca os comentários do banco de dados na tala
    if(http.readyState == 4)
    {
        res = JSON.parse(http.responseText);
        let comentarios = document.getElementById('comentarios');
        for(let i = 0;i < res.length; i++)
        {
            let comentario = '';
            comentario += '<div class="comentario">';
            comentario += '<div class="cmts">';
            comentario +=   `<p>${res[i].comentario}</p>`;
            comentario += '</div>';
            comentario += '<div class="div-ouvir">';
            comentario +=   '<div>';
            comentario +=     '<button class="ouvir-b" onclick="passaAudio(2)">Ouvir</button>';
            comentario +=   '</div>';
            comentario += '</div>';
            comentario += '</div>';
            comentarios.innerHTML += comentario;
        }
        http.readyState = 0;
    }
};

function sendParams(params)
{
    http.open('POST', url, true);
    http.onreadystatechange = colocaOsComentarios;
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send(params);
}
var element = document.getElementById('text-coment');

function readText() { //retorna um cabeçalho para fazer o post
    
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



document.getElementById('sub').addEventListener("click",() =>{
    sendParams(readText()); 
    
});

window.onload = () => {
    http.open('POST', url, true);
    http.onreadystatechange = colocaOsComentarios;
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.send('comment=');
}