/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $routeParams, $location, ProjectUserService) {
        var vm = this;
        $rootScope.loggedIn = true;
        $rootScope.landing = false;
        vm.userId = $routeParams.uid;

        function init() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = response.data;
                    $rootScope.currentUser = vm.user;
                })
        }
        init();
    }
})();