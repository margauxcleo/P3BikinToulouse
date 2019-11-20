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
            /*
            // on efface le contenu d'une autre station 
            $('#station_name').html("");
            $('#station_address').html("");
            $('#available_bikes').html("");
            $('#available_bike_stands').html("");
            */
            var openSign = $('#btn-form-1');
            var divCanvas = $('#div_canvas');
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

            // Écoute des changements de valeur du champ
            firstName.on("change", function() {
                // Enregistrement de la saisie utilisateur dans le stockage de session
                localStorage.setItem("first_name", firstName.val());
            });

            //last 
            if (localStorage.getItem("last_name")) {
                // Restauration du contenu du champ
                lastName.val(localStorage.getItem("last_name"));
            }

            // Écoute des changements de valeur du champ
            lastName.on("change", function() {
                // Enregistrement de la saisie utilisateur dans le stockage de session
                localStorage.setItem("last_name", lastName.val());
            });


            // CANVAS
            //Affichage du canvas 
            openSign.on('click', function (e) {
                divCanvas.css('display', 'flex');
                $('#mask_infos_stations').css('display', 'block');
            });
            //Fonctionnement du canvas
            class Canvas {
                constructor () {
                    this.canvas = $('#canvas')[0];
                    this.color = "#ff7077";
                    this.lineWidth=3; //definit la largeur du trait
                    this.context = this.canvas.getContext('2d');
                    this.context.canvas.width = 200;
                    this.context.canvas.height = 100;
                    this.context.clearRect(0, 0, 200, 100);//canvas vierge
                    this.context.lineWidth = this.lineWidth;
                    this.isClicking = false;
                    this.initEvent();        
                }
                deplacement(e) {

                    if(this.isClicking === true){
                        this.context.lineTo(e.offsetX, e.offsetY);
                        this.context.stroke();          
                        this.context.beginPath();
                        this.context.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI*2);/*defini le 1er point en forme de cercle à chaque clic*/
                        this.context.fill();/*rempli le cercle*/
                        this.context.beginPath();
                        this.context.moveTo(e.offsetX, e.offsetY);          
                    } 
                }     
                appuie(e){      
                    this.isClicking = true;
                    this.deplacement(e);
                }

                relache(){
                    this.isClicking = false;      
                    this.context.beginPath();/*se desengage du chemin precedent*/
                }

                initEvent(){
                    this.canvas.addEventListener("mousedown", (e) => {          
                        this.appuie(e);
                    });

                    this.canvas.addEventListener("mousemove", (e) => {
                        this.deplacement(e);          
                    });

                    this.canvas.addEventListener("mouseup", (e) => {          
                        this.relache();          
                    });
                    this.canvas.addEventListener("touchstart", (e) => {          
                        this.appuie(e);
                        console.log('touchstart', e);
                    });

                    this.canvas.addEventListener("touchmove", (e) => {
                        var clientRect = this.canvas.getBoundingClientRect();
                        var clientX = clientRect.top;
                        var clientY = clientRect.left;
                        e.offsetX = e.targetTouches[0].pageX - clientX;
                        e.offsetY = e.targetTouches[0].pageY - clientY;
                        this.deplacement(e); 
                        console.log('touchmove', e);         
                    });

                    this.canvas.addEventListener("touchend", (e) => {          
                        this.relache(); 
                        console.log('touchend', e);         
                    });
                }
            };

            let canvas = new Canvas();
 
        }); 

        // POP UP en MOUSEOVER 
        marker.on('mouseover', function (e) {
            marker.openPopup();
        });
        marker.on('mouseout', function (e) {
            marker.closePopup();
        });        
    }); 
});    