/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, UserService) {
        var vm = this;
        vm.login = login;
        vm.showPic = false;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if (user) {
                var id = user._id;
                $rootScope.currentUser = user;
                $location.url("/user/" + id);
            }
            else {
                vm.error = "User not found";
            }
        }
    }
})();