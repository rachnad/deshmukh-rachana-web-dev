/**
 * Created by rachanadeshmukh on 6/13/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var CommentSchema = mongoose.Schema({
        uid: String,
        eid: String,
        datePosted: {type: Date, default: Date.now},
        comment: String
    }, {collection: "comments"});

    return CommentSchema;
};