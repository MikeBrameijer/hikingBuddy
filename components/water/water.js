"use strict";
function WaterController() {  
    const ctrl = this;

    ctrl.trails = [
        {
            difficulty: "green",
            distance: 5
        }
    ];

    


    // if trail = green && <= 1 Mile
    //     return("Pre-hydrate with 20 fluid ounces of water and pack at a minimum 10 fluid ounces of water.")

        
        
    //     if (green)

  
  
  
    // ctrl.getSearch = (search) => {
    //     ctrl.searchRec({
    //       que: search
    //     });
    //   }

    // ctrl.search = (location) => {
    //     hikingService.getGeocode(location) 
    // }

}
angular
  .module("HikingApp")
  .component("waterComponent", {
    template: `

    
    `,  
    controller: WaterController,
    // bindings: {
    //     searchRec: '&'
    //   }
});