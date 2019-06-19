function DifficultyCalcController() {
    const ctrl = this;

    ctrl.showAssistant = false;

    ctrl.show = () => {
        ctrl.showAssistant = true;
    }
    ctrl.hide = () => {
        ctrl.showAssistant = false;
    }

    ctrl.$onInit = () => {
        ctrl.calculateTime();
        ctrl.waterIntake();
        ctrl.calculateCalories(170);

    }
 
    ctrl.calculateTime = () => {        
        ctrl.totalHikeTime = ((ctrl.trail.length * 30) + ((ctrl.trail.ascent/1000) * 30));
        if (ctrl.totalHikeTime >= 60) {
            ctrl.totalHikeTimeFormat = parseInt(ctrl.totalHikeTime/60) +' hours';
        } else {
            ctrl.totalHikeTimeFormat = parseInt(ctrl.totalHikeTime) + ' minutes';
            ctrl.formatTime = Math.floor(parseInt(ctrl.totalHikeTimeFormat));
        }

        return Math.floor(parseInt(ctrl.totalHikeTimeFormat));
    }

    ctrl.waterIntake = () => {
        ctrl.totalWaterIntake = Math.ceil((ctrl.totalHikeTime/30) * 8);
        ctrl.totalWaterIntakeFormat = ctrl.totalWaterIntake + ' ounces';
        return ctrl.totalWaterIntakeFormat;
    }
    ctrl.calculateCalories = (weight) => {
        // this is based on the MET,metabolic equivalent scores for hiking.
        // easy trails have a MET of 3  harder trails have a MET of 6 to 7
        // if(weight === ''){
        //     weight = 170;
        //     //if no weight is entered then set a defulat weight of 170 lbs
        // }
        let weightKgs = weight * 0.454;
        let metValue = 6.5;
        ctrl.calsPerHour = weightKgs * metValue;
        ctrl.totalCalsBurnFormat = Math.round(ctrl.calsPerHour * (ctrl.totalHikeTime / 60)) + ' calories';
        return ctrl.totalCalsBurnFormat;
    }

    ctrl.calculateDifficulty = () => {
        
    }
}
    // 8oz every 30 minutes
    // prehydtrate 2 hours before 20 oz
    angular.module("HikingApp")
    .component("difficultyCalc", {
        template: `
        <div ng-if="$ctrl.showAssistant" class="window"></div>
        <div ng-if="$ctrl.showAssistant" class="show">
            <h2>Hiking Buddy</h2>
            <h3>{{$ctrl.trail.name}}</h3>
            {{ $ctrl.trailResponse }}
            <br>
            This {{$ctrl.trail.length}} mile trail should take you about {{$ctrl.totalHikeTimeFormat}}.
            <br>
            I would recommend that you take {{$ctrl.totalWaterIntakeFormat}} of water.
            <br>
            You will probaly burn about {{$ctrl.totalCalsBurnFormat}} so bring some trail mix.
            <br>
            This trail has a {{$ctrl.trail.difficulty}} meaning {{$ctrl.difficultyConv}}.
            <br>
            Personally I think that if you are a Novice hiker this will be {{$ctrl.difficultySuggestion}} hike.
        
        </div>
        <button ng-click="$ctrl.show()">Show Assistant</button>
        <button ng-click="$ctrl.hide()">Hide Assistant</button>
        
        `,
        controller: DifficultyCalcController,
        bindings: {
            trail: '<'
        }
    })