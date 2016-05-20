function init(argument) {
    var txtarea = document.getElementById("txt");
    if (!txtarea.value) {
        txtarea.value = localStorage.getItem('valorTexto');
    }
    
    
    // adiciona listener no botao de clear
    document.getElementById("btnClear").addEventListener("click",
        function () {
            localStorage.clear();
            txtarea.value = '';
        }
    );
  
    // adiciona listener ao digitar
    
    txtarea.addEventListener('keyup', 
        function(e) {
            localStorage.setItem('valorTexto', this.value);
        }
    );
}




window.onload = init;

// funcoes abaixo apenas para testes iniciais. não estão sendo usadas na aplicação,
// mas estão salvas para referencia
function inicio(argument) {
    console.log("Inicio da aplicação");
    
    
    var usuario = {user: 'Fernando', id: 15};
    
    localStorage.setItem("usr", JSON.stringify(usuario));
    
    var data = localStorage.getItem("usr");
    if (data !== undefined) {
        data = JSON.parse(data);
    }
    console.log( "Ola, " + data.user);
    // localStorage.clear();
    // localStorage.removeItem("dataNascimento");
    
}


