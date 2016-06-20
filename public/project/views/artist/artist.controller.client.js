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
        $rootScope.loggedIn = true;
        vm.followArtist = followArtist;
        vm.unfollowArtist = unfollowArtist;
        vm.getSimilarArtists = getSimilarArtists;

        function init() {
            FMService
                .getArtistInfo(vm.artistName)
                .then(function (response) {
                    vm.artist = response.data.artist;
                    vm.artistImage = vm.artist.image[2]['#text'];
                    vm.artistBio = (vm.artist.bio.summary).replace(/(<([^>]+)>)/ig,"");
                })
        }

        init();
        getSimilarArtists();
        isFollowing();


        function followArtist() {
            FollowingService
                .followArtist(vm.userId, vm.artist)
                .then(function (response) {
                    vm.following = true;
                })

        }

        function unfollowArtist() {
            console.log(vm.artist);
            FollowingService
                .unfollowForUserandArtist(vm.userId, vm.artist.name)
                .then(function(response) {
                    vm.following = false;
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

        function isFollowing() {
            FollowingService
                .getFollowingsForUserandArtist(vm.userId, vm.artistName)
                .then(
                    function(response) {
                        vm.following = (response.data.length > 0);
                        console.log(vm.following);
                    }
                )
        }


    }

})();