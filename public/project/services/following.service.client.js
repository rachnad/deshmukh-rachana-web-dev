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
            getFollows: getFollows,
            getFollowingsForUserandArtist: getFollowingsForUserandArtist
        };

        return api;

        function followArtist(userId, artist) {
            var artist = {
                "userId": userId,
                "artistName": artist.name
            };
            return $http.post("/follow", artist);
        }

        function getFollows(userId) {
            return $http.get("/following/" + userId);
        }

        function getFollowingsForUserandArtist(userId, artist) {
            return $http.get("/following/user/" +userId + "/artist/" + artist);
        }

    }
}) ();