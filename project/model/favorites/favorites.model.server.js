/**
 * Created by rachanadeshmukh on 6/13/16.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var FavoriteSchema = require("./favorites.schema.server")();
    var Favorite = mongoose.model("FavoriteModel", FavoriteSchema);

    var api = {
        attendEvent: attendEvent,
        getAttendingsForUser: getAttendingsForUser,
        getAttendingsForEvent: getAttendingsForEvent

    };
    return api;

    function attendEvent(event) {
        return Favorite.create(event);
    }

    function getAttendingsForUser(userId) {
        return Favorite.find({uid: userId});
    }

    function getAttendingsForEvent(eventId) {
        return Favorite.find({eid: eventId})
    }

};