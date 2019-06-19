"use strict";
function SearchController() {  
    const ctrl = this;

    ctrl.getSearch = (search) => {
        ctrl.searchRec({
          que: search
        });
      }



}
angular
  .module("HikingApp")
  .component("searchComponent", {
    template: `

        <input class="searchInput" type="text" ng-model="location" placeholder="Enter a location..."/>
        <button class="searchButton" ng-click="$ctrl.getSearch(location)">Search</button>
    
    
    
    `,  
    controller: SearchController,
    bindings: {
        searchRec: '&'
      }
});