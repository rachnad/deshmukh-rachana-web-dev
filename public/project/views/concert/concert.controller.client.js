/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function(){
    "use strict";
    angular
        .module("Vibe")
        .controller("ConcertController", ConcertController);

    function ConcertController($routeParams, $rootScope, SongkickService, FMService, FollowingService) {
        var vm = this;
        vm.getArtistImage = getArtistImage;
        vm.followArtist = followArtist;
        vm.eventId = $routeParams.eid;

        function init() {
            $rootScope.loggedIn = true;
            vm.userId = $routeParams.uid;
            SongkickService
                .getEventDetails(vm.eventId)
                .then(function(response) {
                    vm.concert = response.data.resultsPage.results.event;
                    vm.artist = vm.concert.performance[0].artist;
                    vm.getArtistImage();
                });

        }
        init();


        function getArtistImage() {
            FMService
                .getArtistInfo(vm.artist.displayName)
                .then(function(response) {
                    vm.artistImage = response.data.artist.image[3]['#text'];
                    vm.artistImageMobile = response.data.artist.image[1]['#text'];
                })

        }

        function followArtist() {
            FollowingService
                .followArtist(vm.userId, vm.artist)
                .then(function(response) {
                console.log("Following: " + response.data);
            })

        }

        function favoriteEvent() {

        }
    }



})();