/**
 * Created by rachanadeshmukh on 6/3/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("SearchArtistController", SearchArtistController)
        .controller("ArtistListController", ArtistListController);

    function SearchArtistController($rootScope, $routeParams, $location, ProjectUserService) {
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

    function ArtistListController($routeParams, FMService, SongkickService) {
        vm = this;
        vm.userId = $routeParams.uid;
        vm.searched = true;
        vm.artist = $routeParams.artist;

        SongkickService.searchArtist(vm.artist)
            .then(function(response) {
                vm.searchedArtist = response.data.resultsPage.results.artist[0]
                SongkickService.getartistCalender(vm.searchedArtist.id)
                    .then(function(response) {
                        vm.artistCalender = response.data.resultsPage.results.event;
                        console.log(vm.artistCalender)
                    })
            })


    }
})();