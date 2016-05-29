/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService) {
        var vm = this;
        vm.addUser = addUser;

        function addUser() {
            if (vm.user.password !== vm.user.password2) {
                vm.error = "Passwords do not match"
            }
            else {
                var newUser = {
                    "_id": (new Date).getTime().toString(),
                    "username": vm.user.username,
                    "password": vm.user.password
                };

                UserService.createUser(newUser);
                $location.url("/user/" + newUser._id);
            }
        }
    }
})();
