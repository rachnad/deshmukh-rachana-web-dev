/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {


            if (username == undefined || password == undefined) {
                vm.error = "Fill out all required fields"
            }

            else {
                vm.error = "";

                var user = {
                    username: username,
                    password: password
                };
                UserService
                    .login(user)
                    .then(function (response) {
                        var user = response.data;
                        if (user) {
                            $rootScope.currentUser = user;
                            var id = user._id;
                            $location.url("/user/" + id);
                        }
                        else {
                            vm.error = "User not found";
                        }
                    });
            }
        }

    }
})();