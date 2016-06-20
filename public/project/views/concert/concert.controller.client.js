/**
 * Created by rachanadeshmukh on 5/31/16.
 */
(function(){
    "use strict";
    angular
        .module("Vibe")
        .controller("ConcertController", ConcertController);

    function ConcertController($scope, $routeParams, $rootScope, SongkickService, FMService, FollowingService, CommentsService, FavoriteService, ProjectUserService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.eventId = $routeParams.eid;
        $rootScope.loggedIn = true;
        vm.getArtistImage = getArtistImage;
        vm.followArtist = followArtist;
        vm.addComment = addComment;
        vm.getComments = getComments;
        vm.attendEvent = attendEvent;
        vm.getAttendings = getAttendings;
        vm.isAttending = isAttending;

        function init() {
            $rootScope.loggedIn = true;
            vm.userId = $routeParams.uid;
            SongkickService
                .getEventDetails(vm.eventId)
                .then(function(response) {
                    vm.concert = response.resultsPage.results.event;
                    vm.artist = vm.concert.performance[0].artist;
                    vm.getArtistImage();
                });

            ProjectUserService
                .findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user.data;
                });

            isAttending();
            getComments();
            getAttendings();
            isPremium();

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

        function attendEvent() {
            var event = {
                uid: vm.userId,
                eid: vm.eventId,
                username: vm.user.username,
                eventName: vm.concert.displayName
            };

            FavoriteService
                .favorite(event)
                .then(function(response) {
                    vm.attending = true;
                })
        }

        function addComment() {
            var comment = {
                userId: vm.userId,
                username: vm.user.username,
                eventId: vm.eventId,
                comment: vm.commentInput
            };
            if (vm.commentInput) {

            CommentsService
                .postComment(comment)
                .then(function () {
                    getComments()
                })
        }

        }

        function getComments() {
            CommentsService
                .getComments(vm.eventId)
                .then(function(comments) {
                    vm.comments = comments.data;
                })
        }


        function getAttendings() {
            FavoriteService
                .showAttendings(vm.eventId)
                .then(function(response) {
                    vm.attendings = response.data;
                })
        }


        function isPremium() {
            ProjectUserService
                .findUserById(vm.userId)
                .then(
                    function(user) {
                        vm.premium = (user.data.type[0] === "Premium");
                    }
                )
        }

        function isAttending() {
            FavoriteService
                .getAttendingForUserandEvent(vm.userId, vm.eventId)
                .then(
                    function(attendings) {
                        if(attendings.data.length > 0) {
                            vm.attending = true;
                        }
                        else {
                            vm.attending = false;
                        }
                    }
                )
        }
    }



})();