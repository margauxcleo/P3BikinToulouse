class Timer {
	constructor() {
		this.setTimer(); // on appele la fonction pr l'excecuter
	}
	setTimer () {
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
}