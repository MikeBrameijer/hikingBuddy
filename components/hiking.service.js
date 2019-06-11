function HikingService($http, $q) {
    const service = this;
    console.log("hello");
    service.favoriteArray = [];

    service.key = '200488347-7449e5616f0f75c446c24d3c0da3ba39';
    service.geoKey = 'AIzaSyAzWLrTiTrHUeTKCGNNpPkFLVrJ-ncycK0';

    service.getTrails = (locationLat, localtionLon) => {
        let url = 'https://www.hikingproject.com/data/get-trails';
        let apiParam = {
            lat: locationLat,
            lon: localtionLon,
            key: service.key
        }

        return $q(function (resolve, reject) {
            $http({
                url: url,
                method: 'GET',
                params: apiParam,

            })
                .then((response) => {
                    console.log("it worked!!!!!!")
                    console.log(response)
                    resolve(response.data.hits);
                })
                .catch((err) => {  
                    console.log("it didnt work")
                    console.log(err);
                    reject(error);
                })
        })
    }

    //https://maps.googleapis.com/maps/api/geocode/json?address=grand+rapids&key=AIzaSyAzWLrTiTrHUeTKCGNNpPkFLVrJ-ncycK0
//data.results[""0""].geometry.location
    service.getGeocode = (search) => {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json';
        let apiParam = {
            address: 'grand+rapids',
            key: service.geoKey
        }

        return $q(function (resolve, reject) {
            $http({
                url: url,
                method: 'GET',
                params: apiParam,

            })
                .then((response) => {
                    service.location = {
                        lat:  response.data.results[0].geometry.location.lat,
                        lon: response.data.results[0].geometry.location.lng
                    }

                    console.log("geocode worked!!!!!!")
                    console.log(response.data.results[0].geometry.location)
                    resolve(service.location );
                })
                .catch((err) => {  
                    console.log("it didnt work")
                    console.log(err);
                    reject(error);
                })
        })
    }




    service.setFavorites = (favoriteParam) =>{
        service.favoriteArray.push(favoriteParam);
    }
    service.setRemoveFavorites = (removeParam) =>{
        service.favoriteArray.splice(service.favoriteArray.indexOf(removeParam), 1);
    }
    service.getGeocode().then( (response) => {
        service.getTrails(response.lat, response.lon);

    });
}

angular
    .module('HikingApp')
    .service('hikingService', HikingService);
