"use strict";
function SearchController() {  
    const ctrl = this;

    ctrl.getSearch = (search, distance, length, stars) => {
        ctrl.searchRec({
          que: search,
          maxDistance: distance,
          minLength: length,
          minStars: stars,
        });
      }

    // ctrl.search = (location) => {
    //     hikingService.getGeocode(location) 
    // }

}
angular
  .module("HikingApp")
  .component("searchComponent", {
    template: `

        <input class="searchInput" type="text" ng-model="location" placeholder="Enter a location..."/>
        <input class="searchInput" type="text" ng-model="distance" placeholder="Max distance..."/>
        <input class="searchInput" type="text" ng-model="length" placeholder="Min length..."/>
        <input class="searchInput" type="text" ng-model="stars" placeholder="Min stars..."/>
        <button class="searchButton" ng-click="$ctrl.getSearch(location, distance, length, stars)">Search</button>
    
    
    
    `,  
    controller: SearchController,
    bindings: {
        searchRec: '&'
      }
});