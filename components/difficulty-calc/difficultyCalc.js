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

        ctrl.calculateDifficulty("Novice");
        ctrl.trailDifficultyConv(); 

        ctrl.responseToTrail(ctrl.trail.stars);


    }
 
    ctrl.calculateTime = () => {        
        ctrl.totalHikeTime = Math.round(parseInt((ctrl.trail.length * 30) + ((ctrl.trail.ascent/1000) * 30)));
        if (ctrl.totalHikeTime >= 60) {
            ctrl.totalHikeTimeFormat = (ctrl.totalHikeTime/60) +' hours';
        } else {
            ctrl.totalHikeTimeFormat = (ctrl.totalHikeTime) + ' minutes';
        }

        return ctrl.totalHikeTimeFormat;
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

    ctrl.trailDifficultyConv = () => {
        if(ctrl.trail.difficulty === "green"){
            ctrl.difficultyConv = "No obstacles. Flat."
        }
        if(ctrl.trail.difficulty === "greenBlue"){
            ctrl.difficultyConv = "Some sections of uneven terrain. Mostly flat."
        }
        if(ctrl.trail.difficulty === "blue"){
            ctrl.difficultyConv = "Uneven terrain. Small inclines (max 10% grade)."
        }
        if(ctrl.trail.difficulty === "blueBlack"){
            ctrl.difficultyConv = "Some obstacles such as rocks or roots present. Moderate inclines."
        }
        if(ctrl.trail.difficulty === "black"){
            ctrl.difficultyConv = "Tricky terrain. Steep. Not for beginners (max 15% grade)."
        }
        if(ctrl.trail.difficulty === "dblack"){
            ctrl.difficultyConv = "Potentially hazardous terrain. Very steep. Experts only."
        }
        return ctrl.difficultyConv;
    }

    ctrl.calculateDifficulty = (expLvl) => {
        // formula from https://www.hikingincolorado.org/hikecalc.html
        // Rating (Novice) = ( 0.002 x elevation gain [ in feet ] ) + round trip distance [ in miles ]
        // Rating (Expert) = ( 0.0005 x elevation gain [ in feet ] ) + round trip distance / 2 [ in miles ]
        ctrl.hikerExpLvl = expLvl;
        
        if(ctrl.hikerExpLvl === "Novice"){
            ctrl.difficultyRating = (.002 * ctrl.trail.ascent) + ctrl.trail.length;
        }
        if(ctrl.hikerExpLvl === "Expert"){
            ctrl.difficultyRating = (.0005 * ctrl.trail.ascent) + (ctrl.trail.length / 2);
        }
        console.log("difficultyRating " + ctrl.difficultyRating);
        
        if(ctrl.difficultyRating <= 5){
            ctrl.difficultySuggestion = "an easy";
        }else if(ctrl.difficultyRating <= 9){
            ctrl.difficultySuggestion = "a moderate";
        }else if(ctrl.difficultyRating <= 9){
            ctrl.difficultySuggestion = "a Strenuous or Difficult";
        }
        console.log("difficultySuggestion " + ctrl.difficultySuggestion);
        return ctrl.difficultySuggestion;
    }


    ctrl.responseToTrail = (stars) => {
        ctrl.roundedStars = Math.round(stars);
        ctrl.trailResponse = "Default Text";
        if (ctrl.roundedStars == 5) {
            ctrl.trailResponse = "This trail is really popular!"
        } else if (ctrl.roundedStars == 4) {
            ctrl.trailResponse = "Most hikers enjoy this trail quite a bit."
        } else if (ctrl.roundedStars == 3) {
            ctrl.trailResponse = "This is a pretty average trail, you might enjoy it."
        } else if (ctrl.roundedStars == 2) {
            ctrl.trailResponse == "Be careful, a lot of hikers didn't enjoy this hike."
        } else if (ctrl.roundedStars == 1) {
            ctrl.trailResponse = "Beware, This trail might have a lot of issues."
        } else {
            ctrl.trailResponse = "This trail needs to be reviewed! Maybe you can help? :)"
        }
        return ctrl.trailResponse;
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

        This trail has a {{$ctrl.trail.difficulty}} rating, meaning {{$ctrl.difficultyConv}}.
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