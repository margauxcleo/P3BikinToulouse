class Timer {
	setTimer () {
        this.finishTime = new Date().getTime() + 1200000; //20 minutes
        console.log(finishTime);

        this.timerAnim = setInterval( () => {
            let now = new Date().getTime(); // on récupère l'heure de l'utilisateur

            let remainingTime = finishTime - now; 

            let timerBlock = $('#timer');
            let cancelled = $('#cancelledResa');
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            // Afficher le résultat dans l'élément timer du DOM
            timerBlock.html(minutes +" mn " + seconds + " s");

            // Si le compte à rebours est fini : afficher le texte
            if (remainingTime < 0) {
                clearInterval(timerAnim); // on arrête le compte à rebours
                cancelled.css('display', 'block');
                timerBlock.css('display', 'none');
            }
        }, 999); // toutes les secondes 
    };
}