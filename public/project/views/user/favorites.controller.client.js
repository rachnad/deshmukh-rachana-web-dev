/**
 * Created by rachanadeshmukh on 6/5/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($rootScope, $routeParams, UserService, FavoriteService) {
        var vm = this;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.userId = $routeParams["uid"];

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = angular.copy(response.data);
                });
            $rootScope.currentUser = vm.user;

            getFavorites();
        }
        init();


        function getFavorites() {
            FavoriteService
                .getFavorites(vm.userId)
                .then(function(response) {
                    vm.favorites = response.data;
                })

        }
    }

})();