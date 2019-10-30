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

// LEAF LET = MAP 

// appel AJAX

var myMap;

function getMap() {

    // infos de leaf let
    // set view + latitude, longitude, zoom initial
    myMap = L.map('mapid').setView([43.600000, 1.433333], 11);
    // avec OpenStreetMap
    /*
    var OpenStreetMap_France = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; Openstreetmap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    */

    // avec MapBox 
    var mapBox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyZ2F1eC12aXRleiIsImEiOiJjazJkMm14NDIwYmY3M25xYmFrcTh0OXNkIn0.vCdPdFrZ20BKHoHGx-xy9g', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'your.mapbox.access.token'
    }).addTo(myMap);
};

// A CONSERVER => fonctionne 
/*
// appel de la fonction getMap qd HTML chargé 
$(document).ready(function () {
    console.log("in ready");
    getMap();
    var marker = L.marker([43.600000, 1.433333]).addTo(myMap);
    marker.bindPopup("<b>Centre de Toulouse</b>");
});

// récuperation des données de l'API 
$.getJSON ("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6", function (data) {
    console.log(data);
});
*/



// en cours - pour afficher un marqueur sur chaque station 

// appel de la fonction getMap qd HTML chargé 
$(document).ready(function () {
    console.log("in ready");
    getMap();
    // on initialise une station 
    var stationName = datas[i].name;
    var stationLat = datas[i].position.lat;
    var stationLng = datas[i].position.lng;
    // on initialise la var marker
    var marker = L.marker([element.position.lat, element.position.lng]).addTo(myMap);
     
    //on crée le tableau récap avec les donnees
    var datas;
    function afficherMarqueur (reponse) {
        var infosStation = JSON.parse(reponse);
        infosStation.forEach(element => {
            var datas = [element.name, element.position.lat, element.position.lng];
            
            marker.bindPopup(element.name);
        })
    }  
});

// récuperation des données de l'API 
$.getJSON ("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6", function (datas) {
    console.log(datas);
    console.log("nb total de stations:" + datas.length);
    console.log("nom de la station indiqué en 2 dans le tableau datas" + datas[2].name);
}); 
