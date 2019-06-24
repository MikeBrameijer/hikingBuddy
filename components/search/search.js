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
        
    <div class="search-container">
       <input class="searchInput location-search" type="text" ng-model="location" placeholder="Where Would You Like To"/>
        
     
          <input class="searchInput secondary-search-param" type="text" ng-model="distance" placeholder="Max distance"/>
          <input class="searchInput secondary-search-param" type="text" ng-model="length" placeholder="Min length"/>
          <div class="select">
            <select class="searchInput secondary-search-param dropDown" ng-model="stars">
              <option value="">Min Star Rating</option>
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            </div>
          
         
        <div class="searchButtonClass">  
          <button class="searchButton" ng-click="$ctrl.getSearch(location, distance, length, stars)">Search</button>
        </div>
    </div>
    `,  
    controller: SearchController,
    bindings: {
        searchRec: '&'
      }
});

/* <div class="extra-search-params"> */