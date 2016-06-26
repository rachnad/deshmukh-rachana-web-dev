/**
 * Created by rachanadeshmukh on 6/26/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("VenueListController", VenueListController);

    function VenueListController($rootScope, $scope, $routeParams, $location, SongkickService) {
        vm = this;
        $rootScope.landing = false;
        vm.userId = $routeParams.uid;
        vm.searched = true;
        vm.venue = $routeParams.venue;
        vm.gotoEvent = gotoEvent;

        function init() {
            if(!isGuest()) {
                $rootScope.loggedIn = true;
            }
            SongkickService
                .searchVenue(vm.venue)
                .then(function(events) {
                    vm.searchedVenue = events.resultsPage.results.venue[0];
                    SongkickService
                        .getvenueCalender(vm.searchedVenue.id)
                        .then(function(response) {
                            vm.venueCalender = response.resultsPage.results.event;
                            console.log(vm.venueCalender);
                            $scope.$apply()
                        });
                })
        };
        init();

        function isGuest() {
            var guest = $routeParams.uid;
            if(guest===undefined) {
                return true;
            }
        }

        function gotoEvent(event) {
            if(isGuest()) {
                $location.url("/login")
            }
            else {
                $location.url("/user/"+vm.userId+"/searchVenue/"+vm.venue+"/details/" + event.id);
            }
        }

    }
})();