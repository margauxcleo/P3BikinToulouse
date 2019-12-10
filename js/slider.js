class Slider {
    constructor() {
        this.next = $('#slider_next');
        this.previous = $('#slider_prev');
        this.slider = $('#bloc_slider');
        this.pause = $('#pause');
        this.play = $('#play');
        this.currentSlide = 0;
        this.totalSlide = 4;
        this.deplacement();
    }

    deplacement() {
        this.clickOnLeftArrow();
        this.clickOnRightArrow();
        this.interval();
        this.playAction();
        this.pauseAction();
        this.trigger();
    }

    clickOnLeftArrow() {
        // au clic fleche droite  
        this.next.on('click', (event) => { // permet d'acceder à la class (arrow function)
            this.currentSlide++;
            if (this.currentSlide >= this.totalSlide) {
                this.currentSlide = 0
            }
            this.slider.css("left", "-" + this.currentSlide + "00%");  
        });
    }

    clickOnRightArrow() {
        // au clic fleche gauche 
        this.previous.on('click', (event) => {
            this.currentSlide--;
            if (this.currentSlide < 0) {
                this.currentSlide = this.totalSlide - 1  
            }
            this.slider.css("left", "-" + this.currentSlide + "00%");    
        });
    }

    interval() {
        // changement auto d'image 
        this.animation = setInterval( () => {
            this.currentSlide++;
            if (this.currentSlide >= this.totalSlide) {
                this.currentSlide = 0;
            }
            this.slider.css("left", "-" + this.currentSlide + "00%");
        }, 5000 );
    }  

    playAction() {
        // si clic sur pause 
        // clear interval pour stopper le setInterval 
        this.pause.on('click', (event) => {
            clearInterval(this.animation);
            this.pause.css('display', 'none');
            // AR 
            this.play.css('position', 'absolute')
            .css('bottom', '0')
            .css('left', '0')
            .css('right', '0')
            .css('display', 'flex')
            .css('justify-content', 'center')
            .css('align-items', 'flex-end');
        });
    }

    pauseAction() {
        // si clic sur play 
        // on relance le setInterval 
        this.play.on('click', (event) => {
            this.animation = setInterval( ()=> {
                this.currentSlide++; 
                if (this.currentSlide >= this.totalSlide) {
                    this.currentSlide = 0;
                }
                this.slider.css("left", "-" + this.currentSlide + "00%");
            }, 5000 );
            this.play.css('display', 'none');
            this.pause.css('position', 'absolute')
            .css('bottom', '0')
            .css('left', '0')
            .css('right', '0')
            .css('display', 'flex')
            .css('justify-content', 'center')
            .css('align-items', 'flex-end');
        });
    }

    trigger() {
        let arrowID = 0;

        document.addEventListener('keydown', (event) => {
            arrowID = event.which; // on recupere le numero de la touche
            if (arrowID === 39) {
                this.next.trigger('click');
            } else if (arrowID === 37) {
                this.previous.trigger('click');
            } else {
                console.log("erreur" + arrowID);
            }
            /* 
            CONSERVER pour info / fonctionne aussi 
            switch (arrowID) {
                case 39:
                    next.trigger('click')
                    break;
                case 37:
                    previous.trigger('click')
                    break;
                default:
                    consoe.log("erreur");
            }
            */
        });   
    }
} 

let headerSlider = new Slider();  






