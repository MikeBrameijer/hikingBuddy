function DifficultyCalcController() {
    const ctrl = this;
    // ctrl.trails = {distance : ctrl.trail.distance};


    ctrl.calculateTime = () => {
        
        let totalHikeTime = ((ctrl.trail.length * 30) + ((ctrl.trail.ascent/1000) * 30));
        console.log(totalHikeTime);

            if (totalHikeTime >= 60) {
                totalHikeTime = totalHikeTime/60;
                console.log(`${totalHikeTime} hours`);
            } else {

                return(`${totalHikeTime} minutes`);
            }
    }

    ctrl.$onInit = () => {
        
        ctrl.calculateTime();
        // ctrl.

    }

    ctrl.waterIntake = () => {
        let totalWaterIntake = ((ctrl.calculateTime()/30) * 8);
            console.log(`${totalWaterIntake} ounces`);
    }
    ctrl.calculateCalories = (weight) => {
        // this is based on the MET,metabolic equivalent scores for hiking.
        // easy trails have a MET of 3  harder trails have a MET of 6 to 7
        if(weight === ''){
            weight = 170;
            //if no weight is entered then set a defulat weight of 170 lbs
        }
        let weightKgs = weight * .454;
        let metValue = 6.5
        ctrl.calsPerHour = weightKgs * metValue;
        ctrl.totalCalsBurn = ctrl.calsPerHour * ctrl.totalHikeTime;
        return ctrl.totalCalsBurn;

    }

    ctrl.calculateDifficulty = () => {
        if (ctrl.trails[0].difficulty === "green") {
            
        }
    }
}
    // 8oz every 30 minutes
    // prehydtrate 2 hours before 20 oz


angular.module("HikingApp")
.component("difficultyCalc", {
    template: `

        <button ng-click="$ctrl.calculateTime()"> Calculate Time </button>



    
    `,
    controller: DifficultyCalcController,
    bindings: {
        trail: '<'
    }
})