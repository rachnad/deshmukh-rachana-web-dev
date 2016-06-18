/**
 * Created by rachanadeshmukh on 6/5/16.
 */
(function() {
    angular
        .module("Vibe")
        .factory("FavoriteService", FavoriteService);

    function FavoriteService($http) {

        var api = {
            favorite: favorite,
            unfavorite: unfavorite,
            getAttendings: getAttendings,
            showAttendings: showAttendings

        };

        return api;

        function showAttendings(eventId) {
            return $http.get("/attendings/" + eventId);
        }

        function getAttendings(userId) {
            return $http.get("/favorites/"+userId);
        }

        function favorite(event) {
            return $http.post("/attend/", event);
        }

        function unfavorite() {


        }

    }
}) ();