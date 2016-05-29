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
            { "_id": "543", "name": "Post 3", "websiteId": "456" },
            { "_id": "549", "name": "Post 4", "websiteId": "567" }
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
            var result = [];
            for (var i in pages) {
                if (pages[i].websiteId === websiteID) {
                    result.push(pages[i]);
                }
            }
            return result;
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
            for (var i in pages)  {
                if (pages[i]._id === pageID) {
                    pages[i].name = newPage.name;
                    pages[i].title = newPage.title;
                    pages[i].websiteId = newPage.websiteId;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageID) {
            for (var i in pages) {
                if (pages[i]._id === pageID) {
                    pages.splice(i, 1)
                }
            }
            return null;
        }
    }
})();