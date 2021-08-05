var main = document.getElementById("main");
var left = document.getElementById("left");
var linha = document.getElementById("linha");
var right = document.getElementById("right");
var containerCadastro = document.getElementById("container-do-conteudo");
var containerComentarios = document.getElementById("container-dos-comentarios");
var textArea = document.getElementById("text-coment");
var button = document.getElementById("sub");

window.onload = () => {
    main.style.height = `${innerHeight}px`;
    main.style.width = `${innerWidth}px`;

    left.style.height = `${innerHeight-100}px`;
    left.style.width = `${innerWidth/2.5}px`;

    linha.style.height = `${innerHeight-100}px`;

    right.style.height = `${innerHeight-100}px`;
    right.style.width = `${innerWidth/2.5}px`

    containerCadastro.style.width = `${innerWidth/2.5}px`;
    containerCadastro.style.height = `${innerHeight}px`;

    textArea.style.width = `${innerWidth/3}px`;
    button.style.width = `${innerWidth/3}px`;
}