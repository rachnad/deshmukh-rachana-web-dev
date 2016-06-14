module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        addWebsiteForUser: addWebsiteForUser,
        deleteWebsiteForUser: deleteWebsiteForUser,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function findUserByFacebookId(facebookId) {
        return User.findOne({'facebook.id': facebookId});
    }

    function createUser(user) {
        return User.create(user);
    }

    function addWebsiteForUser(websiteId, userId) {
        return User
            .findById(userId)
            .then(function(user) {
                user.websites.push(websiteId);
                user.save();
            })
    }

    function deleteWebsiteForUser(websiteId, userId) {
        return User
            .find({_id: userId})
            .then(function(user) {
                var removeIndex = user.websites.indexOf(websiteId);
                user.save();
            })
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
};