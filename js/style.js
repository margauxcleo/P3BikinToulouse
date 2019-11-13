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
            $('#infos_stations').html("");
            $('#infos_stations').css('display', 'flex');
            $('#infos_stations').append('<div id=title_info> </div>');
                $('#title_info').append('<h2 id=stationName>' + station.name + '</h2>');
                /*
                $('#stationName').html(station.name);
                */
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
            $('#infos_stations').append('<form id=form_resa name=bikin_form> <h3 id=form_title> Formulaire de réservation </h3> </form');
                $('#form_resa').append('<div class="form-group"> <label for=first_name> Votre prénom </label> <input type=text class="form-control" id=first_name name=first_name/> </div>');
                $('#form_resa').append('<div class="form-group"> <label for=last_name> Votre nom </label> <input type=text class="form-control" id=last_name name=last_name/> </div>');
                $('#form_resa').append('<canvas id=canvas> </canvas><br/>');
                $('#form_resa').append('<button type="submit" class="btn btn-primary">Submit</button>');

        
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

            var canvas  = $('#canvas');
            var context = canvas.getContext('2d');



            /*
            Toutes le fonctions ci-dessous peuvent être optimisées
            elles sont même volontairement non optimisées
            Elles sont là juste pour vous présenter le concept à vous de les améliorer 
            */
            //code récupéré 
            /*
            function moveDrawligne(oEvent){ 
              var oCanvas = oEvent.currentTarget,
                  oCtx = null, oPos = null;
              if(oCanvas.bDraw ==false){
                return false;
              }//if
              oPos = getPosition(oEvent, oCanvas);
              oCtx = oCanvas.getContext('2d');
              
              //dessine
              oCtx.strokeStyle = '#000000';
              oCtx.lineWidth = 3;
              oCtx.beginPath(); 
              oCtx.moveTo((oCanvas.posX), oCanvas.posY);
              oCtx.lineTo(oPos.posX, oPos.posY);
              oCtx.stroke();
              
              oCanvas.posX = oPos.posX;
              oCanvas.posY = oPos.posY; 
            } //fct

            function getPosition(oEvent, oCanvas){
              var oRect = oCanvas.getBoundingClientRect(),
                  oEventEle = oEvent.changedTouches? oEvent.changedTouches[0]:oEvent;
              return {
                posX : (oEventEle.clientX - oRect.left) / (oRect.right - oRect.left) * oCanvas.width,
                posY : (oEventEle.clientY - oRect.top) / (oRect.bottom - oRect.top) * oCanvas.height
              };//
            }//fct

            function downDrawligne(oEvent){ 
              oEvent.preventDefault(); 
              var  oCanvas = oEvent.currentTarget,
                  oPos = getPosition(oEvent, oCanvas);
              oCanvas.posX = oPos.posX;
              oCanvas.posY = oPos.posY;
              oCanvas.bDraw = true;
              capturer(false);
            }//fct

            function upDrawligne(oEvent){
              var oCanvas = oEvent.currentTarget;
              oCanvas.bDraw = false; 
              capturer(true);
            }//fct

            function initCanvas(){
              var oCanvas = document.getElementById("canvas");
              oCanvas.bDraw = false;
              oCanvas.width = 200 ;
              oCanvas.height = 150;
              oCtx = oCanvas.getContext('2d'); 
              oCanvas.addEventListener("mousedown", downDrawligne);
              oCanvas.addEventListener("mouseup", upDrawligne);
              oCanvas.addEventListener("mousemove", moveDrawligne);
              oCanvas.addEventListener("touchstart", downDrawligne);
              oCanvas.addEventListener("touchend", upDrawligne);
              oCanvas.addEventListener("touchmove", moveDrawligne); 
            }//fct

            /**
              * Récupère le canva sous forme d'image 
              * si l'image des plus grande que le canvas
              * c'est que vous avez oublié de presiser la taille du canva en javascript
              * oCanvas.width = 200 ;
              * oCanvas.height = 150;
        
            function capturer(bAction){
              var oCapture = document.getElementById("capture");
              oCapture.innerHTML = '';
              if(bAction == true){ 
                var oImage = document.createElement('img'),
                    oCanvas = document.getElementById("canvas");
                oImage.src = oCanvas.toDataURL("image/png");
                oCapture.appendChild(oImage);
              }//if
            }//fct

            
              //Vide les dessin du canvas
              
            function nettoyer(oEvent){
              var  oCanvas = document.getElementById("canvas"),
                  oCtx = oCanvas.getContext('2d');
              oCtx.clearRect(0,0,oCanvas.width,oCanvas.height); 
              capturer(false);
            }//fct

            document.addEventListener('DOMContentLoaded',function(){
              initCanvas();
              document.getElementById("bt-clear").addEventListener("click", nettoyer); 
            });

            // fin code récupéré 
            */

                       
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