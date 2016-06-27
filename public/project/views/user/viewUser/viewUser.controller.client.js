/**
 * Created by rachanadeshmukh on 6/18/16.
 */

(function() {
    angular
        .module("Vibe")
        .controller("ViewUserController", ViewUserController);

    function ViewUserController($rootScope, $scope, $routeParams, ProjectUserService, FollowingService, AttendingsService) {
        $rootScope.loggedIn = true;
        var vm = this;
        vm.viewUserId = $routeParams.userID;
        vm.userId = $routeParams.uid;
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
                                .findUserbyFriendID(vm.user._id, vm.viewUser.username)
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
            AttendingsService
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
                        if(!(user.friends.indexOf(vm.viewUser.username) > -1)) {
                            user.friends.push(vm.viewUser.username);
                            ProjectUserService
                                .findUserByUsername(vm.viewUser.username)
                                .then(
                                    function(response) {
                                        var friend = response.data;
                                        friend.friends.push(user.username);
                                    }
                                )
                        }
                        delete user._id;
                        delete friend._id;
                        ProjectUserService
                            .updateUser(vm.user._id, user)
                            .then(
                                ProjectUserService
                                    .updateUser(vm.viewUser._id, friend)
                                    .then(function(response) {
                                        vm.isAdded = true;
                                    })
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
                        var fIndex = user.friends.indexOf(vm.viewUser.username);
                        user.friends.splice(fIndex, 1);
                        delete user._id;
                        ProjectUserService
                            .updateUser(vm.user._id, user)
                            .then(
                                function(response) {
                                    vm.isAdded = false;
                                }
                            )
                    }
                )
        }
    }
})();