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
            .when("/landing", {
                templateUrl: "views/landing/landing.html",
                controller: "LandingController",
                controllerAs: "model"
            })
            .when("/about", {
                templateUrl: "views/about/about.view.client.html"
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
                //resolve: {loggedin: checkLoggedIn}

            })
            .when("/user/:uid/favorites", {
                templateUrl: "views/user/favorites.view.client.html",
                controller: "FavoritesController",
                controllerAs: "model"
            })
            .when("/user/:uid/following", {
                templateUrl: "views/user/following.view.client.html",
                controller: "FollowingController",
                controllerAs: "model"
            })
            .when("/user/:uid/search", {
                templateUrl: "views/search/searchMain.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchArtist", {
                templateUrl: "views/search/searchByArtist.view.client.html",
                controller: "SearchArtistController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchArtist/:artist", {
                templateUrl: "views/search/searchByArtist.view.client.html",
                controller: "ArtistListController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchArtist/:artist/details/:eid", {
                templateUrl: "views/concert/concert.view.client.html",
                controller: "ConcertController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchVenue", {
                templateUrl: "views/search/searchByVenue.view.client.html",
                controller: "SearchVenueController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchVenue/:venue", {
                templateUrl: "views/search/searchByVenue.view.client.html",
                controller: "VenueListController",
                controllerAs: "model"
            })
            .when("/user/:uid/searchVenue/:venue/details/:eid", {
                templateUrl: "views/concert/concert.view.client.html",
                controller: "ConcertController",
                controllerAs: "model"
            })
            .when("/user/:uid/artist/:aid", {
                templateUrl: "views/artist/artist.view.client.html",
                controller: "ArtistController",
                controllerAs: "model"
            })
            .when("/user/:uid/friends", {
                templateUrl: "views/user/friends.view.client.html",
                controller: "FriendsController",
                controllerAs: "model"
            })
            .when("/user/:uid/event/:eid", {
                templateUrl: "views/concert/concert.view.client.html",
                controller: "ConcertController",
                controllerAs: "model"
            })
            .when("/user/:uid/view/:userID", {
                templateUrl: "views/user/viewUser.view.client.html",
                controller: "ViewUserController",
                controllerAs: "model"
            })

    }
})();