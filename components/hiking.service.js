function HikingService($http, $q) {
    const service = this;
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
                    console.log("it worked in the service!");
                    console.log(response);
                    service.globalLocation = response.data.hits;
                    resolve(response.data.hits);
                })
                .catch((err) => {
                    console.log("it didnt work in the service");
                    console.log(err);
                    reject(error);
                })
        })
    }

    service.getGeocode = (search) => {
        let url = 'https://maps.googleapis.com/maps/api/geocode/json';
        let apiParam = {
            address: search,
            key: service.geoKey
        }

        return $q(function (resolve, reject) {
            $http({
                url: url,
                method: 'GET',
                params: apiParam,
            })
                .then((response) => {
                    let location = {
                        lat:  response.data.results[0].geometry.location.lat,
                        lon: response.data.results[0].geometry.location.lng
                    }
                    console.log("geocode worked!!!!!!");
                    console.log(response.data.results[0].geometry.location);
                    // service.getTrails(location.lat, location.lon);
                    // service.getTrails(location.lat, location.lon).then( (resp) => {
                    //     resolve(resp);
                    // })
                    resolve(service.getTrails(location.lat, location.lon));
                })
                .catch( (err) => {
                    console.log("geocode didnt work");
                    console.log(err);
                    reject(error);
                })
        })
    }

   
 }

angular
    .module('HikingApp')
    .service('hikingService', HikingService);
