/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;
        //get userID from url
        vm.userId = $routeParams["uid"];


        function init() {
            vm.user = angular.copy(UserService.findUserById(vm.userId));
        }
        init();

        function updateUser() {
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