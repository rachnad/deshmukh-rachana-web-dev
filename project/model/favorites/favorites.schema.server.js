/**
 * Created by rachanadeshmukh on 6/13/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var FavoritesSchema = mongoose.Schema({
        uid: String,
        username: String,
        eventName: String,
        eid: String
    }, {collection: "favorites"});

    return FavoritesSchema;
};