/**
 * Created by rachanadeshmukh on 6/5/16.
 */
(function() {
    angular
        .module("Vibe")
        .factory("FollowingService", FollowingService);

    function FollowingService($http) {

        var api = {
            followArtist: followArtist,
            getFollows: getFollows
        };

        return api;

        function followArtist(userId, artistName) {
            var artist = {
                "userId": userId,
                "artist": artistName
            };
            return $http.post("/follow", artist);
        }

        function getFollows(userId) {
            return $http.get("/following/" + userId);
        }

    }
}) ();