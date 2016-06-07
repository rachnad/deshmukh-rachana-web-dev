/**
 * Created by rachanadeshmukh on 5/31/16.
 */
module.exports = function(app, models) {

    var pageModel = models.pageModel;

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456"},
        {"_id": "432", "name": "Post 2", "websiteId": "456"},
        {"_id": "543", "name": "Post 3", "websiteId": "456"},
        {"_id": "549", "name": "Post 4", "websiteId": "567"}
    ];
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params.websiteId;
        pageModel
            .createPage(websiteId, page)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findAllPagesForWebsite(req, res) {
        var websiteID = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteID)
            .then(
                function(pages) {
                    res.send(pages);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findPageById(req, res) {
        var pageID = req.params.pageId;
        pageModel
            .findPageById(pageID)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }


    function updatePage(req, res) {
        var pageID = req.params.pageId;
        var newPage = req.body;
        pageModel
            .updatePage(pageID, newPage)
            .then(
                function(page) {
                    res.send(page);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function deletePage(req, res) {
        var pageID = req.params.pageId;
        pageModel
            .deletePage(pageID)
            .then(
                function(pages) {
                    res.send(pages);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }
};
