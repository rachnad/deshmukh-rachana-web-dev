/**
 * Created by rachanadeshmukh on 2/23/16.
 */
(function(){
    "use strict";
    angular
        .module("Vibe")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $routeParams, $location, $rootScope) {

        $scope.gotoSearch = gotoSearch;
        $scope.gotoProfile = gotoProfile;
        $scope.logout = logout;


        function gotoSearch() {
            $location.url("/user/"+$routeParams.uid+"/search");

        }

        function gotoProfile() {
            $location.url("/user/" +$routeParams.uid);

        }

        function logout() {
            $rootScope.currentUser= null;
            $rootScope.loggedIn= false;
            $location.url("/landing");

        }

    }



})();