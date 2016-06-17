/**
 * Created by rachanadeshmukh on 6/5/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("FavoritesController", FavoritesController);

    function FavoritesController($rootScope, $routeParams, ProjectUserService, FavoriteService) {
        var vm = this;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.userId = $routeParams["uid"];
        vm.getFavorites = getFavorites;

        function init() {
            ProjectUserService
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
                .getAttendings(vm.userId)
                .then(function(response) {
                    vm.attendings = response.data;
                })

        }
    }

})();