/**
 * Created by rachanadeshmukh on 6/5/16.
 */
(function() {
    angular
        .module("Vibe")
        .factory("AttendingsService", AttendingsService);

    function AttendingsService($http) {

        var api = {
            attendEvent: attendEvent,
            getAttendings: getAttendings,
            showAttendings: showAttendings,
            getAttendingForUserandEvent: getAttendingForUserandEvent,
            unattendEvent: unattendEvent

        };

        return api;

        function showAttendings(eventId) {
            return $http.get("/attendings/" + eventId);
        }

        function getAttendings(userId) {
            return $http.get("/favorites/"+userId);
        }

        function getAttendingForUserandEvent(userId, eventId) {
            return $http.get("/favorites/user/" + userId + "/event/" + eventId);
        }

        function attendEvent(event) {
            return $http.post("/attend/", event);
        }

        function unattendEvent(userId, eventId) {
            return $http.delete("/attending/user/" +userId+ "/event/" +eventId)
        }

    }
}) ();