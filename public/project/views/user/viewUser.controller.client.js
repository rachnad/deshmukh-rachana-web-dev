/**
 * Created by rachanadeshmukh on 6/18/16.
 */

(function() {
    angular
        .module("Vibe")
        .controller("ViewUserController", ViewUserController);

    function ViewUserController($rootScope, $routeParams, ProjectUserService, FollowingService, FavoriteService) {
        var vm = this;
        vm.viewUserId = $routeParams.userID;
        vm.userId = $routeParams.uid;
        $rootScope.loggedIn = true;



        function init() {
            ProjectUserService
                .findUserById(vm.viewUserId)
                .then(function(user) {
                    vm.viewUser = user.data;
                    getAttendings();
                    getFollowings();
                });

            ProjectUserService
                .findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user.data;
                })



        }
        init();


        function getAttendings() {
            FavoriteService
                .getAttendings(vm.viewUser._id)
                .then(function(attendings) {
                    vm.attendings = attendings.data;
                })

        }

        function getFollowings() {
            FollowingService
                .getFollows(vm.viewUser._id)
                .then(function(followings) {
                    vm.followings = followings.data;
                })

        }


    }
})();