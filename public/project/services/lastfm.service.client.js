/**
 * Created by rachanadeshmukh on 6/3/16.
 */

(function() {
    angular
        .module("Vibe")
        .factory("FMService", FMService);
    function FMService($http) {

        var key = "b7469d1ccf4a3edc28af4b5bdfe3b5a7";
        var secret = "f093fe9a81d39432a996e3c6ca5d4f1b";

        var baseURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=ARTIST&api_key=APIKEY&format=json";

        var similarURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=ARTIST&api_key=APIKEY&format=json";

        var api={
            getArtistInfo : getArtistInfo,
            getSimilar: getSimilar
        };
        return api;

        function getArtistInfo(artist) {
            var url = baseURL.replace("APIKEY", key).replace("ARTIST", artist);
            return $http.get(url);
        }

        function getSimilar(artist) {
            var url = similarURL.replace("ARTIST", artist).replace("APIKEY", key);
            return $http.get(url);
        }

    }
})();