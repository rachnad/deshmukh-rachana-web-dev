/**
 * Created by rachanadeshmukh on 6/6/16.
 */

module.exports = function() {
    var mongoose = require("mongoose");

    var VibeUserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        type: ["Standard", "Premium"],
        dateCreated: {type: Date, default: Date.now},
        friends: [String],
        google: {
            id:    String,
            token: String,
            displayName: String
        }
    }, {collection: "project.user"});

    return VibeUserSchema;
};