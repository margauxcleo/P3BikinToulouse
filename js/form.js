class Form {
    constructor() {
        // de base, le form est en display block sur le block infosStation
        
        // on définit les variables le block infos station
        this.divCanvas = $('#div_canvas');
        this.form = $('#form_resa');
        this.getFirstName = $('#first_name');
        this.getLastName = $('#last_name');

        this.getAvailableBikesInfo = $('#info_available_bikes');

        this.noAvailableBikeMsg =  $('#if_no_bike_available'); 

        this.maskMap = $('#mask_map');
        this.infoConfirmationResa = $('#infos_resa');

        // on instancie la classe Canvas
        this.canvasForSign = new Canvas();

        // on ajoute le compte à rebours
        this.resaCountdown = new Timer();

        this.saveResa();   
    }
    // condition: si pas de velo, on affiche pas le formulaire de resas
    showForm(availableBikesInfo) {
        
        if (availableBikesInfo < 1) {
            this.form.css('display', 'none');
            this.noAvailableBikeMsg.css('display', 'block');
        } else {
            this.form.css('display', 'block');
            this.noAvailableBikeMsg.css('display', 'none');
        }
    }

    //stockage des données 1 = prénom 
    saveFirstName() {
        if (localStorage.getItem("first_name")) {
            // Restauration du contenu du champ
            this.getFirstName.val(localStorage.getItem("first_name"));
        }
        this.getFirstName.on("change", function() {
            // Enregistrement de la saisie utilisateur dans le stockage de session
            localStorage.setItem("first_name", this.getFirstName.val());
        });
    }
    //stockage des données 1 = nom de famille
    saveLastName() {
        if (localStorage.getItem("last_name")) {
            // Restauration du contenu du champ
            this.getLastName.val(localStorage.getItem("last_name"));
        }
        this.getLastName.on("change", function() {
            // Enregistrement de la saisie utilisateur dans le stockage de session
            localStorage.setItem("last_name", this.getLastName.val());
        });
    }
    saveResa(stationName, getFirstName, getLastName) {
        // au clic sur btn valider la resa 
        this.form.off('submit');
        this.form.on('submit', (e) => {
            e.preventDefault(); // pour arrêter le comportement normal de submit 
            console.log("ok pour click sur btn");
            // mettre en place le session storage
            sessionStorage.setItem('canvas', this.canvasForSign.context.val());
            //remettre le compte à rebours à 0
            clearInterval(this.resaCountdown.timerAnim);
            // Afficher le message de confirmation 
            this.showConfirmation(stationName, getFirstName, getLastName    );
            //appeler le timer de l'instanciation
            this.resaCountdown.setTimer();
        });  
    }
    showConfirmation(stationName, getFirstName, getLastName) {
        //Afficher le message d'info
        this.maskMap.css('display', 'block');
        this.infoConfirmationResa.css('display', 'block');
        this.infoConfirmationResa.append("<p> Vélo réservé à la station" + station_name + "au nom de" + firstName + lastName + "</p>");
        this.infoConfirmationResa.append("Temps restant: ");         
    }
}

     