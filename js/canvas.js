//Fonctionnement du canvas
class Canvas {
    constructor () {
        this.canvas = $('#canvas')[0];
        this.color = "#ff7077";
        this.lineWidth=3; //definit la largeur du trait
        this.context = this.canvas.getContext('2d');
        this.context.canvas.width = 200;
        this.context.canvas.height = 100;
        this.context.clearRect(0, 0, 200, 100);//canvas vierge
        this.context.lineWidth = this.lineWidth;
        this.isClicking = false;
        this.initEvent();        
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
            var clientRect = this.canvas.getBoundingClientRect();
            var clientX = clientRect.top;
            var clientY = clientRect.left;
            e.offsetX = e.targetTouches[0].pageX - clientX;
            e.offsetY = e.targetTouches[0].pageY - clientY;
            this.deplacement(e); 
            console.log('touchmove', e);         
        });

        this.canvas.addEventListener("touchend", (e) => {          
            this.relache(); 
            console.log('touchend', e);         
        });
    };  
}

let canvasSign = new Canvas();

// vider le contexte du canvas
$('#buttonClear').on('click', function (e) {
    console.log("appuie sur btn annuler");
    canvasSign.context.clearRect(0, 0, 200, 100);
});

//fermer le canvas et revenir au volet
$('#close_canvas_cross').on('click', function(e) {
    $('#div_canvas').css('display', 'none');
    $('#mask_infos_stations').css('display', 'none');    
});