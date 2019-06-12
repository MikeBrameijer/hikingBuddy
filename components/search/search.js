"use strict";
function SearchController(hikingService) {  
    const ctrl = this;
    ctrl.search = (location) => {


        hikingService.getGeocode(location) 


    }
   
   
   
  







}
angular
  .module("HikingApp")
  .component("searchComponent", {
    template: `

        <input type="text" ng-model="location" />
        <button ng-click="$ctrl.search(location)">Click</button>
    
    
    
    
    
    
    
    
    `,  
    controller: SearchController});