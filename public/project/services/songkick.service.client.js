/**
 * Created by rachanadeshmukh on 5/31/16.
 */

(function() {
    angular
        .module("Vibe")
        .factory("SongkickService", SongkickService);

    function SongkickService($http) {

        var key = "dSe9uKf7px4Vlnty";

        var artistCalenderURL = "http://api.songkick.com/api/3.0/artists/ARTISTID/calendar.json?apikey=APIKEY";
        var artistSearchURL = "http://api.songkick.com/api/3.0/search/artists.json?query=ARTISTNAME&apikey=APIKEY";

        var eventDetailsURL = "http://api.songkick.com/api/3.0/events/EVENTID.json?apikey=APIKEY";


        var api = {
            searchArtist : searchArtist,
            getartistCalender: getartistCalender,
            getEventDetails: getEventDetails
        };
        return api;

        function searchArtist(artist) {
            var artistUrl = artistSearchURL.replace("ARTISTNAME", artist).replace("APIKEY", key);
            return $http.get(artistUrl);
        }

        function getartistCalender(artistId) {
            var artistUrl = artistCalenderURL.replace("ARTISTID", artistId).replace("APIKEY", key);
            return $http.get(artistUrl);
        }

        function getEventDetails(eventId) {
            var eventUrl = eventDetailsURL.replace("EVENTID", eventId).replace("APIKEY", key);
            return $http.get(eventUrl);

        }

    }
})();

