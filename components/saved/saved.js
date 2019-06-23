"use strict";
function SavedController(hikingService) {  
    const ctrl = this;

    ctrl.favoriteArray = hikingService.favoriteArray;
        console.log(favoriteArray);

    ctrl.setRemoveFavorites = (removeParam) => {
        hikingService.setRemoveFavorites(removeParam)
        console.log("it's gone from the fave. list");
    }
}

angular
  .module("HikingApp")
  .component("savedComponent", {
    template: `

    <section id="saved-component">

    <div class="contentContainer">
    <div class="cardContainer">
        <div ng-repeat="trail in $ctrl.favoriteArray" class="fullTrail"
            <div class="favorite" ng-click="$ctrl.setRemoveFavorites(trail)">
            <i class="material-icons favoriteIcon whiteIcon">remove_circle</i>
            <i class="material-icons favoriteIcon redIcon">remove_circle_outline</i>
              
          </div>







    <h1>this is the saved page</h1>

  
      </section>
  
    
    `,  
    controller: SavedController,

});

{/* <div class = "savedTrail" ng-repeat = "trail in $ctrl.saveArray">
<div class = "trailContainer">
<h1 class = "trailName" ng-click = "show=!show">{{trail.name}}</h1>

<div class="mountainContainer">
    <i class="material-icons star" ng-hide = "trail.starred" ng-click = "$ctrl.setRemovedSaved(trail)">star_border</i>

    <i class = "material-icons star" ng-show = "trail.starred" ng-click = "$ctrl.setRemovedSaved(trail)">star</i>

</div>
</div>
</div> */}
