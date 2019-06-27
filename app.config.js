"use strict";

angular
.module("HikingApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/search", {
        template: "<search></search>"
    })
    .when("/saved-component", {
        template: "<saved-component></saved-component>"
    })
    .when("/about", {
        template: "<about></about>"
    })
    .when("/hiking-list", {
        template: "<hiking-list></hiking-list>"
    })
    .otherwise({
        redirectTo: "/hiking-list"
    })
}]);
