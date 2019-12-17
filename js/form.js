class Form {
    constructor() {
        // de base, le form est en display block sur le block infosStation
        
        // on définit les variables le block infos station
        this.divCanvas = $('#div_canvas');
        this.form = $('#form_resa');
        this.getFirstName = $('#first_name');
        this.getLastName = $('#last_name');
        this.firstNameResaOn = $('#first_name_resa');
        this.lastNameResaOn = $('#last_name_resa');
        this.getStationName = $('.station_name');
        this.infoResaOn = $('#infosResaOn');

        this.getAvailableBikesInfo = $('#info_available_bikes');
        this.noAvailableBikeMsg =  $('#if_no_bike_available'); 

        this.maskMap = $('#mask_map');
        this.infoConfirmationResa = $('#infos_resa');

        this.cancelResaBtn = $('#buttonCancelledResa');
        this.cancelledResaMsg = $('#cancelledResaMsg');
        this.canvasErrorMsg = $('#canvas_error_msg');

        // on instancie la classe Canvas
        this.canvasForSign = new Canvas();

        // on ajoute le compte à rebours
        this.resaCountdown = new Timer();
        this.timerBlock = $('#timer');

        this.saveResa();
        this.checkResa();  
        this.cancelResa(); 
    }
    checkResa() {
        if (sessionStorage.getItem("remainingTime")) {
            this.showConfirmation();
        } 
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
        this.getFirstName.on("change", () => {
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
        this.getLastName.on("change", () => {
            // Enregistrement de la saisie utilisateur dans le stockage de session
            localStorage.setItem("last_name", this.getLastName.val());
        });
    }
    saveResa() {
        // au clic sur btn valider la resa 
        this.form.off('submit');
        this.form.on('submit', (e) => {
            e.preventDefault(); // pour arrêter le comportement normal de submit 
            // condition pour vérifier que le canvas a été signé
            if (this.canvasForSign.getCanvas().toDataURL() == "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAACnklEQVR4Xu3VsRHAMAzEsHj/pTOBXbB9pFchyLycz0eAwFXgsCFA4C4gEK+DwENAIJ4HAYF4AwSagD9IczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpEQCAjh7ZmExBIczM1IiCQkUNbswkIpLmZGhEQyMihrdkEBNLcTI0ICGTk0NZsAgJpbqZGBAQycmhrNgGBNDdTIwICGTm0NZuAQJqbqREBgYwc2ppNQCDNzdSIgEBGDm3NJiCQ5mZqREAgI4e2ZhMQSHMzNSIgkJFDW7MJCKS5mRoREMjIoa3ZBATS3EyNCAhk5NDWbAICaW6mRgQEMnJoazYBgTQ3UyMCAhk5tDWbgECam6kRAYGMHNqaTUAgzc3UiIBARg5tzSYgkOZmakRAICOHtmYTEEhzMzUiIJCRQ1uzCQikuZkaERDIyKGt2QQE0txMjQgIZOTQ1mwCAmlupkYEBDJyaGs2AYE0N1MjAgIZObQ1m4BAmpupEQGBjBzamk1AIM3N1IiAQEYObc0mIJDmZmpE4Af1gABlH0hlGgAAAABJRU5ErkJggg==") {
                console.log("le canvas est vide");
                this.canvasErrorMsg.css('display', 'block');
            } else {
                //cacher le msg d'erreur
                this.canvasErrorMsg.css('display', 'none');
                // mettre en place le session storage
                sessionStorage.setItem('canvas', this.canvasForSign.getCanvas().toDataURL()); // retourne contenu img en base 64 
                //remettre le compte à rebours à 0
                clearInterval(this.resaCountdown.timerAnim);
                // Afficher le message de confirmation 
                this.showConfirmation();
            }
        });  
    }
    showConfirmation() {
        //Afficher le message d'info
        this.maskMap.css('display', 'block');
        this.infoConfirmationResa.css('display','flex');
        this.getStationName.html(sessionStorage.getItem("stationName"));
        this.firstNameResaOn.html(localStorage.getItem("first_name"));
        this.lastNameResaOn.html(localStorage.getItem("last_name"));
        
        //appeler le timer de l'instanciation
        this.resaCountdown.setTimer();        
    }
    cancelResa() {
        this.cancelResaBtn.on('click', (e) => {
            this.infoResaOn.css('display', 'none');
            this.cancelledResaMsg.css('display', 'block');
            // on arrête le compte à rebours
            this.resaCountdown.clearAnim();
            //vider la partie session storage
            sessionStorage.clear();
        });
    }
}

     