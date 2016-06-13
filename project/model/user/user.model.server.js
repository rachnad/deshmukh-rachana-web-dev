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
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.find({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.find({username: username});
    }

    function updateUser(userId, newUser) {
        return User.findByIdAndUpdate(userId, newUser);
    }

    function deleteUser(userId) {
        return User.findByIdAndRemove(userId);
    }
};