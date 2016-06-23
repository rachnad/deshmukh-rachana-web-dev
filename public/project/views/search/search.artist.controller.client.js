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

        function searchArtist() {
            vm.inputArtist = vm.artist;
            $location.url("/user/"+vm.userId+"/searchArtist/" +vm.inputArtist);
        }
    }

    function ArtistListController($rootScope, $scope, $routeParams, FMService, ProjectUserService, SongkickService) {
        vm = this;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.userId = $routeParams.uid;
        vm.searched = true;
        vm.artist = $routeParams.artist;
        vm.isPremium = isPremium;

        function init() {
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


        function isPremium() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(
                    function(user) {
                        vm.premium = (user.data.type[0] === "Premium");
                    }
                )
        }




    }
})();