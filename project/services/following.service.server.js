/**
 * Created by rachanadeshmukh on 6/5/16.
 */
module.exports = function(app) {

    var following = [
    ];

    app.post("/follow", followArtist);
    app.get("/following/:uid", getFollowing);



    function getFollowing(req, res) {
        var results = [];
        var userId = req.params.uid;
        for(var i in following) {
            if(following[i].userId === userId) {
                results.push(following[i]);
            }
        }
        res.send(results);
    }

    function followArtist(req, res) {
        console.log('testing server');
        var newFollow = req.body;
        following.push(newFollow);
        res.send(newFollow);
    }

};