function HikingListController(hikingService) {
    const ctrl = this;

    ctrl.stars = [];

    ctrl.getList = (location) => {
        console.log(location);
        hikingService.getGeocode(location) 
            .then((results) => {

                console.log("it worked in hikingList.js");
                console.log(results);
                ctrl.trailsArray = results;

                ctrl.stars = results.stars;

                console.log(ctrl.stars);


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

                <div class="preview">
                    <div class="left">
                    <img style ="color:gold;"src="assets/star.svg"/>
                        <p style="text-overflow: ellipsis; width:200px;  white-space: nowrap; 
                        overflow: hidden;">{{trail.name}}</p>
                        <p>Rating: {{trail.stars}} stars </p>
                    </div>
                    <div class="right">
                        <p>length: {{trail.length}} miles</p>
                        <p>Difficulty: {{trail.difficulty}} </p>
                    </div>
                </div>

                <div class="fullview" style="display:none;">
                    <a ng-if="trail.imgSmallMed != ''" href="{{trail.url}}"><img src="{{trail.imgSmallMed}}"/></a>

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
                </div>

                    <br>
                </div>
                <!-- BEGIN Hiking Project
<iframe style="width:100%; max-width:1200px; height:500px;" frameborder="0" scrolling="no" src="https://www.hikingproject.com/widget/map?favs=1&location=ip&x=-9534514&y=5306736&z=6.5&h=500"></iframe>
END Hiking Project -->
            </div>
            
           
    `, 
        controller: HikingListController,
        // bindings: {
        //   me: '<',
        //   onDelete: '&',
        //   onUpdate: '&'
        // }
    });


    