/**
 * Created by rachanadeshmukh on 6/3/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("SearchVenueController", SearchVenueController)
        .controller("VenueListController", VenueListController);

    function SearchVenueController($routeParams, $rootScope, $location, ProjectUserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searched = false;
        vm.event=[];
        vm.searchVenue = searchVenue;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;

        function init() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(function(response) {
                    vm.user = response.data;
                    $rootScope.currentUser = vm.user;
                })
        }
        init();

        function searchVenue() {
            vm.inputVenue = vm.venue;
            $location.url("/user/"+vm.userId+"/searchVenue/" +vm.inputVenue);
        }
    }

    function VenueListController($routeParams, SongkickService) {
        vm = this;
        vm.userId = $routeParams.uid;
        vm.searched = true;
        vm.venue = $routeParams.venue;
        SongkickService
            .searchVenue(vm.venue)
            .then(function(events) {
                vm.searchedVenue = events.data.resultsPage.results.venue[0];
                SongkickService
                    .getvenueCalender(vm.searchedVenue.id)
                    .then(function(response) {
                        vm.venueCalender = response.data.resultsPage.results.event;
                    });
            });
    }
})();