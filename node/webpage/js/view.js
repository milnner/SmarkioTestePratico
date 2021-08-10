//VIEW
function getWindow() {
    document.getElementById('main').style.height = `${innerHeight}px`;
    document.getElementById('main').style.width = `${innerWidth}px`;
    document.getElementById('linha').style.height = `${innerHeight}px`;
}

setInterval(getWindow, 1000);