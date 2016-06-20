/**
 * Created by rachanadeshmukh on 6/5/16.
 */
module.exports = function(app, models) {

    var followingModel = models.followingModel;

    app.post("/follow", followArtist);
    app.get("/following/:uid", getFollowing);
    app.get("/following/user/:uid/artist/:artist", getFollowingsForUserandArtist);


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
            .findFollowbyName(newFollow.artistName)
            .then(
                function(artist) {
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
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    function getFollowingsForUserandArtist(req, res) {
        var userId = req.params.uid;
        var artistName = req.params.artist
        followingModel
            .getFollowingsForUserandArtist(userId, artistName)
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