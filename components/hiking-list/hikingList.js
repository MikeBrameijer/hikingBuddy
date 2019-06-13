function HikingListController(hikingService) {
    const ctrl = this;

    // ctrl.search = (location) => {
    //     hikingService.getGeocode(location) 
    // }
    ctrl.getList = (location) => {
        console.log(location);
        hikingService.getGeocode(location) 
            .then((results) => {

                console.log("it worked in hikingList.js");
                console.log(results);

            })
            .catch((err) => {
                console.log("it didnt work in hikingList.js");
                console.log(err);
            });
    }

   

}
 // <div class="container" id="searchResults">
            // test
            //     <div class="container" ng-repeat="trail in $ctrl.hikingList">
            //         <h2>{{trail.name}}</h2>
            //     </div>
            // </div>

angular
    .module('HikingApp')
    .component('hikingList', {
        template: `
            <p> this is the hiking list component </p>
            <search-component search-rec="$ctrl.getList(que)"></search-component>
           
    `, 
        controller: HikingListController,
        // bindings: {
        //   me: '<',
        //   onDelete: '&',
        //   onUpdate: '&'
        // }
    });