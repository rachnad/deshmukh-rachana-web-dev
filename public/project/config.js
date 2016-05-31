/**
 * Created by rachanadeshmukh on 5/30/16.
 */
(function() {
    angular
        .module("Vibe")
        .config(Config);

    function Config($routeProvider) {

    $routeProvider
            .when("/login", {
            templateUrl: "views/user/login.view.client.html",
            controller: "LoginController",
            controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/search", {
                templateUrl: "views/search/searchMain.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/searchArtist", {
                templateUrl: "views/search/searchByArtist.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/searchVenue", {
                templateUrl: "views/search/searchByVenue.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })

    }
})();