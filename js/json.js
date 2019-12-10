class JsonCall {
    getJson(callBack) {
        // INFO = récuperation des données de l'API 
        var req = $.getJSON ("https://api.jcdecaux.com/vls/v1/stations?contract=Toulouse&apiKey=c3dd05a552e530b07e97fa7db3d8fa095a6578b6", function (datas) {   
            callBack(datas);
        }); 
    }    
}

