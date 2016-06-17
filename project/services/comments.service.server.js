/**
 * Created by rachanadeshmukh on 6/13/16.
 */

module.exports = function(app, models) {

    var commentModel = models.commentModel;

    app.post("/api/comment", postComment);
    app.get("/comments/:eventId", getComments);

    function getComments(req, res) {
        var eventId = req.params.eventId;
        commentModel
            .getCommentsForEvent(eventId)
            .then(
                function(comments) {
                    res.send(comments);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function postComment(req, res) {
        var comment = req.body;
        commentModel
            .postComment(comment)
            .then(
                function(comment) {
                    res.send(comment)
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

};