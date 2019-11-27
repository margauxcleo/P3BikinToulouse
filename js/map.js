// LEAF LET = MAP 

// appel AJAX
    // constructor
    // les stations 
    //getMap = methode 
class myMap {
    constructor () {
        this.name = myMap;
        var myMap = this.name;
        this.getMap();
    }
    getMap() {
        this.myMap = L.map('map_id').setView([43.600000, 1.433333], 14);

        this.mapBox = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyZ2F1eC12aXRleiIsImEiOiJjazJkMm14NDIwYmY3M25xYmFrcTh0OXNkIn0.vCdPdFrZ20BKHoHGx-xy9g', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'your.mapbox.access.token'
        }).addTo(myMap);
    }
    whenReady() {
        // INFO = appel de la fonction getMap qd HTML chargé 
        $(document).ready(function () {
            getMap();
        /*
        var marker = L.marker([stationLat, stationLng]).addTo(myMap);
        marker.bindPopup(stationName);
        */
        });
    }
    getJson() {
        // INFO = récuperation des données de l'API 
        $.getJSON ("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6", function (datas) {
            var stations = datas;
            console.log(stations);
        }
        this.getStation();

    }
    setMarkers() {
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
    }

}


  

 

    // INFO = on boucle sur les données contenues dans le fichier json
    
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