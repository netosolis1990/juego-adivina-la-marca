$(document).ready(function() {
    
    //Verificamos que el puntaje este inicializado
    if(!localStorage['ok']){
        localStorage['ok'] = 0;
        localStorage['mal'] = 0;
        $('#ok').val(localStorage['ok']);
        $('#mal').val(localStorage['mal']);
    }
    else{
        $('#ok').val(localStorage['ok']);
        $('#mal').val(localStorage['mal']);
    }

    //Cargamos el nombre de las marcas
    marcas = ['american airlines',
        'apple',
        'burger king',
        'coca cola',
        'corona',
        'fedex',
        'firefox',
        'heineken',
        'hewlett packard',
        'kodak',
        'lays',
        'marlboro',
        'master card',
        'michael kors',
        'mitsubishi',
        'nike',
        'nissan',
        'pepsi',
        'pringles',
        'puma',
        'seat',
        'seven eleven',
        'toyota',
        'volkswagen',
        'walmart'];

    //Seleccionamos una marca al azar
    var buena;
    var j = Math.round(Math.random()*24);
    var src = 'img/'+marcas[j]+'.jpg';
    $('#ban1').html('<img class="img-responsive bandera" src="'+src+'">');
    buena = marcas[j];

    //Inicializamos un cronometro de 45 seg para poner la respuesta
    var cron = 45;
    var inter = setInterval(function(){
        $('#pais').html(cron--);
        if(cron < 0){
            clearInterval(inter);
            nota('error','NO SABES!! La respuesta es '+buena.toUpperCase());
            localStorage['mal']++;
            setTimeout(function(){location.href = 'index.html'},4000);
        }
    },1000);


    //Comprobamos que la respuesta este correcta.
    $('#comprobar').click(function(event) {
        tem = $('#res').val().toLowerCase();
        if(tem.indexOf(buena)>-1){
            nota('success','<strong>BUENAAAAA</strong>');
            localStorage['ok']++;
            clearInterval(inter);
            setTimeout(function(){location.href = 'index.html'},2000);
        }
        else{
            nota('error','NO SABES!!');
        }        
    });

    //Cuando se hace click en SIGUIENTE cargamos la pagina de nuevo
    $('#reset').click(function(event) {
        localStorage['mal']++;
        location.href="index.html";
    });
}); 


function nota(op,msg,time){
    if(time == undefined)time = 5000;
    var n = noty({
        text: msg,
        animation: {
            open: {height: 'toggle'}, 
            close: {height: 'toggle'},
            easing: 'swing', 
            speed: 500,
        },
        type:op,
        killer:true,
        timeout:time,
        layout: 'center',
        maxVisible: 1,
    });
}