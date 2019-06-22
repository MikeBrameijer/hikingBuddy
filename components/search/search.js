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
        <select class="searchInput" ng-model="stars">
          <option value="">Min stars...</option>
          <option value="0">Zero</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
          <option value="4">Four</option>
          <option value="5">Five</option>
        </select>
        <button class="searchButton" ng-click="$ctrl.getSearch(location, distance, length, stars)">Search</button>
    
    
    
    `,  
    controller: SearchController,
    bindings: {
        searchRec: '&'
      }
});