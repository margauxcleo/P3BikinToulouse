class Timer {
    constructor() {
        this.timerBlock = $('#timer');
        this.timeOut = $('#timeOut');
        this.infoResaOn = $('#infosResaOn');
        this.cancelledResaMsg = $('#cancelledResaMsg');
    }

	setTimer() {
        this.finishTime = new Date().getTime() + 1200000; //1200000 20 minutes !!!!!! pour le process mit à 2 mn
        sessionStorage.setItem("reloadedFinishTime", this.finishTime);

        this.timerAnim = setInterval( () => {
            this.now = new Date().getTime(); // on récupère l'heure de l'utilisateur

            this.remainingTime = this.finishTime - this.now;
            sessionStorage.setItem("remainingTime", this.remainingTime);

            // si remaining time, récupérer le remaining time session storage et faire le calcul 

            this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);

            // Afficher le résultat dans l'élément timer du DOM
            this.showTimer();

            // Si le compte à rebours est fini : afficher le texte
            this.checkRemainingTime();

        }, 999); // toutes les secondes 
    };
    showTimer() {
        // Afficher le résultat dans l'élément timer du DOM
        this.timerBlock.html(this.minutes +" mn " + this.seconds + " s");
    }
    getTimer() {
        // condition si compte à rebours déjà définit 
        if (sessionStorage.getItem("reloadedFinishTime") != null) {
            this.finishTime = parseInt(sessionStorage.getItem("reloadedFinishTime"));
            this.timerAnim = setInterval( () => {
                this.now = new Date().getTime(); // on récupère l'heure de l'utilisateur

                // si remaining time, récupérer le remaining time session storage et faire le calcul
                this.remainingTime = this.finishTime - this.now; 

                this.minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
                this.seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);

                // Afficher le résultat dans l'élément timer du DOM
                
                this.showTimer();

                this.checkRemainingTime();
                  
            }, 999); // toutes les secondes
        }   
    }
    clearAnim() {
        clearInterval(this.timerAnim); 
    }
    checkRemainingTime() {
        // Si le compte à rebours est fini : afficher le texte
        if (this.remainingTime < 0) {
            // on arrête le compte à rebours
            this.clearAnim();
            // on cache la confirm de résa
            this.infoResaOn.css('display', 'none'); 
            this.cancelledResaMsg.css('display', 'none')
            this.timeOut.css('display', 'flex');
            //vider la partie session storage
            sessionStorage.clear();
        } 
    }
}