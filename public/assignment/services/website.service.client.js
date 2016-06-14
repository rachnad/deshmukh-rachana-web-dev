/**
 * Created by rachanadeshmukh on 5/23/16.
 */


(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var api = {
            createWebsite   : createWebsite,
            findWebsiteById : findWebsiteById,
            findWebsiteByUser : findWebsiteByUser,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite,
            isLoggedIn: isLoggedIn
        };
        return api;

        function isLoggedIn() {

        }

        function createWebsite(website) {
            return $http.post("/api/user/"+website.developerId+"/website/", website);
        }

        function findWebsiteById(websiteID) {
            return $http.get("/api/website/" +websiteID);
        }


        function findWebsiteByUser(userId) {
           return $http.get("/api/user/"+userId+"/website");
        }


        function updateWebsite(websiteID, newWebsite) {
            return $http.put("/api/website/"+websiteID, newWebsite);
        }

        function deleteWebsite(websiteID) {
            return $http.delete("/api/website/"+websiteID);
        }
    }
})();
