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


    saveResa() {
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
            let ResaTimer = new Timer();
        });  
    }
}

     