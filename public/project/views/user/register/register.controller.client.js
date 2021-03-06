/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, ProjectUserService) {
        $rootScope.landing = false;
        var vm = this;
        vm.addUser = addUser;

        function addUser() {
            if (vm.user == undefined || vm.user.username == undefined || vm.user.password == undefined
                || vm.user.password == undefined || vm.user.type === undefined) {
                vm.error = "Fill out all required fields"
            }
            else {
                if (vm.user.password !== vm.user.password2) {
                    vm.error = "Passwords do not match"
                }
                else {
                    ProjectUserService
                        .findUserByCredentials(vm.user.username, vm.user.password)
                        .then(function(response) {
                            var result = response.data;
                            if (result.length > 0) {
                                vm.error = "User already exists"
                            }
                            else {
                                var newUser = {
                                    "username": vm.user.username,
                                    "password": vm.user.password,
                                    "type": vm.user.type
                                };
                                ProjectUserService
                                    .register(newUser)
                                    .then(function(response) {
                                        console.log(response.data);
                                        var user = response.data;
                                        $rootScope.currentUser = user;
                                        $rootScope.loggedIn = true;
                                        $location.url("/user/" + user._id);
                                    })
                            }
                        })
                }
            }
        }
    }
})();
