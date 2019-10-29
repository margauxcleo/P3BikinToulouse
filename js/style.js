var next = $('#slider_next');
var previous = $('#slider_prev');

var slider = $('#bloc_slider');

var currentSlide = 0;
var totalSlide = 4;

// au clic fleche droite  
next.on('click', function(event) {
    currentSlide++;
    if (currentSlide >= totalSlide) {
        currentSlide = 0
    }
    slider.css("left", "-" + currentSlide + "00%");  
});

// au clic fleche gauche 
previous.on('click', function(event) {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalSlide - 1  
    }
    slider.css("left", "-" + currentSlide + "00%");    
});

//qd clic sur play
 // on lancer setInterval
  //simule clic sur next = > ah bon ?????! 

// qd clic sur pause
    //clearInterval

// changement auto d'image 
var animation = setInterval(function() {
    currentSlide++;
    if (currentSlide >= totalSlide) {
        currentSlide = 0;
    }
    slider.css("left", "-" + currentSlide + "00%");
}, 5000 );


// play et pause

// si clic sur pause 
 // clear interval pour stopper le setInterval 
 var pause = $('#pause');
 var play = $('#play');

 pause.on('click', function(event) {
    clearInterval(animation);
    pause.css('display', 'none');
    // AR 
    play.css('position', 'absolute');
    play.css('bottom', '0');
    play.css('left', '0');
    play.css('right', '0');
    play.css('display', 'flex');
    play.css('justify-content', 'center');
    play.css('align-items', 'flex-end');
 });

// si clic sur play 
 // on relance le setInterval 
play.on('click', function(event) {
    animation = setInterval(function() {
        currentSlide++; 
        console.log(currentSlide);
        if (currentSlide >= totalSlide) {
            currentSlide = 0;
        }
        slider.css("left", "-" + currentSlide + "00%");
    }, 5000 );
    play.css('display', 'none');
    pause.css('position', 'absolute')
    .css('bottom', '0')
    .css('left', '0')
    .css('right', '0')
    .css('display', 'flex')
    .css('justify-content', 'center')
    .css('align-items', 'flex-end');
});


// AR AR 
//cette partie fonctionne, on récupère le bon numero de touche

var arrowID = 0;

document.addEventListener('keydown', getArrowID);

function getArrowID(event) {
    arrowID = event.which; // on recupere le numero de la touche
    if (arrowID === 39) {
        next.trigger('click');
    } else if (arrowID === 37) {
        previous.trigger('click');
    } else {
        console.log("erreur" + arrowID);
    }
    /* 
    CONSERVER pour info / fonctionne aussi 
    switch (arrowID) {
        case 39:
            next.trigger('click')
            break;
        case 37:
            previous.trigger('click')
            break;
        default:
            consoe.log("erreur");
    }
    */
};

/* LEAF LET MAP */

// appel AJAX
function getMap() {
    var ajax = new XMLHttpRequest();
    console.log("readyState après new: "+ajax.readyState); //permet de voir l'avancement de la requête / si 4 c'est ok
    /* detection de l'avancement de l'appel */
    ajax.onredadystatechange = function() {
        console.log("readyState a changé et vaut: "+ajax.readyState);
    }
    /* détection de la fin de l'appel */
    ajax.onload = function() { //onload = on précise la function à déclencher quand l'appel est terminé
        console.log("Appel AJAX terminé");
        console.log(" status : "+this.status); //code de retour serveur
        console.log(" response : "+this.response); // contenu de la rep envoyée par le serveur
        if (this.status == 200) {
            var json = JSON.parse(this.response); // on convertit JSON      
    }
    var url = "https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6";
    ajax.open("GET", url, true); //on démarre la requete AJAX avec OPEN
    ajax.send(); /*on déclenche l'appel avec send */

    /* infos de leaf let == PB*/
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
        L.tileLayer('https://api.jcdecaux.com/vls/v3/contracts HTTP/1.1', {
            maxZoom: 18,
            minZoom: 1, 
            "name" : "Toulouse",
            "commercial_name" : "Vélô",
            "country_code" : "FR",
        }).addTo(mymap);
    }
};

/*
// infos de leaf let
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6', {
    maxZoom: 18,
    "name" : "Toulouse",
    "commercial_name" : "Vélô",
    "country_code" : "FR",
}).addTo(mymap);
*/