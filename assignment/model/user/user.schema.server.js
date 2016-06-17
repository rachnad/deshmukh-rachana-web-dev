module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        websites: [String],
        dateCreated: {type: Date, default: Date.now},
        dateUpdated: Date,
        facebook: {
            id:    String,
            token: String,
            displayName: String
        }
    }, {collection: "assignment.user"});

    return UserSchema
};