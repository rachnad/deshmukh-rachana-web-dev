/**
 * Created by rachanadeshmukh on 6/13/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var FollowingSchema = mongoose.Schema({
        userId: String,
        artistId: String,
        artistName: String
    }, {collection: "followings"});

    return FollowingSchema;
};