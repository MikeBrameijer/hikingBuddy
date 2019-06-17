function HikingListController(hikingService) {
    const ctrl = this;

    ctrl.showAssistant = false;

    ctrl.show = () => {
        ctrl.showAssistant = true;
    }
    ctrl.hide = () => {
        ctrl.showAssistant = false;
    }

    ctrl.trailsArray = [];
    ctrl.allTrailsRating = [];

    ctrl.getList = (location) => {
        hikingService.getGeocode(location) 
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
                        imgMedium: value.imgMedium
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

    ctrl.changeHeight = () => {
        let count = 0;

        if (count === 0) {
            console.log('grow');
            count = 1;
            return 'grow';
        } else {
            console.log('shrink');
            count = 0;
            return 'shrink';
        }
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

                <div class="preview" ng-class="$ctrl.changeHeight()">
                    <div class="left">
                        <p style="text-overflow: ellipsis; width:200px;  white-space: nowrap; 
                        overflow: hidden;">{{trail.name}}</p>


                        <div class="starRating" >
                        <span ng-repeat="star in trail.stars track by $index">
                        <img class="star" src="{{star}}"/>
                        </span> 
                        </div>



                    <button ng-click="$ctrl.changeHeight()"> Show More </button>

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


    