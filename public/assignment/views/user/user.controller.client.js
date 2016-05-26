/**
 * Created by rachanadeshmukh on 5/23/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController);

        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;

            function login(username, password) {
                var user = UserService.findUserByCredentials(username, password);
                if (user) {
                    var id = user._id;
                    $location.url("/user" + id);
                }
                else {
                    vm.error = "User not found";
                }
            }
        }

        function RegisterController() {}

})();