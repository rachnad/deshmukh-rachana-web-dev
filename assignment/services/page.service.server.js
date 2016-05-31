/**
 * Created by rachanadeshmukh on 5/31/16.
 */
module.exports = function(app) {
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
        page.websiteId = req.params.websiteId;
        pages.push(page);
        res.send(pages)
    }

    function findAllPagesForWebsite(req, res) {
        var websiteID = req.params.websiteId;
        var result = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteID) {
                result.push(pages[i]);
            }
        }
        res.send(results);
    }

    function findPageById(req, res) {
        var pageID = req.pageId
        for (var i in pages) {
            if (pages[i]._id === pageID) {
                res.send(pages[i]);
            }
        }
        return null;
    }


    function updatePage(req, res) {
        var pageID = req.params.pageId;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id === pageID) {
                pages[i].name = newPage.name;
                pages[i].title = newPage.title;
                pages[i].websiteId = newPage.websiteId;
                return true;
            }
        }
        return false;
    }

    function deletePage(req, res) {
        var pageID = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id === pageID) {
                pages.splice(i, 1)
            }
        }
        return null;
    }
};
