/**
 * Created by rachanadeshmukh on 5/31/16.
 */

(function() {
    angular
        .module("Vibe")
        .factory("SongkickService", SongkickService);

    function SongkickService($http) {

        var key = "dSe9uKf7px4Vlnty";

        var artistCalenderURL = "http://api.songkick.com/api/3.0/artists/ARTISTID/calendar.json?apikey=APIKEY&jsoncallback=?";
        var artistSearchURL = "http://api.songkick.com/api/3.0/search/artists.json?query=ARTISTNAME&apikey=APIKEY&jsoncallback=?";

        var venueSearchURL = "http://api.songkick.com/api/3.0/search/venues.json?query=VENUENAME&apikey=APIKEY";
        var venueCalenderURL = "http://api.songkick.com/api/3.0/venues/VENUEID/calendar.json?apikey=APIKEY";

        var eventDetailsURL = "http://api.songkick.com/api/3.0/events/EVENTID.json?apikey=APIKEY&jsoncallback=?";


        var api = {
            searchArtist : searchArtist,
            getartistCalender: getartistCalender,
            getEventDetails: getEventDetails,
            searchVenue: searchVenue,
            getvenueCalender: getvenueCalender
        };
        return api;

        //artist calls

        function searchArtist(artist) {
            var artistUrl = artistSearchURL.replace("ARTISTNAME", artist).replace("APIKEY", key);

            return $.getJSON(artistUrl);
        }

        function getartistCalender(artistId) {
            var artistUrl = artistCalenderURL.replace("ARTISTID", artistId).replace("APIKEY", key);
            return $.getJSON(artistUrl);
        }

        //event calls

        function getEventDetails(eventId) {
            var eventUrl = eventDetailsURL.replace("EVENTID", eventId).replace("APIKEY", key);
            return $.getJSON(eventUrl);

        }

        //venue calls

        function searchVenue(venue) {
            var venueUrl = venueSearchURL.replace("VENUENAME", venue).replace("APIKEY", key);
            return $http.get(venueUrl);
        }

        function getvenueCalender(venueId) {
            var venueUrl = venueCalenderURL.replace("VENUEID", venueId).replace("APIKEY", key);
            return $http.get(venueUrl);
        }


    }
})();

