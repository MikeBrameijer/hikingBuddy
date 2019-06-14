"use strict";
function WaterController() {  
    const ctrl = this;

    ctrl.trails = [
        {
            difficulty: "green",
            distance: 5,
            ouncesEverythirty: 16
        }
    ];

    console.log(ctrl.trails[0].distance);

    ctrl.calculateTime = () => {
        let totalHikeTime = ((ctrl.trails[0].distance * 30) + ((ctrl.trails[0].ascent/1000) * 30));

            if (totalHikeTime >= 60) {
                totalHikeTime = totalHikeTime/60;
                console.log(`${totalHikeTime} hours`);
            } else {
                console.log(`${totalHikeTime} minutes`);
            }
    }

    ctrl.waterIntake = () => {
        let totalWaterIntake = ((totalHikeTime/30) * 8);
            console.log(`${totalWaterIntake} ounces`);
    }


    // 8oz every 30 minutes
    // prehydtrate 2 hours before

        

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