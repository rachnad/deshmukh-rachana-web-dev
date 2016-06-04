/**
 * Created by rachanadeshmukh on 6/3/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("SearchArtistController", SearchArtistController)
        .controller("ArtistListController", ArtistListController);

    function SearchArtistController($rootScope, $routeParams, $location, UserService, EventfulService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searched = false;
        vm.events = [];
        vm.searchArtist = searchArtist;
        $rootScope.landing = false;
        $rootScope.loggedIn = true;

        function init() {
            UserService
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

    function ArtistListController($routeParams, EventfulService) {
        vm = this;
        vm.userId = $routeParams.uid;
        vm.searched = true;
        vm.artist = $routeParams.artist;
        vm.events = EventfulService.searchArtist(vm.artist);
    }
})();