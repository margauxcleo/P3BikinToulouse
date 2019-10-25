$(document).ready(function(){
    
var slider = $('#slider'), // on cible le bloc du carrousel
    img = $('#slider img'), // on cible les images contenues dans le carrousel
    indexImg = img.length - 1, // on définit l'index du dernier élément
    i = 0, // on initialise un compteur
    currentImg = img.eq(i); // enfin, on cible l'image courante, qui possède l'index i (0 pour l'instant)

img.css('display', 'none'); // on cache les images
currentImg.css('display', 'block'); // on affiche seulement l'image courante

/* $slider.append('<div class="controls"> <span class="prev">Precedent</span> <span class="next">Suivant</span> </div>');
*/
var next = $('#slider_next');
var prev = $('#slider_prev');

// clic droit / next 

next.on('click', function(event) {

    i++; // on incrémente le compteur
    console.log(i);

    if( i <= indexImg ){
        img.css('display', 'none'); // on cache les images
        currentImg = img.eq(i); // on définit la nouvelle image
        currentImg.css('display', 'block'); // puis on l'affiche
    }
    else {
        i = 0;
        img.css('display', 'none'); // on cache les images
        currentImg = img.eq(i); // on définit la nouvelle image
        currentImg.css('display', 'block'); // puis on l'affiche
    } 
});

// clic gauche / prev 

prev.on('click', function(event) {

    i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"
    console.log(i);

    if( i >= 0 ){
        img.css('display', 'none');
        currentImg = img.eq(i);
        currentImg.css('display', 'block');
    }
    else{
        i = indexImg;
        img.css('display', 'none'); // on cache les images
        currentImg = img.eq(i); // on définit la nouvelle image
        currentImg.css('display', 'block'); // puis on l'affiche
    }
});

// touche clavier next et prev

/*
$(window).keydown(function(e){

    switch (e.keyCode) {

        case 37: // flèche gauche
        i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"

        if( i >= 0 ){
            img.css('display', 'none');
            currentImg = img.eq(i);
            currentImg.css('display', 'block');
        }
        else{
            i = 0;
        }
        break;

        case 39: // flèche droite
        i++; // on incrémente le compteur
        if( i <= indexImg ){
            img.css('display', 'none'); // on cache les images
            currentImg = img.eq(i); // on définit la nouvelle image
            currentImg.css('display', 'block'); // puis on l'affiche
        }
        else{
            i = indexImg;
        } 
        break;
    }
});
*/


// changement auto de slide 

function slideImg(){
    setTimeout(function(){ // on utilise une fonction anonyme
						
        if(i < indexImg){ // si le compteur est inférieur au dernier index
	    i++; // on l'incrémente
	}
	else { // sinon, on le remet à 0 (première image)
	    i = 0;
	}

	img.css('display', 'none');

	currentImg = img.eq(i);
	currentImg.css('display', 'block');

	slideImg(); // on oublie pas de relancer la fonction à la fin

    }, 5000); // on définit l'intervalle à 5000 millisecondes (5s)
}

slideImg(); // enfin, on lance la fonction une première fois

});

//mettre en pause l'animation 

// pause et play : chgt d'icone au clic 

var play = $('#play');
var pause = $('#pause');

play.on('click', function(event) {
    pause.css('display', 'block');  
    play.css('display', 'none');
});

pause.on('click', function(event) {
    play.css('display', 'block');
    pause.css('display', 'none');
});

// utilsation setInterval & clear

var control = setInterval(slideImg, );

// Mettre le clic on play ici ???? 