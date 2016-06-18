/**
 * Created by rachanadeshmukh on 6/18/16.
 */

(function() {
    angular
        .module("Vibe")
        .controller("ViewUserController", ViewUserController);

    function ViewUserController($rootScope, $routeParams, ProjectUserService) {
        var vm = this;
        vm.viewUserId = $routeParams.userID;
        vm.userId = $routeParams.uid;
        $rootScope.loggedIn = true;



        function init() {
            ProjectUserService
                .findUserById(vm.viewUserId)
                .then(function(user) {
                    vm.viewUser = user;
                });

            ProjectUserService
                .findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user;
                })

        }
        init()


    }
})();