/**
 * Created by rachanadeshmukh on 6/6/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var VibeUserSchema = require("./user.schema.server")();
    var User = mongoose.model("VibeUserModel", VibeUserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByGoogleId: findUserByGoogleId,
        findUserbyFriendID: findUserbyFriendID
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, newUser) {
        return User.findByIdAndUpdate(userId, newUser);
    }

    function deleteUser(userId) {
        return User.findByIdAndRemove(userId);
    }

    function findUserByGoogleId(googleID) {
        return User.findOne({'google.id': googleID})
    }

    function findUserbyFriendID(userId, friendName) {
        return User.find({_id: userId, friends: friendName});

    }
};