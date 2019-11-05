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
    play.css('position', 'absolute')
    .css('bottom', '0')
    .css('left', '0')
    .css('right', '0')
    .css('display', 'flex')
    .css('justify-content', 'center')
    .css('align-items', 'flex-end');
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
    myMap = L.map('map_id').setView([43.600000, 1.433333], 11);
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
    /*
    var marker = L.marker([stationLat, stationLng]).addTo(myMap);
    marker.bindPopup(stationName);
    */
});
  

// récuperation des données de l'API 
$.getJSON ("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6", function (datas) {
    var stations = datas;
    console.log(stations); 

    //Gestion des popups. On boucle sur les données contenues dans le fichier json
    for ( var i=0; i < stations.length; i++ )
    {
        var marker = L.marker([stations[i].position.lat, stations[i].position.lng]).addTo(myMap);
        /*
        .bindPopup('<b>' + stations[i].name + '</b>' + '<p> Statut :' + stations[i].status + '</p>').addTo(myMap);
        */       
    }

    // CE QU'ON VEUT FAIRE
        // pour chaque marqueur, au clic, on veut que le volet d'info de la station s'affiche.
            // clic => récuperer l'index de la station => COMMENT ??? 
    /*
    // TEST 1 AFFICHER INFO STATION
    for ( i = 5; i < stations.length; i++ ) {
        $('.leaflet-marker-icon').on('click', function(e) {
            $('#infos_stations').css('display', 'block');
            $('#infos_stations').append('<h2 id=stationName>' + stations[5].name + '</h2>');
            $('#infos_stations').append('<p id=stationAdress>Adresse de la station : ' + stations[5].address + '</p>');
            $('#infos_stations').append('<p id=stationStatus>' + stations[5].status + '</p>');
            $('#infos_stations').append('<div id=available_bikes>Nombre de vélos disponibles:' + stations[5].available_bikes + '</div>');
            $('#infos_stations').append('<div id=available_bike_stands>Nombre d\'emplacements disponibles' + stations[5].available_bike_stands + '</div>');
        }); 
    }
    /*

    //TEST 2 AFFICHER INFO STATION 
    /*
    $('.leaflet-marker-icon').each(function (index) {
        $('.leaflet-marker-icon').on('click', function(e) {
            $('#infos_stations').css('display', 'block');
            $('#infos_stations').append('<h2 id=stationName>' + stations[i].name + '</h2>');
            $('#infos_stations').append('<p id=stationAdress>' + stations[i].address + '</p>');
            $('#infos_stations').append('<p id=stationStatus>' + stations[i].status + '</p>');
            $('#infos_stations').append('<div id=stationMainStands>' + stations[i].mainStands + '</div>');
        });
    })
    */

    // TEST 3 AFFICHER INFO STATION 
    stations.forEach(station => {
        $('.leaflet-marker-icon').on('click', function(e) {
            $('#infos_stations').css('display', 'block');
            $('#infos_stations').append('<h2 id=stationName>' + station.name + '</h2>');
            $('#infos_stations').append('<p id=stationAdress>Adresse de la station : ' + station.address + '</p>');
            $('#infos_stations').append('<p id=stationStatus>' + station.status + '</p>');
            $('#infos_stations').append('<div id=available_bikes>Nombre de vélos disponibles:' + station.available_bikes + '</div>');
            $('#infos_stations').append('<div id=available_bike_stands>Nombre d\'emplacements disponibles' + station.available_bike_stands + '</div>');
        });
    })

    // au clic sur le marqueur de la station 
    

        /* // TEST 2 - NE FONCTIONNE PAS 
        // ou autre facon de faire pour que le volet d'info soit caché quand on reclique sur le marqueur
        function getStationInfos(e) {
            $('#infos_stations').css('display', 'block');
            $('#infos_stations').append('<h2 id=stationName>' + stations[i].name + '</h2>');
            $('#infos_stations').append('<p id=stationAdress>' + stations[i].address + '</p>');
            $('#infos_stations').append('<p id=stationStatus>' + stations[i].status + 'element.status </p>');
            $('#infos_stations').append('<div id=stationMainStands>' + stations[i].mainStands + '</div>');
        }

        marker.on('click', getStationInfos);
        marker.off('click', getStationInfos);
        */ // FIN TEST 2 
    
    
}); 

//TEST pour remplacement du pop up par un hover 
/*
station[i].on('mouseover', station[i].openPopup.bindPopup('<b>' + stations[i].name + '</b>' + '<p> Statut :' + stations[i].status + '</p>')).addTo(myMap);
*/




//creation en html de l'element station 
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