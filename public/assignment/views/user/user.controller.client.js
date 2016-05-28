/**
 * Created by rachanadeshmukh on 5/23/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;

            function login(username, password) {
                var user = UserService.findUserByCredentials(username, password);
                if (user) {
                    var id = user._id;
                    $location.url("/user/" + id);
                }
                else {
                    vm.error = "User not found";
                }
            }
        }

        function RegisterController($location, UserService) {
            var vm = this;
            vm.addUser = addUser;

            function addUser() {
                var newUser = {"_id": (new Date).getTime().toString(),
                                "username": vm.user.username,
                                "password": vm.user.password
                };

                UserService.createUser(newUser);
                $location.url("/user/" + newUser._id);
            }
        }

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