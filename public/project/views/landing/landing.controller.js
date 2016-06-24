/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("LandingController", LandingController);

    function LandingController($rootScope, $scope, $location, ProjectUserService) {
        $rootScope.landing = true;
        var vm = this;
        vm.user = $rootScope.currentUser;
        vm.guestLogin = guestLogin;

        function guestLogin() {
            $rootScope.loggedIn = false;
            $rootScope.currentUser= null;
            $location.url("/search");

        }
    }
})();