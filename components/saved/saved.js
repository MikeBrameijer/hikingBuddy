// "use strict";
// function SavedController(hikingService) {  
//     const ctrl = this;
//     ctrl.search = "";
//     ctrl.favs = null;

//     ctrl.favs = HikingService.getFavorites();
//     console.log(`favs:`)

//     ctrl.removeTrail = function (key, value) {
//         ctrl.favs.splice(key, 1)
//     }


// };

// angular
//   .module("HikingApp")
//   .component("savedComponent", {
//     template: `

//     <section id="saved-component">

//     <div ng-repeat="trail in $ctrl.favs" class="card mb-4">
//     <div class="card-deck text-center">
//     <div ng-class="row">
//     <p>{{trail.location}}</p>


//     <button class="btn btn-primary" ng-click="$ctrl.removeTrail($index, trail)">Remove from Favorites</button>
 



//     <h1>this is the saved page</h1>

  
//       </section>
  
    
//     `,  
//     controller: SavedController,

// });

