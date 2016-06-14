/**
 * Created by rachanadeshmukh on 6/5/16.
 */
module.exports = function(app, models) {

    var followingModel = models.followingModel;

    app.post("/follow", followArtist);
    app.get("/following/:uid", getFollowing);


    function getFollowing(req, res) {
        var userId = req.params.uid;
        followingModel
            .getFollowingsForUser(userId)
            .then(
                function(followings) {
                    res.send(followings);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function followArtist(req, res) {
        var newFollow = req.body;
        followingModel
            .followArtist(newFollow)
            .then(
                function(follow) {
                    res.send(follow);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

};