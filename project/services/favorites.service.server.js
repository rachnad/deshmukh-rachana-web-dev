/**
 * Created by rachanadeshmukh on 6/5/16.
 */
module.exports = function(app, models) {

    var favoriteModel = models.favoritesModel;

        app.get("/favorites/:uid", getAttendings);
        app.post("/attend/", attendEvent);


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

};