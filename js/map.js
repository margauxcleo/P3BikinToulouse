class Map {
    constructor (mapId, lat, lng, zoom) {
        this.map = L.map('map_id').setView([lat, lng], zoom);
        this.tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFyZ2F1eC12aXRleiIsImEiOiJjazJkMm14NDIwYmY3M25xYmFrcTh0OXNkIn0.vCdPdFrZ20BKHoHGx-xy9g', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'your.mapbox.access.token'
        }).addTo(this.map);
        // AR => voir avec Quentin si on doit instancier la class Form ici (ne fonctionne pas!)
        this.formForResa = new Form();
        
        // on définit les variables le block infos station
        this.maskOnStationInfos = $('#mask_infos_stations');
        this.divCanvas = $('#div_canvas');
        this.form = $('#form_resa');

        this.stationInfos = $('#infos_stations');
        this.closeInfos = $('#close_infos_cross');
        this.getStationName = $('.station_name');
        this.getStationAddress = $('#info_station_address');
        this.getAvailableBikesInfo = $('#info_available_bikes');
        this.getAvailableBikeStandsInfo = $('#info_available_bike_stands');

        this.noAvailableBikeMsg =  $('#if_no_bike_available');
        this.statutOpenMsg = $('#station_status_open');
        this.statutClosedMsg = $('#station_status_closed');
    } 

    setMarkers() {
        // On boucle sur les données contenues dans le fichier json
        let request = new JsonCall(); 
        request.getJson((datas) => {
            let stations = datas;
            console.log(stations);

            stations.forEach( (station) => {
                // creer 2 icones
                // si station = OPEN 
                let openMarker = L.divIcon({
                    html: '<i class="fas fa-map-marker-alt"></i>',
                    iconSize: [20, 20],
                    className: 'open_marker'
                });
                // si station = CLOSED
                let closedMarker = L.divIcon({
                    html: '<i class="fas fa-map-marker-alt"></i>',
                    iconSize: [20, 20],
                    className: 'closed_marker'
                });

                // mettre conditions pour type icones
                let marker;
                if (station.status === 'OPEN') {
                    marker = L.marker([station.position.lat, station.position.lng], {icon: openMarker}).addTo(this.map);
                } else {
                    marker = L.marker([station.position.lat, station.position.lng], {icon: closedMarker}).addTo(this.map);
                }

                this.setMarkersPopUp(marker, station.name);
                this.getMarkersHoverOn(marker);
                // fonction non utilisée mais créé si besoin
                //this.getMarkersHoverOff(marker);
                this.setStationBlock(marker, station.name, station.status, station.address, station.available_bikes, station.available_bike_stands);
                this.closeInfosStation();             
            });
        });        
    }

    // définition pop up au clic sur le marker
    setMarkersPopUp(marker, stationName) {
        // INFO = VOLET STATION 
        marker.bindPopup("<b>" + stationName + "</b>");   
    }

    //pop up au hover sur le marker
    getMarkersHoverOn(marker) {
        marker.on('mouseover', function(e) {
            marker.openPopup();
        });
    }
    getMarkersHoverOff(marker) {
        marker.on('mouseout', function(e)  {
            marker.closePopup();
        });
    }


    // au clic sur un marker, affichage du volet station 
    setStationBlock(marker, stationName, stationStatut, stationAddress, availableBikesInfo, availableBikeStandsInfo) {
        marker.on('click', (e) => {
            // on affiche le pop up sur le marker
            //marker.bindPopup("<b>" + stationName + "</b>");
            //marker.openPopup();
        
            marker.openPopup();

            // on affiche/masque au besoin
            this.maskOnStationInfos.css('display', 'none'); // on remet à zéro
            this.divCanvas.css('display', 'none'); // on remet à zéro
            this.stationInfos.css('display', 'flex'); // on affiche la div qui contient les infos de la station

            //on incrémente avec les infos de JC DECAUX
            this.getStationName.html(stationName); // TEST on remplace station.name par stationName
            sessionStorage.setItem("stationName", stationName);
            if (stationStatut === 'OPEN') {
                this.statutOpenMsg.css('display', 'block');
            } else {
                this.statutClosedMsg.css('display', 'block');
            }
            this.getStationAddress.html(stationAddress);
            this.getAvailableBikesInfo.html(availableBikesInfo);
            this.getAvailableBikeStandsInfo.html(availableBikeStandsInfo);

            // condition affichage du formulaire
            this.formForResa.showForm(availableBikesInfo);

            this.formForResa.saveFirstName();
            this.formForResa.saveLastName(); 

            //partie réservation - affichage du message de confirmation 
            this.formForResa.saveResa();

            /*          
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
    }

    // fermeture manuelle du volet info station 
    closeInfosStation() {
        this.closeInfos.on('click', (e) => {
            this.stationInfos.css('display', 'none');
        });
    } 
}

let url = 'https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6';

// quand html est chargé, on exécute la class Map
$(document).ready(function () {
    let myMap = new Map('map_id', 43.600000, 1.433333, 14);
    myMap.setMarkers();
});
