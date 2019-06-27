"use strict";

angular
.module("HikingApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
      .when("/saved", {
        template: "<saved></saved>"
    })
    .when("/about", {
        template: "<about></about>"
    })
    .when("/home", {
        template: "<hiking-list></hiking-list>"
    })
    .otherwise({
        redirectTo: "/home"
    })
}]);
