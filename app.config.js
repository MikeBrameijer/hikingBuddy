"use strict";

angular
.module("HikingApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/search", {
        template: "<search></search>"
    })
    .when("/saved", {
        template: "<saved></saved>"
    })
    .when("/about", {
        template: "<about></about>"
    })   
    .when("/difficuly-calc", {
        template: "<difficulty-calculator></difficulty-calculator>"
    })
    .otherwise({
        redirectTo: "/search"
    })
}]);

