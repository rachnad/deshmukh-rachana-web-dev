/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function(){
    "use strict";
    angular
        .module("Vibe")
        .controller("ConcertController", ConcertController);

    function ConcertController($routeParams, $location, EventfulService, FMService) {
        var vm = this;
        vm.getArtistImage = getArtistImage;
        vm.eventId = $routeParams.eid;

        function init() {
            vm.event = EventfulService.getEventDetails(vm.eventId);
            vm.artist = vm.event.performance[0].artist.displayName;

            vm.getArtistImage();
        }
        init()


        function getArtistImage() {
            FMService
                .getArtistImage(vm.artist)
                .then(function(response) {
                    vm.artistImage = response.data.artist.image[3]['#text'];
                    vm.artistImageMobile = response.data.artist.image[1]['#text'];
                })

        }
    }



})();