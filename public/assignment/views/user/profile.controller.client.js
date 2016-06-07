/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        //get userID from url



        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = angular.copy(response.data);
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
                UserService
                    .updateUser(vm.userId, vm.user)
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
    }
})();
