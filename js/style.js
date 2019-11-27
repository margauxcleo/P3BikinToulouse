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

        // au clic, affichage du volet station 
        marker.on('click', function(e) {
            marker.openPopup();
            var openSign = $('#btn-form-1');
            var divCanvas = $('#div_canvas');
            var form = $('#form_resa');

            // on incrémente avec les infos de la station selectionnée
            $('#mask_infos_stations').css('display', 'none'); // on remet à zéro
            divCanvas.css('display', 'none'); // on remet à zéro
            $('#infos_stations').css('display', 'flex');
            $('#station_name').html(station.name);
            if (station.status === 'OPEN') {
                $('#station_status_open').css('display', 'block');
            } else {
                $('#station_status_closed').css('display', 'block');
            }
            $('#info_station_address').html(station.address);
            $('#info_available_bikes').html(station.available_bikes);
            $('#info_available_bike_stands').html(station.available_bike_stands);

            // condition: si pas de velo, on affiche pas le formulaire de resas
            if (station.available_bikes < 1) {
                form.css('display', 'none');
                $('#if_no_bike_available').css('display', 'block');
            } else {
                form.css('display', 'block');
                $('#if_no_bike_available').css('display', 'none');
            }
        
            // fermeture manuelle du volet info station 
            var closeInfos = $('#close_infos_cross');
            closeInfos.on('click', function(e) {
                $('#infos_stations').css('display', 'none');
            });

            //stockage des données 1 = prénom 
            var firstName = $('#first_name');
            var lastName = $('#last_name');

            if (localStorage.getItem("first_name")) {
                // Restauration du contenu du champ
                firstName.val(localStorage.getItem("first_name"));
            }
            firstName.on("change", function() {
                // Enregistrement de la saisie utilisateur dans le stockage de session
                localStorage.setItem("first_name", firstName.val());
            });

            //stockage des données 1 = nom de famille 
            if (localStorage.getItem("last_name")) {
                // Restauration du contenu du champ
                lastName.val(localStorage.getItem("last_name"));
            }
            lastName.on("change", function() {
                // Enregistrement de la saisie utilisateur dans le stockage de session
                localStorage.setItem("last_name", lastName.val());
            });

            // HELP - ne fonctionne pas - session storage sur canvas
            /*
            if (sessionStorage.getItem("canvas")) {
                canvasSign.val(sessionStorage.getItem("canvas"));
            };
            canvasSign.on("change", function() {
                canvasSign.setItem("canvas", canvasSign.val());
            });
            */

                 
        }); // fermeture partie volet station 
    

        // POP UP en MOUSEOVER 
        marker.on('mouseover', function (e) {
            marker.openPopup();
        });
        marker.on('mouseout', function (e) {
            marker.closePopup();
        }); 

        //Affichage du canvas 
        openSign.on('click', function (e) {
            divCanvas.css('display', 'flex');
            $('#mask_infos_stations').css('display', 'block');
        });
        

        // au clic sur btn valider la resa 
        var formResa = $('#form_resa');
        formResa.off('submit');
        formResa.on('submit', function (e) {
            e.preventDefault(); // pour arrêter le comportement normal de submit 
            console.log("ok pour click sur btn");
            $('#mask_map').css('display', 'block');
            $('#infos_resa').css('display', 'block');
            $('#infos_resa').append("<p> Vélo réservé à la station" + station_name + "au nom de" + firstName + lastName + "</p>");
            $('#infos_resa').append("Temps restant: ");  
            // on ajoute le compte à rebours
            function setTimer () {
                var finishTime = new Date().getTime() + 1200000; //20 minutes
                console.log(finishTime);

                var timer = setInterval(function() {
                    var now = new Date().getTime(); // on récupère l'heure de l'utilisateur

                    var remainingTime = finishTime - now; 

                    var timer = $('#timer');
                    var cancelled = $('#cancelledResa');
                    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                    // Afficher le résultat dans l'élément timer du DOM
                    timer.html(minutes +" mn " + seconds + " s");

                    // Si le compte à rebours est fini : afficher le texte
                    if (remainingTime < 0) {
                        clearInterval(timer); // on arrête le compte à rebours
                        cancelled.css('display', 'block');
                        timer.css('display', 'none');
                    }
                }, 999); // toutes les secondes 
            };
            setTimer(); // on appele la fonction pr l'excecuter
        });       
    }); 
});    