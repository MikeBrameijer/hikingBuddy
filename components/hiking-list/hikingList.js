function HikingListController(hikingService) {
    const ctrl = this;


    ctrl.getList = () => {
        hikingService.theStart()
            .then((results) => {
                console.log("it worked in hikingList.js!");
                ctrl.hikingList = [];
                ctrl.hikingList = results;
                console.log(ctrl.hikingList);
            })
            .catch((err) => {
                console.log("it didnt work in hikingList.js");
                console.log(err);
            });
    }

    ctrl.getList();

}


angular
    .module('HikingApp')
    .component('hikingList', {
        template: `
            <p> this is the hiking list component </p>
            <div class="container" id="searchResults">
            test
                <div class="container" ng-repeat="trail in $ctrl.hikingList">
                    <h2>{{trail.name}}</h2>
                </div>
            </div>
    `, 
        controller: HikingListController,
        // bindings: {
        //   me: '<',
        //   onDelete: '&',
        //   onUpdate: '&'
        // }
    });