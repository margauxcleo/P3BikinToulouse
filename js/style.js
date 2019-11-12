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
    myMap = L.map('map_id').setView([43.600000, 1.433333], 14);
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

// INFO = appel de la fonction getMap qd HTML chargé 
$(document).ready(function () {
    console.log("in ready");
    getMap();
    /*
    var marker = L.marker([stationLat, stationLng]).addTo(myMap);
    marker.bindPopup(stationName);
    */
});
  

// INFO = récuperation des données de l'API 
$.getJSON ("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6", function (datas) {
    var stations = datas;
    console.log(stations); 

    // INFO = on boucle sur les données contenues dans le fichier json
    stations.forEach(function(station) {
        
        // creer 2 icones
        // si station = OPEN 
        var openMarker = L.divIcon({
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [20, 20],
            className: 'open_marker'
        });

        // si station = CLOSED
        var closedMarker = L.divIcon({
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [20, 20],
            className: 'closed_marker'
        });

        // mettre conditions pour type icones
        if (station.status === 'OPEN') {
            var marker = L.marker([station.position.lat, station.position.lng], {icon: openMarker}).addTo(myMap);
        } else {
            marker = L.marker([station.position.lat, station.position.lng], {icon: closedMarker}).addTo(myMap);
        }

        // A CONSERVER = > FONCTIONNE 
        /*
        // INFO = MARKER SUR CHAQUE STATION  
        var marker = L.marker([station.position.lat, station.position.lng]).addTo(myMap);
        /*
        .bindPopup('<b>' + stations[i].name + '</b>' + '<p> Statut :' + stations[i].status + '</p>').addTo(myMap);
        */

        

        // INFO = VOLET STATION 
        marker.bindPopup("<b>" + station.name + "</b>");

        marker.on('click', function(e) {
            marker.openPopup();
            $('#infos_stations').html("");
            $('#infos_stations').css('display', 'flex');
            $('#infos_stations').css('flex-direction', 'column');
            $('#infos_stations').css('justify-content', 'flex-start');
            $('#infos_stations').css('align-items', 'flex-start');
            $('#infos_stations').append('<div id=title_info> </div>');
                $('#title_info').append('<h2 id=stationName>' + station.name + '</h2>');
                $('#title_info').append('<span> <i class="fas fa-times-circle"></i> </span>');
            if (station.status === 'OPEN') {
                $('#infos_stations').append('<p id=stationStatusOpen> Statut: ouverte </p>');
            } else {
                $('#infos_stations').append('<p id=stationStatusClosed> Statut: fermée. Indisponible à la location. </p>');
            }
            $('#infos_stations').append('<p id=stationAdress> <span> <i class="fas fa-location-arrow"></i> </span> Adresse de la station : ' + station.address + '</p>');
            $('#infos_stations').append('<p id=available_bikes> Vélos disponibles: <span class="badge badge-primary"> <span><i class="fas fa-biking"></i></span> ' + station.available_bikes + '</span></p>');
            $('#infos_stations').append('<p id=available_bike_stands> Emplacements disponibles: <span class="badge badge-secondary"> <span><i class="fas fa-parking"></i></span> ' + station.available_bike_stands + '</span></p>');
            // form 
            $('#infos_stations').append('<form id=form_resa> </form');
                $('#form_resa').append('<div class="form-group"> <label for=first_name> Votre prénom </label> <input type=text class="form-control" id=first_name/> </div>');
                $('#form_resa').append('<div class="form-group"> <label for=last_name> Votre nom </label> <input type=text class="form-control" id=last_name/> </div>');
        
            // fermeture manuelle du volet info station 
            var closeInfos = $('#close_infos_cross');
            closeInfos.on('click', function(e) {
                $('#infos_stations').css('display', 'none');
            });

        }); 

           
        // FAIRE ICI le mouseover sur le marker
        // POP UP en MOUSEOVER => ne fonctionne pas, à voir ensemble. 
        marker.on('mouseover', function (e) {
            marker.openPopup();
        });
        marker.on('mouseout', function (e) {
            marker.closePopup();
        });
              
    }); 
});    