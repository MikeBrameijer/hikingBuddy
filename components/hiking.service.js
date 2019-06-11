function HikingService($http, $q) {
    const service = this;
    console.log("hello");
    service.favoriteArray = [];

    service.key = '200488347-7449e5616f0f75c446c24d3c0da3ba39';

    service.getTrails = () => {
        let url = 'https://www.hikingproject.com/data/get-trails';
        let apiParam = {
            lat: 40.0274,
            lon: -105.2519,
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
    service.setFavorites = (favoriteParam) =>{
        service.favoriteArray.push(favoriteParam);
    }
    service.setRemoveFavorites = (removeParam) =>{
        service.favoriteArray.splice(service.favoriteArray.indexOf(removeParam), 1);
    }
    service.getTrails()
}

angular
    .module('HikingApp')
    .service('hikingService', HikingService);
