/**
 * Created by rachanadeshmukh on 6/5/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("FollowingController", FollowingController);

    function FollowingController($rootScope, $routeParams, ProjectUserService, FollowingService, FMService) {
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.getFollowing= getFollowing;


        function init() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = angular.copy(response.data);
                });
            $rootScope.currentUser = vm.user;
            vm.getFollowing();
        }
        init();


        function getFollowing() {
            FollowingService
                .getFollows(vm.userId)
                .then(function(response) {
                    vm.follows = response.data;
                })
        }

    }

})();