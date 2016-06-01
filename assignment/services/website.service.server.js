/**
 * Created by rachanadeshmukh on 5/31/16.
 */

module.exports = function(app) {
    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    function createWebsite(req, res) {
        var newWebsite = req.body;
        websites.push(newWebsite);
        res.send(newWebsite);
    }

    function findWebsites(req, res) {
        var userId = req.query["userId"];
        var websiteId = req.query["websiteId"];
        if(userId) {
            return findAllWebsitesForUser(userId, res)
        }
        if(websiteId) {
            return findWebsiteById(websiteId, res)
        }
        else {
            return res.send(null);
        }

    }

    function findWebsiteById(req, res) {
        var websiteID = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteID) {
                return res.send(websites[i]);
            }
        }
        res.send(null);
    }


    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var result = [];
        for (var i in websites) {
            if (websites[i].developerId === userId) {
                result.push(websites[i]);
            }
        }
        return res.send(result);
    }



    function updateWebsite(req, res) {
        var websiteID = req.params.websiteId;
        var newWebsite = req.body;
        for (var i in websites)  {
            if (websites[i]._id === websiteID) {
                websites[i].name = newWebsite.name;
                websites[i].developerId= newWebsite.developerId;
                return res.send(websites[i]);
            }
        }
        return false;
    }

    function deleteWebsite(req, res) {
        var websiteID = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id === websiteID) {
                websites.splice(i, 1);
                return res.send(websites);
            }
        }
        res.send(null);
    }
};


