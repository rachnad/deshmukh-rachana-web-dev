/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("SearchController", SearchController);

    function SearchController($rootScope, $routeParams, $location, ProjectUserService) {
        var vm = this;
        $rootScope.landing = false;
        vm.userId = $routeParams.uid;
        vm.gotoArtistSearch = gotoArtistSearch;
        vm.gotoVenueSearch = gotoVenueSearch;

        function init() {
            if (!isGuest()) {
                $rootScope.loggedIn = true;
                ProjectUserService
                    .findUserById(vm.userId)
                    .then(function (response) {
                        vm.user = response.data;
                        $rootScope.currentUser = vm.user;
                    })
            }
        }
        init();

        function isGuest() {
            var guest = $routeParams.uid;
            if(guest===undefined) {
                return true;
            }
        }

        function gotoArtistSearch() {
            if(!isGuest()) {
                $location.url("/user/"+vm.userId+"/searchArtist");
            }
            else {
                $location.url("/searchArtist");
            }
        }

        function gotoVenueSearch() {
            if(!isGuest()) {
                $location.url("/user/"+vm.userId+"/searchVenue");
            }
            else {
                $location.url("/searchVenue");
            }
        }
    }
})();