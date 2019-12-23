class Canvas {
    constructor() {
        this.canvas = $('#canvas')[0];
        this.openSign = $('#btn_form_1');
        this.divCanvas = $('#div_canvas');
        this.maskOnStationInfos = $('#mask_infos_stations');
        this.clearBtn = $('#buttonClear');
        this.closeCanvasCross = $('#close_canvas_cross');
        this.color = "#ff7077";
        this.lineWidth=3; //definit la largeur du trait
        this.context = this.canvas.getContext('2d');
        this.context.canvas.width = 200;
        this.context.canvas.height = 100;
        this.context.clearRect(0, 0, 200, 100);//canvas vierge
        this.context.lineWidth = this.lineWidth;
        this.isClicking = false;
        this.initCanvas();
        this.initEvent();
        this.clearCanvas();
        this.closeCanvas();        
    };
    initCanvas() {
        //Affichage du canvas 
        this.openSign.on('click', (e) => { // !!! voir si arrow function est efficace ici
            this.divCanvas.css('display', 'flex');
            this.maskOnStationInfos.css('display', 'block');
        });
    };
    deplacement(e) {
        if(this.isClicking === true){
            this.context.lineTo(e.offsetX, e.offsetY);
            this.context.stroke();          
            this.context.beginPath();
            this.context.arc(e.offsetX, e.offsetY, this.radius, 0, Math.PI*2);/*defini le 1er point en forme de cercle à chaque clic*/
            this.context.fill();/*rempli le cercle*/
            this.context.beginPath();
            this.context.moveTo(e.offsetX, e.offsetY);          
        } 
    };    
    appuie(e){      
        this.isClicking = true;
        this.deplacement(e);
    };

    relache(){
        this.isClicking = false;      
        this.context.beginPath();/*se desengage du chemin precedent*/
    };

    initEvent(){
        this.canvas.addEventListener("mousedown", (e) => {          
            this.appuie(e);
        });

        this.canvas.addEventListener("mousemove", (e) => {
            this.deplacement(e);          
        });

        this.canvas.addEventListener("mouseup", (e) => {          
            this.relache();          
        });
        this.canvas.addEventListener("touchstart", (e) => {          
            this.appuie(e);
            console.log('touchstart', e);
        });

        this.canvas.addEventListener("touchmove", (e) => {
            let clientRect = this.canvas.getBoundingClientRect();
            let clientX = clientRect.left;
            let clientY = clientRect.top;
            e.offsetX = e.targetTouches[0].clientX - clientX;
            e.offsetY = e.targetTouches[0].clientY - clientY;
            console.log("clientX", clientX);
            console.log("clientY", clientY);
            console.log("e.targetTouches[0].pageX", e.targetTouches[0].pageX);
            console.log("e.targetTouches[0].pageY", e.targetTouches[0].pageY);
            console.log("e.targetTouches[0].clientX", e.targetTouches[0].clientX);
            console.log("e.targetTouches[0].clientY", e.targetTouches[0].clientY);
            console.log("e.offsetX", e.offsetX);
            console.log("e.offsetY", e.offsetY);

            this.deplacement(e); 
            console.log('touchmove', e);         
        });

        this.canvas.addEventListener("touchend", (e) => {          
            this.relache(); 
            console.log('touchend', e);         
        });
    }; 

    // vider le contexte du canvas
    clearCanvas() {
        this.clearBtn.on('click', (e) => {
            this.context.clearRect(0, 0, 200, 100);
        });  
    }
    //fermer le canvas et revenir au volet
    closeCanvas() {
        this.closeCanvasCross.on('click', (e) => {
            this.divCanvas.css('display', 'none');
            this.maskOnStationInfos.css('display', 'none');    
        });
    } 
    getCanvas() {
        return this.canvas;
    }
}