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
            getFavorites: getFavorites

        }

        return api;

        function getFavorites(userId) {
            return $http.get("/favorites/"+userId);
        }

        function favorite() {

        }

        function unfavorite() {


        }

    }
}) ();