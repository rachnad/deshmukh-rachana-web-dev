/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("RegisterController", RegisterController);


    function RegisterController($location, UserService) {
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
                    var result = UserService.findUserByCredentials(vm.user.username, vm.user.password);

                    if (result !== null) {
                        vm.error = "User already exists"
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
        }
    }
})();
