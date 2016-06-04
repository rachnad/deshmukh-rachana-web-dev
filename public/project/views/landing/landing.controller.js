/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("LandingController", LandingController);

    function LandingController($rootScope, $location) {
        $rootScope.landing = true;
        var vm = this;
        vm.user = $rootScope.currentUser;
        vm.guestLogin = guestLogin;

        function guestLogin() {
            $rootScope.isGuest = true;
            var newUser = {
                "_id": (new Date).getTime().toString()
            };

            $rootScope.currentUser = newUser;
            $location.url("/user/" + newUser._id);
        }
    }
})();