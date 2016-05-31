/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("MainController", MainController);

    function MainController($rootScope, $location) {
        var vm = this;
        vm.user = $rootScope.currentUser;
        vm.gotoProfile = gotoProfile;
        console.log(vm.user);

        function gotoProfile() {
            $location.url("/user/" + user._id);
        }

    }
})();