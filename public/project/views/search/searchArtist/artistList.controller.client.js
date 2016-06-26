/**
 * Created by rachanadeshmukh on 6/26/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("ArtistListController", ArtistListController);

    function ArtistListController($rootScope, $scope, $location, $routeParams, FMService, ProjectUserService, SongkickService) {
        $rootScope.landing = false;
        vm = this;
        vm.userId = $routeParams.uid;
        vm.searched = true;
        vm.artist = $routeParams.artist;
        vm.isPremium = isPremium;
        vm.gotoEvent = gotoEvent;

        function init() {
            if(!isGuest()) {
                $rootScope.loggedIn = true;
            }
            SongkickService.searchArtist(vm.artist)
                .then(function (response) {
                    vm.searchedArtist = response.resultsPage.results.artist[0];
                    SongkickService.getartistCalender(vm.searchedArtist.id)
                        .then(function (response) {
                            var artistCalender = response.resultsPage.results.event;
                            vm.artistCalender = artistCalender;
                            $scope.$apply();
                        })
                })
        }
        init();
        isPremium();

        function isGuest() {
            var guest = $routeParams.uid;
            if(guest===undefined) {
                return true;
            }
        }


        function isPremium() {
            if(!isGuest()) {
                ProjectUserService
                    .findUserById(vm.userId)
                    .then(
                        function (user) {
                            vm.premium = (user.data.type[0] === "Premium");
                        }
                    )
            }
        }

        function gotoEvent(event) {
            if(isGuest()) {
                $location.url("/login")
            }
            else {
                $location.url("/user/"+vm.userId+"/searchArtist/"+vm.artist+"/details/" + event.id);
            }
        }
    }
})();