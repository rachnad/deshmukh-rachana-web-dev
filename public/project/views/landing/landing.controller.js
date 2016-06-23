/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("LandingController", LandingController);

    function LandingController($rootScope, $location, ProjectUserService) {
        $rootScope.landing = true;
        var vm = this;
        vm.user = $rootScope.currentUser;
        vm.guestLogin = guestLogin;

        function guestLogin() {
            var newUser = {type: "Standard"};
            ProjectUserService
                .createUser(newUser)
                .then(function(user) {
                    $rootScope.isGuest = true;
                    $rootScope.currentUser = user.data;
                    $location.url("/user/" + user.data._id +"/search");
                })
        }
    }
})();