/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("ProfileController", ProfileController);

    function ProfileController($location,$rootScope, $routeParams, ProjectUserService) {
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;
        vm.logout = logout;

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
                delete vm.user._id;
                ProjectUserService
                    .updateUser(vm.userId, vm.user)
                    .then(function(response) {
                        var result = response.data;
                        if (result) {
                            vm.success = "User successfully updated";
                        } else {
                            vm.error = "User not found";
                        }
                    })
            }

        }

        function logout() {
            $rootScope.currentUser= null;
            $rootScope.loggedIn= false;
            $location.url("/landing");
        }
    }

})();