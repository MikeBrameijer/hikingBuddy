function HikingListController(hikingService) {
    const ctrl = this;
    ctrl.trailsArray = [];
    ctrl.allTrailsRating = [];

    ctrl.getList = (location, distance, length, stars) => {
        ctrl.trailsArray = [];

        console.log(location);
        hikingService.getTrails(location, distance, length, stars) 
            .then((results) => {
                results.forEach(function(value, key) {
                    let trailsObj = {
                        id: value.id,
                        caloriesBurned: null,
                        hikingTime: null,
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
                    ctrl.formatLocation =  hikingService.formatLocation;
                });

                console.log(ctrl.trailsArray);
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

    ctrl.changeHeight = (flag, theId) => {
        ctrl.trailsArray.forEach( (value, index) => {
            console.log(value)
            if (theId === value.id) {
                value.showDetails = flag;
            }
        });
    }

    console.log(ctrl.formatLocation);
}

angular
    .module('HikingApp')
    .component('hikingList', {
        template: `
            <search-component search-rec="$ctrl.getList(que, maxDistance, minLength, minStars)"></search-component>
            
            <div class="locationAndSort">
            <h2 class="formatLocation" ng-if="$ctrl.formatLocation != null">Showing results for: {{$ctrl.formatLocation}}</h2>
                
                <select placeholder="Filter By:" class="sort-trail" ng-show="$ctrl.formatLocation" ng-model="sorting">
                  <option value="">Filter By:</option>
                  <option value="1">Hike Time- High to Low</option>
                  <option value="2">Hike Time- Low to High</option>
                    <option value="3"">Calories- High to Low </option>
                    <option value="4">Calories- Low to High </option>
                </select>
            </div>
            <div class="mainContainer" id="searchResults">
            
                <div class="container" ng-repeat="trail in $ctrl.trailsArray | orderBy: sorting track by trail.id" ng-class="{true: 'fullView', false: 'partialView'}[trail.showDetails == true]">
                
                
                
                {{trail.caloriesBurned}}
                <div class="preview">
               <difficulty-calc class="buddy-popup" trail="trail"></difficulty-calc>
                    <div class="left">
                        <p class="trailName" style="text-overflow: ellipsis; width:200px;  white-space: nowrap; 
                        overflow: hidden;">{{trail.name}}</p>
                        <div class="starRating" >
                        <span ng-repeat="star in trail.starsImg track by $index">
                        <img class="star" src="{{star}}"/>
                        </span> 
                        </div>
                    <button class="showMore" ng-click="$ctrl.changeHeight(true, trail.id)" ng-if="!trail.showDetails"> Show More </button>
                    <button ng-click="$ctrl.changeHeight(false, trail.id)" ng-if="trail.showDetails"> Show Less </button>
                    </div>
                    <div class="right">
                        <p class="lengthTrail">Length:<br>{{trail.length}} miles</br></p>
                        <p class="diffTrail">Difficulty: {{trail.difficulty}} </p>
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


    // <difficulty-calc trail="trail"></difficulty-calc> 