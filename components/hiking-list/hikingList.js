function HikingListController(hikingService) {
    const ctrl = this;

    ctrl.getList = (location) => {
        console.log(location);
        hikingService.getGeocode(location) 
            .then((results) => {

                console.log("it worked in hikingList.js");
                console.log(results);
                ctrl.trailsArray = results;

            })
            .catch((err) => {
                console.log("it didnt work in hikingList.js");
                console.log(err);
            });
    }
}
 

angular
    .module('HikingApp')
    .component('hikingList', {
        template: `
            <p> this is the hiking list component </p>
            <search-component search-rec="$ctrl.getList(que)"></search-component>

            <div class="mainContainer" id="searchResults">
                <div class="container" ng-repeat="trail in $ctrl.trailsArray">
                    <h2>{{trail.name}}</h2>
                    <a ng-if="trail.imgSmallMed != ''" href="{{trail.url}}"><img src="{{trail.imgSmallMed}}"/></a>
                    <p>Rating: {{trail.stars}} stars </p>
                    <p>Difficulty: {{trail.difficulty}} </p>
                    <p>length: {{trail.length}} miles</p>
                    <div class="subContainer">
                    Elevation
                    <br>
                    Ascent: {{trail.ascent}} ft
                    <br>
                    Descent: {{trail.descent}} ft
                    <br>
                    High: {{trail.high}} ft
                    <br>
                    Low: {{trail.low}} ft
                    <br>
                    </div> 
                    <p ng-if="trail.summary != 'Needs Summary' && trail.summary != 'Needs Adoption'">
                        Summary: {{trail.summary}} </p>
                    
                    <br>
                </div>
                
            </div>
            
           
    `, 
        controller: HikingListController,
        // bindings: {
        //   me: '<',
        //   onDelete: '&',
        //   onUpdate: '&'
        // }
    });


    