/**
 * Created by rachanadeshmukh on 6/5/16.
 */
module.exports = function(app, models) {

    var favoriteModel = models.favoritesModel;

        app.get("/favorites/:uid", getAttendings);
        app.get("/favorites/:eid", showAttendingsForEvent);
        app.get("/favorites/user/:uid/event/:eid", getAttendingsForUserandEvent);
        app.post("/attend/", attendEvent);
        app.delete("/attending/user/:uid/event/:eid", unattendEvent);


        function getAttendings(req, res) {
            var userId = req.params.uid;
            favoriteModel
                .getAttendingsForUser(userId)
                .then(
                    function(attendings) {
                        res.send(attendings);
                    },
                    function(error) {
                        res.status(400).send(error);
                    }
                );
        }

        function attendEvent(req, res) {
            var event = req.body;
            favoriteModel
                .attendEvent(event)
                .then(
                    function(response) {
                        res.send(response)
                    },
                    function(error) {
                        res.status(400).send(error);
                    }
                )
        }

        function showAttendingsForEvent(req, res) {
            var eventid = req.params.eid;
            favoriteModel
                .getAttendingsForEvent(eventid)
                .then(
                    function(response) {
                        res.send(response);
                    },
                    function(error) {
                        res.status(400).send(error);
                    }
                );
        }

        function getAttendingsForUserandEvent(req, res) {
            var userId = req.params.uid;
            var eventId = req.params.eid;
            favoriteModel
                .getAttendingsForUserandEvent(userId, eventId)
                .then(
                    function(response) {
                        res.send(response);
                    },
                    function(error) {
                        res.status(400).send(error);
                    }
                );
        }

        function unattendEvent(req, res) {
            var userId = req.params.uid;
            var eventId = req.params.eid;
            favoriteModel
                .unattendEvent(userId, eventId)
                .then(
                    function(response) {
                        res.send(response);
                    },
                    function(error) {
                        res.status(400).send(error);
                    }
                );
        }



};