/**
 * Created by rachanadeshmukh on 6/5/16.
 */
module.exports = function(app) {

        var favorites = [
            {"userId": "123", "eventId": 1, "title": "Rihanna Concert", "artist": "Rihanna", "venue": "Boston"}
        ];

        app.get("/favorites/:uid", getFavorites);
        app.post("/favorite/:eid", favoriteEvent);


        function getFavorites(req, res) {
            var userId = req.params.uid;
            var results = [];
            for (var i in favorites) {
                if (favorites[i].userId === userId) {
                    results.push(favorites[i]);
                }
            }
            res.send(results);
        }

        function favoriteEvent(req, res) {


        }

};