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
            var result = UserService.updateUser(vm.userId, vm.user);
            if(result === true) {
                vm.success = "User successfully updated";
            } else {
                vm.error = "User not found";
            }
        }
    }

})();
