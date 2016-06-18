/**
 * Created by rachanadeshmukh on 6/13/16.
 */
module.exports = function() {
    var userModel = require("./user/user.model.server.js")();
    var favoritesModel = require("./favorites/favorites.model.server.js")();
    var followingModel = require("./following/following.model.server.js")();
    var commentModel = require("./comments/comments.model.server.js")();

    var models = {
        userModel: userModel,
        followingModel: followingModel,
        favoritesModel: favoritesModel,
        commentModel: commentModel
    };

    return models;
};