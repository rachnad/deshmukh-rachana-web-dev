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
            vm.user = angular.copy(UserService.findUserById(vm.userId));
            console.log(vm.user);
        }
        init();

        function updateUser() {
            console.log(vm.user);
            vm.success = "";
            if (vm.user.username == undefined || vm.user.firstName == undefined || vm.user.lastName == undefined) {
                vm.error = "All fields are not filled out"
            }
            else {
                vm.error = "";
                var result = UserService.updateUser(vm.userId, vm.user);
                if (result === true) {

                    vm.success = "User successfully updated";
                } else {
                    vm.error = "User not found";
                }
            }

        }
    }

})();
