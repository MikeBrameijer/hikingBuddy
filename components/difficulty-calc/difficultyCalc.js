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
                console.log(`${totalHikeTime} minutes`);
            }
    }

    ctrl.calculateDifficulty = () => {
        if (ctrl.trails[0].difficulty === "green") {
            

        }
    }


    
    ctrl.calculateTime();
}

angular.module("HikingApp")
.component("difficultyCalculator", {
    template: `
    
    `,
    controller: DifficultyCalcController,
    bindings: {

    }
})