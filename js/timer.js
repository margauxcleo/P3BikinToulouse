class Timer {
	setTimer () {
        this.finishTime = new Date().getTime() + 1200000; //20 minutes
        console.log(this.finishTime);

        this.timerAnim = setInterval( () => {
            let now = new Date().getTime(); // on récupère l'heure de l'utilisateur

            let remainingTime = this.finishTime - now;
            sessionStorage.setItem("remainingTime", remainingTime);

            this.timerBlock = $('#timer');
            let timeOut = $('#timeOut');
            let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            // Afficher le résultat dans l'élément timer du DOM
            this.timerBlock.html(minutes +" mn " + seconds + " s");

            // Si le compte à rebours est fini : afficher le texte
            if (remainingTime < 0) {
                clearInterval(this.timerAnim); // on arrête le compte à rebours
                timeOut.css('display', 'block');
                this.timerBlock.css('display', 'none');
            }
        }, 999); // toutes les secondes 
    };
}