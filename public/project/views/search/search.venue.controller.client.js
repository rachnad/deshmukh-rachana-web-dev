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
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.userId = $routeParams.uid;
        vm.searched = false;
        vm.event=[];
        vm.searchVenue = searchVenue;


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

    function VenueListController($rootScope, $scope, $routeParams, SongkickService) {
        vm = this;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.userId = $routeParams.uid;
        vm.searched = true;
        vm.venue = $routeParams.venue;

        function init() {
            console.log('test');
            SongkickService
                .searchVenue(vm.venue)
                .then(function(events) {
                    vm.searchedVenue = events.resultsPage.results.venue[0];
                    SongkickService
                        .getvenueCalender(vm.searchedVenue.id)
                        .then(function(response) {
                            vm.venueCalender = response.resultsPage.results.event;
                            console.log(vm.venueCalender)
                            $scope.$apply()
                        });
                })
        };
        init();
    }
})();