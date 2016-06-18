/**
 * Created by rachanadeshmukh on 6/5/16.
 */

(function(){
    "use strict";
    angular
        .module("Vibe")
        .controller("ArtistController", ArtistController);

    function ArtistController($routeParams, $rootScope, SongkickService, FMService, FollowingService, CommentsService, ProjectUserService) {
        var vm = this;
        vm.artistName = $routeParams.aid;
        vm.userId = $routeParams.uid;
        vm.followArtist = followArtist;
        vm.getSimilarArtists = getSimilarArtists;

        function init() {
            FMService
                .getArtistInfo(vm.artistName)
                .then(function (response) {
                    vm.artist = response.data.artist;
                    vm.artistImage = vm.artist.image[2]['#text'];
                    //vm.tags = vm.artist.tags;
                    console.log(vm.artistImage);
                })
        }

        init();
        getSimilarArtists();


        function followArtist() {
            FollowingService
                .followArtist(vm.userId, vm.artist)
                .then(function (response) {
                    console.log("Following: " + response.data);
                })

        }

        function getSimilarArtists() {
            FMService
                .getSimilar(vm.artistName)
                .then(function (response) {
                    vm.similars = response.data.similarartists.artist;
                    vm.similars.length = 5;
                })
        }


    }

})();