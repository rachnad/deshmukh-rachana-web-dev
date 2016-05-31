/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        //get userID from url
        vm.userId = $routeParams["uid"];


        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function(response) {
                    console.log(response.data);
                    vm.user = angular.copy(response.data);
                });
        }
        init();

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