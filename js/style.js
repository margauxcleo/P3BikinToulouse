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
    var marker = L.marker([datas[200].position.lat, datas[200].position.lng]).addTo(myMap);
    marker.bindPopup(datas[200].name);
    // on initialise une station 
    /*
    var totalNbStations = datas.length;
    var stationName = datas.element.name;
    var stationLat = datas.element.position.lat;
    var stationLng = datas.element.position.lng;
    */
    /*
    fruits.forEach(function(item, index, array) {
    console.log(item, index);
    });
    */
    /*
    arrayJC.forEach(function (element) { //on utilise une fonction anonyme
        // on initialise la var marker
        console.log(element);
        var marker = L.marker([datas[200].position.lat, datas[200].position.lng]).addTo(myMap);
        marker.bindPopup(datas[200].name);
    })
    */
});
        
    
     /*
    function afficherMarqueur (reponse) {
    var infosStation = JSON.parse(reponse);
    infosStation.forEach(element => {
        var datas = [element.name, element.position.lat, element.position.lng];
        
        
    })
    */  

// récuperation des données de l'API 
$.getJSON ("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6", function (datas) {
    console.log(datas);
    var stations = [];
    $.each( datas, function( key, val ) {
        stations.push( "<li id='" + key + "'>" + val + "</li>" );
    }).appendTo("#infos_stations");
    console.log("nb total de stations:" + datas.length);
    console.log("nom de la station indiqué en 2 dans le tableau datas" + datas[2].name);
    var stationName = datas[4].name;
    /*
    var stationLat = datas.element.position.lat;
    var stationLng = datas.element.position.lng;
    */
    console.log(stationName);
    console.log(datas[200].position.lat);

    //creation en html de l'element station 

}); 

/*
// clic sur le marqueur
marker.on('click', function(event) {
    $('#infos_stations').css('display', 'block');
    $('#infos_stations').css('height', '50px'); // AR, parametre en phase test 
});

// au clic sur le marqueur, voici ce qui doit s'afficher:
// creer un element ac jquery
// EXEMPLE: jQuery(monElement).append('<div id=maDiv class=classe>Coucou</div>');

var stationName = $("#infos_stations").append('<div id=stationName> element.name </div');
var stationAddress = $("#infos_stations").append('<div id=stationAdress> element.address </div');
var stationStatus = $("#infos_stations").append('<div id=stationStatus> element.status </div');
var stationMainStands = $("#infos_stations").append('<div id=stationMainStands> element.mainStands" </div');
*/