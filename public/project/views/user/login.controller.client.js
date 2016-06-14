/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, $location, ProjectUserService) {
        $rootScope.landing = false;
        $rootScope.loggedIn = false;
        var vm = this;
        vm.login = login;
        vm.showPic = false;


        function login(username, password) {
            ProjectUserService
                .findUserByCredentials(username, password)
                .then(function(response) {
                    var user = response.data[0];
                    if (user) {
                        var id = user._id;
                        $rootScope.currentUser = user;
                        $rootScope.loggedIn = true;
                        $rootScope.landing = true;
                        $location.url("/user/" + id);
                    }
                    else {
                        vm.error = "User not found";
                    }
                })
        }
    }
})();