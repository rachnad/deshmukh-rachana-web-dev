/**
 * Created by rachanadeshmukh on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];
        var api = {
            createPage   : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;


        function createPage(page, websiteID) {
            page.websiteId = websiteID;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteID) {
            for (var i in pages) {
                if (pages[i].websiteId === websiteID) {
                    return pages[i];
                }
            }
            return null;
        }

        function findPageById(pageID) {
            for (var i in pages) {
                if (pages[i]._id === pageID) {
                    return pages[i];
                }
            }
            return null;
        }


        function updatePage(pageID, newPage) {
            for (var i in users)  {
                if (pages[i]._id === userID) {
                    pages[i].name = newPage.name;
                    pages[i].websiteId = newPage.websiteId;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageID) {
            for (var i in pages) {
                if (pages[i]._id === pageID) {
                    pages.splice(pages[i], 1)
                }
            }
            return null;
        }
    }
})();