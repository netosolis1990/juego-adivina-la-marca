$(document).ready(function() {
    var j;
    //Verificamos que el puntaje este inicializado
    if(!localStorage['buenas']){
        localStorage['buenas'] = 0;
        localStorage['malas'] = 0;
        localStorage['marca'] = 0;
        j = 0;
        $('#ok').val(localStorage['buenas']);
        $('#mal').val(localStorage['malas']);
    }
    else{
        localStorage['marca']++;
        if(localStorage['marca'] >24){
            nota('warning','Empezamos de nuevo!!');
            localStorage['buenas'] = 0;
            localStorage['malas'] = 0;
            localStorage['marca'] = 0;
        }
        j = localStorage['marca'];
        $('#ok').val(localStorage['buenas']);
        $('#mal').val(localStorage['malas']);
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

    //Seleccionamos una marca 
    var buena;
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
            localStorage['malas']++;
            setTimeout(function(){location.href = 'index.html'},4000);
        }
    },1000);


    //Comprobamos que la respuesta este correcta.
    $('#comprobar').click(function(event) {
        tem = $('#res').val().toLowerCase();
        if(tem.indexOf(buena)>-1){
            nota('success','<strong>BUENAAAAA</strong>');
            localStorage['buenas']++;
            clearInterval(inter);
            setTimeout(function(){location.href = 'index.html'},2000);
        }
        else{
            nota('error','NO SABES!!');
        }        
    });

    //Cuando se hace click en SIGUIENTE cargamos la pagina de nuevo
    $('#reset').click(function(event) {
        localStorage['malas']++;
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
