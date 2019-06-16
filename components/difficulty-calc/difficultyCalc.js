function DifficultyCalcController() {
    const ctrl = this;

    ctrl.trails = [
        {
        grade: "5%",
        distance: 1,
        difficulty: "green",
        ascent: 1000,
        peakAltitude: 1200
        }
    ];

    console.log(ctrl.trails[0].distance);

    ctrl.calculateTime = () => {
        let totalHikeTime = ((ctrl.trails[0].distance * 30) + ((ctrl.trails[0].ascent/1000) * 30));

            if (totalHikeTime >= 60) {
                totalHikeTime = totalHikeTime/60;
                console.log(`${totalHikeTime} hours`);
            } else {

                return(`${totalHikeTime} minutes`);
            }
    }

    ctrl.waterIntake = () => {
        let totalWaterIntake = ((ctrl.calculateTime()/30) * 8);
            console.log(`${totalWaterIntake} ounces`);
    }
    ctrl.calculateCalories = (weight) => {
        // this is based on the MET,metabolic equivalent scores for hiking.
        // easy trails have a MET of 3  harder trails have a MET of 6 to 7
        let weightKgs = weight * .454;
        let metValue = 6.5
        ctrl.calcsPerHour = weightKgs * metValue;

    }

    ctrl.calculateDifficulty = () => {
        if (ctrl.trails[0].difficulty === "green") {
            
        }
    }
    ctrl.calculateTime();
}


    // 8oz every 30 minutes
    // prehydtrate 2 hours before 20 oz


angular.module("HikingApp")
.component("difficultyCalculator", {
    template: `


    
    `,
    controller: DifficultyCalcController,
    bindings: {

    }
})