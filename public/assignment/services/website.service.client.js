/**
 * Created by rachanadeshmukh on 5/23/16.
 */


(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
            { "_id": "678", "name": "Checkers",    "developerId": "123" },
            { "_id": "789", "name": "Chess",       "developerId": "234" }
        ];
        var api = {
            createWebsite   : createWebsite,
            findWebsiteById : findWebsiteById,
            findWebsiteByUser : findWebsiteByUser,
            updateWebsite : updateWebsite,
            deleteWebsite : deleteWebsite,
        };
        return api;

        function createWebsite(website) {
            websites.push(website);
        }

        function findWebsiteById(websiteID) {
            for (var i in websites) {
                if (websites[i]._id === websiteID) {
                    return websites[i];
                }
            }
            return null;
        }


        function findWebsiteByUser(userId) {
            var result = [];
            for (var i in websites) {
                if (websites[i].developerId === userId) {
                    result.push(websites[i]);
                }
            }
            return result;
        }



        function updateWebsite(websiteID, newWebsite) {
            for (var i in websites)  {
                if (websites[i]._id === websiteID) {
                    websites[i].name = newWebsite.name;
                    websites[i].developerId= newWebsite.developerId;
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteID) {
            for (var i in websites) {
                if (websites[i]._id === websiteID) {
                    websites.splice(i, 1);
                }
            }
            return null;
        }


    }
})();
