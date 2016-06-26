/**
 * Created by rachanadeshmukh on 6/3/16.
 */
(function() {
    angular
        .module("Vibe")
        .controller("SearchArtistController", SearchArtistController);

    function SearchArtistController($rootScope, $scope, $routeParams, $location, ProjectUserService) {
        $rootScope.landing = false;
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.searched = false;
        vm.events = [];
        vm.searchArtist = searchArtist;

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
})();