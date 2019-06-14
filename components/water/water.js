"use strict";
function WaterController() {  
    const ctrl = this;

    ctrl.trails = [
        {
            difficulty: "green",
            distance: 5,
        }
    ];


    ctrl.waterIntake = () => {
        let hikeTime = (ctrl.trails[0].distance * 30)
        let totalWaterIntake = ((hikeTime/30) * 8);
            console.log(`${totalWaterIntake} ounces`);
    }


    // 8oz every 30 minutes
    // prehydtrate 2 hours before 20 oz

        

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