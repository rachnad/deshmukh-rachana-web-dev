/**
 * Created by rachanadeshmukh on 6/3/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("SearchVenueController", SearchVenueController);

    function SearchVenueController($routeParams, $rootScope, $location, ProjectUserService) {
        var vm = this;
        $rootScope.landing = false;
        vm.userId = $routeParams.uid;
        vm.searched = false;
        vm.event=[];
        vm.searchVenue = searchVenue;


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

        function searchVenue() {
            vm.inputVenue = vm.venue;
            if(isGuest()) {
                $location.url("/searchVenue/" +vm.inputVenue);
            }
            else {
                $location.url("/user/"+vm.userId+"/searchVenue/" +vm.inputVenue);
            }
        }
    }
})();