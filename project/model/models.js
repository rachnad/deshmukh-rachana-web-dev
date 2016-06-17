/**
 * Created by rachanadeshmukh on 6/13/16.
 */
module.exports = function() {
    var mongoose = require('mongoose');
    var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;
    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        url = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }
    //mongoose.connect(url);

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