/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("RegisterController", RegisterController);


    function RegisterController($rootScope, $location, UserService) {
        $rootScope.landing = false;
        var vm = this;
        vm.addUser = addUser;

        function addUser() {
            console.log(vm.user);

            if (vm.user == undefined || vm.user.username == undefined || vm.user.password == undefined || vm.user.password == undefined) {
                vm.error = "Fill out all required fields"
            }

            else {
                if (vm.user.password !== vm.user.password2) {
                    vm.error = "Passwords do not match"
                }
                else {
                    UserService
                        .findUserByCredentials(vm.user.username, vm.user.password)
                        .then(function(response) {
                            var result = response.data;

                            if (result) {
                                vm.error = "User already exists"
                            }
                            else {
                                var newUser = {
                                    "_id": (new Date).getTime().toString(),
                                    "username": vm.user.username,
                                    "password": vm.user.password
                                };
                                UserService
                                    .createUser(newUser)
                                    .then(function(response) {
                                        $rootScope.currentUser = newUser;
                                        $rootScope.loggedIn = true;
                                        $location.url("/user/" + newUser._id);
                                    })
                            }
                        })

                }
            }
        }
    }
})();
