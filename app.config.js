"use strict";

angular
.module("HikingApp")
.config(["$routeProvider", ($routeProvider) => {
    $routeProvider
    .when("/search", {
        template: "<search></search>"
    })
    .when("/results", {
        template: "<results></results>"
    })
    .when("/details", {
        template: "<details></details>"
    })
    .when("/saved", {
        template: "<saved></saved>"
    })
    .when("/hiking-list", {
        template: "<hiking-list></hiking-list>"
    })
    .otherwise({
        redirectTo: "/search"
    })
}]);

