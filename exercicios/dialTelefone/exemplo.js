function init() {
    var num1 = document.getElementById("num1");
    var num2 = document.getElementById("num2");
    var num3 = document.getElementById("num3");
    var num4 = document.getElementById("num4");
    var num5 = document.getElementById("num5");
    var num6 = document.getElementById("num6");
    var num7 = document.getElementById("num7");
    var num8 = document.getElementById("num8");
    var num9 = document.getElementById("num9");
    var num0 = document.getElementById("num0");

    num1.onclick = action;
    num2.onclick = action;
    num3.onclick = action;
    num4.onclick = action;
    num5.onclick = action;
    num6.onclick = action;
    num7.onclick = action;
    num8.onclick = action;
    num9.onclick = action;
    num0.onclick = action;
}


function action(event) {
    console.log('event: ' + event);
    for (var i = 0; i < 10; i++) {
        var nomeCampo = 'num' + i;
        if (event.target.id == nomeCampo) {
            inserirTextoResultado(i);
        }
    }
}

function inserirTextoResultado(texto) {
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = resultado.innerHTML + texto;
}

window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key >= 48 || key <= 57) {
        var nomeCampo = 'num' + (key - 48);
        var evento = e;
        evento.target.id = nomeCampo;
        console.log(nomeCampo);

        console.log(evento);
        action(evento);
    }
}


window.onload = init;