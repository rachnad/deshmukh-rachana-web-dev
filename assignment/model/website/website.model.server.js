/**
 * Created by rachanadeshmukh on 6/6/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("WebsiteModel", WebsiteSchema);

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return Website.create(website)
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    function findWebsiteById(websiteID) {
        return Website.findById(websiteID);
    }

    function updateWebsite(websiteID, website) {
        return Website.findByIdAndUpdate(websiteID, website);
    }

    function deleteWebsite(websiteID) {
        return Website.findByIdAndRemove(websiteID);

    }
};