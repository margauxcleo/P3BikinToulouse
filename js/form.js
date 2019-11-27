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