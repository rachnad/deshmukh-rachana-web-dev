/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($q, $rootScope, $routeParams, $http, $location, UserService, $timeout) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = angular.copy(response.data);
                    $rootScope = vm.user;
                });
        }
        init();

        function unregister() {
            UserService
                .deleteUser(vm.userId)
                .then(function(response) {
                    $location.url("/login");
                });
        }

        function updateUser() {
            vm.success = "";
            if (vm.user.username == undefined || vm.user.firstName == undefined || vm.user.lastName == undefined) {
                vm.error = "All fields are not filled out"
            }
            else {
                vm.error = "";
                vm.updatedUser = vm.user;
                delete vm.updatedUser._id;
                UserService
                    .updateUser(vm.userId, vm.updatedUser)
                    .then(function(response) {
                        var result = response.data;
                        if (result) {
                            vm.success = "User successfully updated";
                        } else {
                            vm.error = "User not found";
                        }

                    });
            }
        }

        function logout() {
            UserService
                .logout()
                .then(function(response) {
                    $rootScope.currentUser = null;
                    $location.url("/login");
                });
        }

    }
})();
