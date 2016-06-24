/**
 * Created by rachanadeshmukh on 6/3/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("SearchArtistController", SearchArtistController)
        .controller("ArtistListController", ArtistListController);

    function SearchArtistController($rootScope, $scope, $routeParams, $location, ProjectUserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searched = false;
        vm.events = [];
        vm.searchArtist = searchArtist;
        $rootScope.landing = false;

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

        function searchArtist() {
            vm.inputArtist = vm.artist;
            if(isGuest()) {
                $location.url("/searchArtist/" +vm.inputArtist);
            }
            else {
                $location.url("/user/"+vm.userId+"/searchArtist/" +vm.inputArtist);
            }
        }
    }

    function ArtistListController($rootScope, $scope, $location, $routeParams, FMService, ProjectUserService, SongkickService) {
        vm = this;
        $rootScope.landing = false;
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