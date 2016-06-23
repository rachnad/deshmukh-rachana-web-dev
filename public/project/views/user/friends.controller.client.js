/**
 * Created by rachanadeshmukh on 6/23/16.
 */

(function() {
    angular
        .module("Vibe")
        .controller("FriendsController", FriendsController);

    function FriendsController($routeParams, $rootScope, ProjectUserService) {
        var vm = this;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.userId = $routeParams["uid"];
    }

        function init() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = angular.copy(response.data);
                    vm.friends = vm.user.friends;
                    $rootScope.currentUser = vm.user;
                });
        }
        init();

})();