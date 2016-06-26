/**
 * Created by rachanadeshmukh on 6/5/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("AttendingsController", AttendingsController);

    function AttendingsController($rootScope, $routeParams, ProjectUserService, AttendingsService) {
        var vm = this;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.userId = $routeParams["uid"];
        vm.getAttendings = getAttendings;

        function init() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = angular.copy(response.data);
                });
            $rootScope.currentUser = vm.user;

            getAttendings();
        }
        init();


        function getAttendings() {
            AttendingsService
                .getAttendings(vm.userId)
                .then(function(response) {
                    vm.attendings = response.data;
                })

        }
    }

})();