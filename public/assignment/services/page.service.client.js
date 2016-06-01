/**
 * Created by rachanadeshmukh on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService($http) {
        var api = {
            createPage   : createPage,
            findPageByWebsiteId : findPageByWebsiteId,
            findPageById : findPageById,
            updatePage : updatePage,
            deletePage : deletePage
        };
        return api;


        function createPage(page, websiteID) {
            return $http.post("/api/website/" +websiteID +"/page", page);
        }

        function findPageByWebsiteId(websiteID) {
            return $http.get("/api/website/" +websiteID +"/page");
        }

        function findPageById(pageID) {
            return $http.get("/api/page/" +pageID);
        }


        function updatePage(pageID, newPage) {
            return $http.put("/api/page/"+pageID, newPage);
        }

        function deletePage(pageID) {
            return $http.delete("/api/page/" +pageID);
        }
    }
})();