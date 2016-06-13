/**
 * Created by rachanadeshmukh on 6/6/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("PageModel", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        addWidgetForPage: addWidgetForPage,
        deleteWidgetForPage: deleteWidgetForPage
    };
    return api;

    function createPage(websiteID, page) {
        page._website = websiteID;
        return Page.create(page);
    }

    function addWidgetForPage(pageId, widgetId) {
        Page
            .findPageById(pageId)
            .then(function(page) {
                page.widgets.push(widgetId);
                page.save();
            })
    }

    function deleteWidgetForPage(pageId, widgetId) {

    }


    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return Page.findById(pageId);
    }

    function updatePage(pageId, page) {
        return Page.findByIdAndUpdate(pageId, page);
    }

    function deletePage(pageId) {
        return Page.findByIdAndRemove(pageId);
    }
};