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

    function ArtistListController($rootScope, $scope, $routeParams, FMService, SongkickService) {
        vm = this;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;
        vm.userId = $routeParams.uid;
        vm.searched = true;
        vm.artist = $routeParams.artist;


        //vm.searchedArtist = SongkickService.searchArtist(vm.artist);
        //vm.artistCalender = SongkickService.getartistCalender(vm.searchedArtist.id);


        SongkickService.searchArtist(vm.artist)
            .then(function(response) {
                vm.searchedArtist = response.resultsPage.results.artist[0];
                console.log(vm.searchedArtist);
                SongkickService.getartistCalender(vm.searchedArtist.id)
                    .then(function(response) {
                        var artistCalender = response.resultsPage.results.event;
                        vm.artistCalender = artistCalender;
                        console.log(vm.artistCalender);
                        $scope.$apply();
                    })
            })




    }
})();