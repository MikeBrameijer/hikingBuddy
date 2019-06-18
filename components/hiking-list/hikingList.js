function HikingListController(hikingService) {
    const ctrl = this;

    // ctrl.expandContainer = false;


    ctrl.trailsArray = [];
    ctrl.allTrailsRating = [];

    ctrl.getList = (location) => {
        console.log(location);
        hikingService.getTrails(location) 
            .then((results) => {

                results.forEach(function(value, key) {
                    let trailsObj = {
                        id: value.id,
                        name: value.name,
                        ascent: value.ascent,
                        conditionStatus: value.conditionStatus,
                        difficulty: value.difficulty,
                        high: value.high,
                        length: value.length,
                        location: value.location,
                        stars: value.stars,
                        type: value.type,
                        imgMedium: value.imgMedium,
                        showDetails: false
                    }

                    ctrl.trailsArray.push(trailsObj);
                });



                ctrl.starRating();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    ctrl.starRating = () => {
        let filledStar = 'assets/gold-star.svg';

        ctrl.trailsArray.forEach( function(value, key)  {
            let emptyStars = ["assets/hollow-star.svg", "assets/hollow-star.svg", "assets/hollow-star.svg", "assets/hollow-star.svg", "assets/hollow-star.svg"];

            for (let i=0; i < Math.round(value.stars); i++) {
                emptyStars.pop();
                emptyStars.unshift(filledStar);
            }

            ctrl.allTrailsRating.push(emptyStars);
            value.stars = emptyStars;
        });

        console.log(ctrl.trailsArray[0].stars);
    }

    ctrl.changeHeight = (flag, index) => {
        ctrl.trailsArray[index].showDetails = flag;
    }
}
 

angular
    .module('HikingApp')
    .component('hikingList', {
        template: `
            <p> this is the hiking list component </p>


            <div ng-if="$ctrl.showAssistant" class="window"></div>
            <div ng-if="$ctrl.showAssistant" class="show">
            <hiking-assistant module-flag="$ctrl.showDetailModule"></hiking-assistant>
            </div>
            <button ng-click="$ctrl.show()">Show Assistant</button>
            <button ng-click="$ctrl.hide()">Hide Assistant</button>



           
            <search-component search-rec="$ctrl.getList(que)"></search-component>

            <div class="mainContainer" id="searchResults">

                <div class="container" ng-repeat="trail in $ctrl.trailsArray">

                <div class="preview">
                    <div class="left">
                        <p style="text-overflow: ellipsis; width:200px;  white-space: nowrap; 
                        overflow: hidden;">{{trail.name}}</p>


                        <div class="starRating" >
                        <span ng-repeat="star in trail.stars track by $index">
                        <img class="star" src="{{star}}"/>
                        </span> 
                        </div>

                    <button ng-click="$ctrl.changeHeight(true, $index)"> Show More </button>

                    </div>

                    <div class="right">
                        <p>length: {{trail.length}} miles</p>
                        <p>Difficulty: {{trail.difficulty}} </p>
                    </div>
                    
                </div>

                <div ng-if="trail.showDetails" class="fullview" >




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

                        <button ng-click="$ctrl.changeHeight(false, $index)"> Show Less </button>

                </div>

                    <br>
                    <difficulty-calc trail="trail"></difficulty-calc>
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


    