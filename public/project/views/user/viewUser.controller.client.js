/**
 * Created by rachanadeshmukh on 6/18/16.
 */

(function() {
    angular
        .module("Vibe")
        .controller("ViewUserController", ViewUserController);

    function ViewUserController($rootScope, $scope, $routeParams, ProjectUserService, FollowingService, FavoriteService) {
        var vm = this;
        vm.viewUserId = $routeParams.userID;
        vm.userId = $routeParams.uid;
        $rootScope.loggedIn = true;
        vm.addFriend = addFriend;
        vm.unFriend = unFriend;


        function init() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user.data;
                    ProjectUserService
                        .findUserById(vm.viewUserId)
                        .then(function(user) {
                            vm.viewUser = user.data;
                            vm.sameUser = (vm.viewUser.username === vm.user.username);
                            ProjectUserService
                                .findUserbyFriendID(vm.user._id, vm.viewUser._id)
                                .then(function(user) {
                                    vm.isAdded = (user.data.length > 0);
                                    getAttendings();
                                    getFollowings();
                                })
                        });
                });
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

        function addFriend() {
            ProjectUserService
                .findUserById(vm.user._id)
                .then(
                    function(response) {
                        var user = response.data;
                        user.friends.push(vm.viewUser._id);
                        delete user._id;
                        ProjectUserService
                            .updateUser(vm.user._id, user)
                            .then(
                                function(response) {
                                    vm.isAdded = true;
                                    //$scope.$apply();
                                }
                            )
                    }
                )
        }

        function unFriend() {
            ProjectUserService
                .findUserById(vm.user._id)
                .then(
                    function(response) {
                        var user = response.data;
                        var fIndex = user.friends.indexOf(vm.viewUser._id);
                        user.friends.splice(fIndex, 1);
                        delete user._id;
                        ProjectUserService
                            .updateUser(vm.user._id, user)
                            .then(
                                function(response) {
                                    vm.isAdded = false;
                                    //$scope.$apply();
                                }
                            )
                    }
                )
        }
    }
})();