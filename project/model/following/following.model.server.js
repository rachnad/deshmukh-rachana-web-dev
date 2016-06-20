/**
 * Created by rachanadeshmukh on 6/13/16.
 */

module.exports = function() {

    var mongoose = require("mongoose");
    var FollowingSchema = require("./following.schema.server")();
    var Following = mongoose.model("FollowingModel", FollowingSchema);

    var api = {
        followArtist: followArtist,
        getFollowingsForUser: getFollowingsForUser,
        getFollowingsForUserandArtist: getFollowingsForUserandArtist,
        findFollowbyName: findFollowbyName

    };
    return api;

    function findFollowbyName(artist) {
        return Following.find({artistName: artist});

    }

    function followArtist(artist) {
        return Following.create(artist);
    }

    function getFollowingsForUser(userId) {
        return Following.find({userId: userId});
    }

    function getFollowingsForUserandArtist(userId, artist) {
        return Following.find({userId: userId, artistName:artist})

    }

};