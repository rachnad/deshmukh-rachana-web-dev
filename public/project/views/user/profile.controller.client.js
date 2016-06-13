/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $routeParams, ProjectUserService) {
        var vm = this;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.updateUser = updateUser;
        //get userID from url
        vm.userId = $routeParams["uid"];


        function init() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = angular.copy(response.data);
                });
            $rootScope.currentUser = vm.user;
        }
        init();

        function updateUser() {
            vm.success = "";
            if (vm.user.username == undefined || vm.user.firstName == undefined || vm.user.lastName == undefined) {
                vm.error = "All fields are not filled out"
            }
            else {
                vm.error = "";
                ProjectUserService
                    .updateUser(vm.userId, vm.user)
                    .then(function(response) {
                        var result = response.data;

                        if (result === true) {

                            vm.success = "User successfully updated";
                        } else {
                            vm.error = "User not found";
                        }
                    })
            }

        }
    }

})();