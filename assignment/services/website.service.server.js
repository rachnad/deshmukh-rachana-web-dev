/**
 * Created by rachanadeshmukh on 5/31/16.
 */

module.exports = function(app, models) {
    var websiteModel = models.websiteModel;
    var userModel = models.userModel;


    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    function createWebsite(req, res) {
        var newWebsite = req.body;
        var userID = req.params.userId;
        websiteModel
            .createWebsiteForUser(userID, newWebsite)
            .then(
                function(website) {
                    userModel.addWebsiteForUser(website._id, userID);
                    res.send(website);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
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
        websiteModel
            .findWebsiteById(websiteID)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }


    function findAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.send(websites);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }


    function updateWebsite(req, res) {
        var websiteID = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(websiteID, newWebsite)
            .then(
                function(website) {
                    res.send(website);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteWebsite(req, res) {
        var websiteID = req.params.websiteId;
        var userID;
        websiteModel
            .deleteWebsite(websiteID)
            .then(
                function(websites) {
                    //userModel.deleteWebsiteForUser(websiteID, userID);
                    res.send(websites);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }
};


