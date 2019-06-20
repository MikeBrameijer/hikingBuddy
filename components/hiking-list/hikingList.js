function HikingListController(hikingService) {
    const ctrl = this;

    // ctrl.expandContainer = false;


    ctrl.trailsArray = [];
    ctrl.allTrailsRating = [];

    ctrl.getList = (location) => {
        ctrl.trailsArray = [];

        console.log(location);
        hikingService.getTrails(location) 
            .then((results) => {

                console.log(results);

                results.forEach(function(value, key) {
                    let trailsObj = {
                        id: value.id,
                        lat: value.latitude,
                        lon: value.longitude,
                        name: value.name,
                        ascent: value.ascent,
                        descent: value.descent,
                        summary: value.summary,
                        conditionDate: value.conditionDate,
                        conditionStatus: value.conditionStatus,
                        difficulty: value.difficulty,
                        high: value.high,
                        length: value.length,
                        location: value.location,
                        stars: value.stars,
                        starsImg: null,
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
            value.starsImg = emptyStars;
        });

    }

    ctrl.changeHeight = (flag, index) => {
        ctrl.trailsArray[index].showDetails = flag;
    }
}
 

angular
    .module('HikingApp')
    .component('hikingList', {
        template: `

            <search-component search-rec="$ctrl.getList(que)"></search-component>

            <div class="mainContainer" id="searchResults">


                <select ng-model="sorting">
                    <option selected="selected" value="stars">Stars- Low to High</option>
                    <option value="-stars">Stars- High to Low</option>
                </select>


                <div class="container" ng-repeat="trail in $ctrl.trailsArray | orderBy: sorting " ng-class="{true: 'fullView', false: 'partialView'}[trail.showDetails == true]">

                <div class="preview">
                    <div class="left">
                        <p style="text-overflow: ellipsis; width:200px;  white-space: nowrap; 
                        overflow: hidden;">{{trail.name}}</p>


                        <div class="starRating" >
                        <span ng-repeat="star in trail.starsImg track by $index">
                        <img class="star" src="{{star}}"/>
                        </span> 
                        </div>

                    <button ng-click="$ctrl.changeHeight(true, $index)" ng-if="!trail.showDetails"> Show More </button>
                    <button ng-click="$ctrl.changeHeight(false, $index)" ng-if="trail.showDetails"> Show Less </button>


                    </div>

                    <div class="right">
                        <p>length: {{trail.length}} miles</p>
                        <p>Difficulty: {{trail.difficulty}} </p>
                    </div>
                    
                </div>

                <div ng-class="{true: 'show', false: 'hide'}[trail.showDetails == true]">


                <div class="trail-details details-1>
                <p style="font-weight:bold">Trail</p>
                <p>Location: {{trail.location}}</p>
                    <p>Peak: {{trail.high}}ft</p>
                    <p>Type: {{trail.type}}</p>
                </div>

                <div class="trail-details details-2">
                    <p style="font-weight:bold">Condition</p>
                    <p>Condition Date: {{trail.conditionDate}}</p>
                    <p> Condition Status: {{trail.conditionStatus}}</p>
                    <p>Difficulty: {{trail.difficulty}}
                </div>

                <div class="trail-details details-3">
                    <p style="font-weight:bold"> Summary</p>
                
                <!--    <a ng-if="trail.imgSmallMed != ''" href="{{trail.url}}"><img src="{{trail.imgSmallMed}}"/></a> -->

                <!--<p ng-if="trail.summary != 'Needs Summary' && trail.summary != 'Needs Adoption'">
                {{trail.summary}} </p>-->
                <p>{{trail.summary}}</p>
                <difficulty-calc trail="trail"></difficulty-calc>


                </div>
                </div>
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


    