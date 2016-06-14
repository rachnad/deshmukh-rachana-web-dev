/**
 * Created by rachanadeshmukh on 6/13/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var FriendsSchema = mongoose.Schema({
        uid: String,
        friend: [String]
    }, {collection: "friends"});

    return FriendsSchema;
};