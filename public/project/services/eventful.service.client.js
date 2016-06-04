/**
 * Created by rachanadeshmukh on 6/3/16.
 */

(function() {
    angular
        .module("Vibe")
        .factory("EventfulService", EventfulService);
    function EventfulService($http) {

        var key = "Rhm84vLVz8ZW2wvT";
        //oAuth Consumer Key: 62429a093e18b1f83293
        //oAuth Consumer Secret: e7ed1b287e6c9ac9e5b1

        var urlArtistBase = "http://api.eventful.com/json/events/search?app_key=APPKEY&performer=ARTIST";

        var api={
            searchArtist: searchArtist,
            searchVenue: searchVenue,
            getEventDetails : getEventDetails
        };
        return api;


        function searchArtist(artistName) {
            //var url = urlArtistBase.replace("APPKEY", key).replace("ARTIST", artistName);
            //var url = "http://api.eventful.com/rest/events/search?APPKEY&keywords=books&location=San+Diego&date=Future".replace("APPKEY, key");
            //return $http.get(url);

            var events = [{
                "id": 1,
                "artist": "Rihanna",
                "date": (new Date).getDate().toString(),
                "price": 100,
                "title": "Rihanna Concert",
                "location": "Boston, MA",
                "type": "Concert"
            }, {"id": 2,
                "artist": "Rihanna",
                "date": (new Date).getDate().toString(),
                "price": 100,
                "title": "Rihanna Concert",
                "location": "New York, NY",
                "type": "Concert"
            }, {"id": 3,
                "artist": "Rihanna",
                "date": (new Date).getDate().toString(),
                "price": 100,
                "title": "Rihanna Concert",
                "location": "DC",
                "type": "Concert"}];

            return events;
        }

        function searchVenue(venueName) {

            var eventsVenue = [{
                "id": 1,
                "artist": "Rihanna",
                "date": (new Date).getDate().toString(),
                "price": 100,
                "title": "Rihanna Concert",
                "location": "Boston, MA",
                "type": "Concert"
            }, {"id": 2,
                "artist": "Drake",
                "date": (new Date).getDate().toString(),
                "price": 100,
                "title": "Drake Concert",
                "location": "Boston, MA",
                "type": "Concert"
            }, {"id": 3,
                "artist": "Beyonce",
                "date": (new Date).getDate().toString(),
                "price": 100,
                "title": "Beyonce Concert",
                "location": "Boston, MA",
                "type": "Concert"}];

            return eventsVenue;

        }


        function getEventDetails(eventId) {
            var details = {"resultsPage":
            {"results":
            {"event":
            {"location":{"city":"London, UK","lng":-0.1150322,"lat":51.4650846},
                "popularity":0.526304,
                "uri":"http://www.songkick.com/concerts/3037536-vampire-weekend-at-o2-academy-brixton?utm_source=PARTNER_ID&utm_medium=partner",
                "displayName":"Vampire Weekend with Fan Death at O2 Academy Brixton (February 16, 2010)",
                "id":3037536,
                "type":"Concert",
                "start":{"time":"19:30:00","date":"2010-02-16","datetime":"2010-02-16T19:30:00+0000"},
                "ageRestriction": "14+",
                "performance":[
                    {
                        "artist":
                        {"uri":"http://www.songkick.com/artists/288696-vampire-weekend?utm_source=PARTNER_ID&utm_medium=partner",
                            "displayName":"Vampire Weekend",
                            "id":288696,
                            "identifier":[{"href":"http://api.songkick.com/api/3.0/artists/mbid:af37c51c-0790-4a29-b995-456f98a6b8c9.json","mbid":"af37c51c-0790-4a29-b995-456f98a6b8c9"}]
                        },
                        "displayName":"Vampire Weekend",
                        "billingIndex":1,
                        "id":5380281,
                        "billing":"headline"
                    },
                    {
                        "artist":
                        {"uri":"http://www.songkick.com/artists/2357033-fan-death?utm_source=PARTNER_ID&utm_medium=partner",
                            "displayName":"Fan Death",
                            "id":2357033,
                            "identifier":[{"href":"http://api.songkick.com/api/3.0/artists/mbid:2ec79a0d-8b5d-4db2-ad6b-e91b90499e87.json","mbid":"2ec79a0d-8b5d-4db2-ad6b-e91b90499e87"}]
                        },
                        "displayName":"Fan Death",
                        "billingIndex":2,
                        "id":7863371,
                        "billing":
                            "support"
                    }
                ],
                "venue":
                {"metroArea":
                { "uri":"http://www.songkick.com/metro_areas/24426-uk-london?utm_source=PARTNER_ID&utm_medium=partner",
                    "displayName":"London",
                    "country":{"displayName":"UK"},
                    "id":24426
                },
                    "city":
                    { "uri":"http://www.songkick.com/metro_areas/24426-uk-london?utm_source=PARTNER_ID&utm_medium=partner",
                        "displayName":"London",
                        "country":{"displayName":"UK"},
                        "id":24426
                    },
                    "zip":"SW9 9SL", "lat":51.4650846, "lng":-0.1150322,
                    "uri":"http://www.songkick.com/venues/17522-o2-academy-brixton?utm_source=PARTNER_ID&utm_medium=partner",
                    "displayName":"O2 Academy Brixton",
                    "street":"211 Stockwell Road",
                    "id":17522,
                    "website":"http://www.brixton-academy.co.uk/",
                    "phone":"020 7771 3000",
                    "capacity":4921,
                    "description":"Brixton Academy is an award winning music venue situated in the heart of Brixton, South London. The venue has played host to many notable shows and reunions, welcoming a wide variety of artists, from Bob Dylan to Eminem, to the stage. It attracts over half a million visitors per year, accommodating over one hundred events.\n\nBuilt in 1929, the site started life as one of the four state of the art\n Astoria Theaters, screening a variety of motion pictures and shows. In 1972 the venue was transformed into a rock venue and re-branded as The Sundown Centre. With limited success the venue closed it’s doors in 1974 and was not re-opened as a music venue again until 1983, when it became The Brixton Academy.\n\nFeaturing a beautiful Art Deco interior, the venue is now known as the 02 Academy Brixton, and hosts a diverse range of club nights and live performances, as well as seated events. The venue has an upstairs balcony as well as the main floor downstairs. There is disabled access and facilities, a bar and a cloakroom. Club night events are for over 18s, for live music under 14s must be accompanied by an adult."
                },
                "status":"ok"}},
                "status":"ok"}}

            return details.resultsPage.results.event;

        }
    }
})();