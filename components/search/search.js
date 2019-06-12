"use strict";
function SearchController(HikingService) {  
    const ctrl = this;
    ctrl.search = (location) => {


        HikingService.getGeocode(location) 


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