function HikingService($http, $q) {
    const service = this;
    service.favoriteArray = [];
    service.key = '200488347-7449e5616f0f75c446c24d3c0da3ba39';
    service.geoKey = 'AIzaSyAzWLrTiTrHUeTKCGNNpPkFLVrJ-ncycK0';

    service.getTrails = (search) => {
        return $q(function (resolve, reject) {

        service.getGeocode(search)
        .then((results) => {
            
            service.trailLat = results.lat;
            service.trailLon = results.lon;
        
            let url = 'https://www.hikingproject.com/data/get-trails';
            let apiParam = {
                lat: service.trailLat,
                lon: service.trailLon,
                //NOTE: distance refers to distance between trail and LAT&LONG point(miles)
                // maxDistance: 100,
                // maxResults: 3,
                //NOTE: minLength refers to length of trail(miles)
                // minLength: 100,
                // minStars: 4,
                //NOTE: Need to find sortby values other than distance & quality
                sort: 'distance',
                key: service.key
            };

            $http({
                url: url,
                method: 'GET',
                params: apiParam,
            })
                .then((response) => {
                    // console.log("getTrails service response");
                    // console.log(response);

                    service.globalLocation = response.data.trails;

                    resolve(response.data.trails);
                })
                .catch((err) => {
                    // console.log("it didnt work in the service");
                    // console.log(err);
                    reject(error);
                })
        })
    })
    }

    service.getCamping = (locationLat, localtionLon) => {
        let url = 'https://www.hikingproject.com/data/get-campgrounds';
        let apiParam = {
            lat: locationLat,
            lon: localtionLon,
            sort: 'distance',
            key: service.key
        }
        return $q(function (resolve, reject) {
            $http({
                url: url,
                method: 'GET',
                params: apiParam,
            })
                .then((response) => {
                    // console.log("getCampgrounds service response");
                    // console.log(response.data.campgrounds);
                    resolve(response.data.campgrounds);
                })
                .catch((err) => {
                    // console.log("Camping didn't work in the service");
                    // console.log(err);
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
                    // console.log("geoCode service response");
                    // console.log(response);
                    // console.log(response.data.results[0].geometry.location);
                    
                    // service.getTrails(location.lat, location.lon);
                    // service.getTrails(location.lat, location.lon).then( (resp) => {
                    //     resolve(resp);
                    // })
                    // resolve(service.getTrails(location.lat, location.lon));
                    // service.getCamping(location.lat, location.lon);
                    resolve(location);
                })
                .catch( (err) => {
                    // console.log("geocode didnt work");
                    // console.log(err);
                    reject(error);
                })
        })
    }

   
 }

angular
    .module('HikingApp')
    .service('hikingService', HikingService);
