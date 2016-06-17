/**
 * Created by rachanadeshmukh on 6/13/16.
 */

(function() {
    angular
        .module("Vibe")
        .factory("CommentsService", CommentsService);

    function CommentsService($http) {

        var api = {
            postComment: postComment,
            getComments: getComments
        };

        return api;

        function postComment(comment) {
            return $http.post("/api/comment", comment);
        }

        function getComments(eventId) {
            return $http.get("/comments/" + eventId);
        }

    }
}) ();