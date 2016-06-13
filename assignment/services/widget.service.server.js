/**
 * Created by rachanadeshmukh on 5/31/16.
 */
module.exports = function(app, models) {
    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;

    var multer = require('multer');
    var upload = multer({ dest: __dirname +'/../../public/uploads'});

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", reorderWidget);

    function createWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        widgetModel
            .createWidget(pageId, widget)
            .then(
                function(widget) {
                    //pageModel.addWidgetForPage(pageId, widget._id);
                    res.send(widget);

                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    function findAllWidgetsForPage(req, res) {
        var pageID = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageID)
            .then(
                function(widgets) {
                    res.send(widgets);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetID = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetID)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }


    function updateWidget(req, res) {
        var widgetID = req.params.widgetId;
        var newWidget = req.body;
        widgetModel
            .updateWidget(widgetID, newWidget)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetID = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetID)
            .then(
                function(widgets) {
                    res.send(widgets);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function reorderWidget(req, res) {
        var pageID = req.params.pageId;
        var start = req.query["start"];
        var end = req.query["end"];

        widgetModel
            .reorderWidget(pageID, start, end)
            .then(
                function(widgets) {
                    res.send(widgets);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    function uploadImage(req, res) {
        console.log(req.body);
        var widgetId      = req.body.widgetId;
        var userId        = req.body.userId;
        var pageId        = req.body.pageId;
        var websiteId     = req.body.websiteId;
        var width         = req.body.width;
        var myFile        = req.file;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/"+filename;
            }
        }
        console.log(widgets[i]);
        res.redirect("/assignment/#/user/" +userId+ "/website/" +websiteId+ "/page/" +pageId+ "/widget/" +widgetId);
    }
};
