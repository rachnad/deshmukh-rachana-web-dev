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
        deleteWebsite: deleteWebsite,
        addPageForWebsite: addPageForWebsite,
        deletePageForWebsite: deletePageForWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return Website.create(website)
    }

    function addPageForWebsite(websiteId, pageId) {
        return Website
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                website.pages.push(pageId);
                website.save();
            })
    }

    function deletePageForWebsite(pageId, websiteId) {

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