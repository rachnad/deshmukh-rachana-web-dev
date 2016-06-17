/**
 * Created by rachanadeshmukh on 6/13/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var CommentsSchema = require("./comments.schema.server")();
    var Comments = mongoose.model("CommentModel", CommentsSchema);

    var api = {
        postComment: postComment,
        getCommentsForEvent: getCommentsForEvent
    };
    return api;

    function postComment(comment) {
        return Comments.create(comment);
    }

    function getCommentsForEvent(eventId) {
        return Comments.find({eventId: eventId});
    }

};