class Timer {
    constructor() {
        this.timerBlock = $('#timer');
        this.timeOut = $('#timeOut');
    }

	setTimer() {
        this.finishTime = new Date().getTime() + 1200000; //20 minutes

        this.timerAnim = setInterval( () => {
            this.now = new Date().getTime(); // on récupère l'heure de l'utilisateur
            sessionStorage.setItem("setTime", this.now);

            if (sessionStorage.getItem("setTime", this.now)) {
                this.remainingTime = this.finishTime - sessionStorage.getItem("setTime", this.now);
            } else {
                this.remainingTime = this.finishTime - this.now;
                console.log(this.remainingTime);
            }

            sessionStorage.setItem("remainingTime", this.remainingTime);

            // this.timerBlock = $('#timer');
            // si remaining time, récupérer le remaining time session storage et faire le calcul 

            this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
            /*
            sessionStorage.setItem("remainingMinutes", minutes);
            sessionStorage.setItem("remainingSeconds", seconds);
            */
            // Afficher le résultat dans l'élément timer du DOM
            this.timerBlock.html(this.minutes +" mn " + this.seconds + " s");

            // Si le compte à rebours est fini : afficher le texte
            if (this.remainingTime < 0) {
                clearInterval(this.timerAnim); // on arrête le compte à rebours
                this.timeOut.css('display', 'block');
                this.timerBlock.css('display', 'none');
            }
        }, 999); // toutes les secondes 
    };
    getExistingTimer() {
        this.timerAnim
    }
    /*
    getExistingTimer() {
        this.getStationName.html(sessionStorage.getItem("remainingMinutes"));
        this.getStationName.html(sessionStorage.getItem("remainingSeconds"));
        this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
    };

    relauchTimer() {
        this.timerAnim = setInterval( () => {
            this.now = new Date().getTime(); // on récupère l'heure de l'utilisateur

            // remaining time = temps enregistré en session - now 
            this.remainingTime = sessionStorage.getItem("remainingTime") - (this.finishTime - this.now);
            sessionStorage.setItem("remainingTime", this.remainingTime);

            // this.timerBlock = $('#timer');
            // si remaining time, récupérer le remaining time session storage et faire le calcul 

            this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
            
            // Afficher le résultat dans l'élément timer du DOM
            this.timerBlock.html(this.minutes +" mn " + this.seconds + " s");

            // Si le compte à rebours est fini : afficher le texte
            if (this.remainingTime < 0) {
                clearInterval(this.timerAnim); // on arrête le compte à rebours
                this.timeOut.css('display', 'block');
                this.timerBlock.css('display', 'none');
            }
        }, 999); // toutes les secondes
    }
    */
}