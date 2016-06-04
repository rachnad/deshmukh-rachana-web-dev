/**
 * Created by rachanadeshmukh on 5/31/16.
 */
module.exports = function(app) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname +'/../../public/uploads'});

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function createWidget(req, res) {
        var widget = req.body;
        widget.pageId = req.params.pageId;
        widgets.push(widget);
        res.send(widget);
    }

    function findAllWidgetsForPage(req, res) {
        var pageID = req.params.pageId;
        var result = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageID) {
                result.push(widgets[i]);
            }
        }
        return res.send(result);
    }

    function findWidgetById(req, res) {
        var widgetID = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetID) {
                return res.send(widgets[i]);
            }
        }
        return res.send(null);
    }


    function updateWidget(req, res) {
        var widgetID = req.params.widgetId;
        var newWidget = req.body;
        for (var i in widgets)  {
            if (widgets[i]._id === widgetID) {
                widgets[i].widgetType = newWidget.widgetType;
                widgets[i].pageId = newWidget.pageId;
                widgets[i].text = newWidget.text;
                widgets[i].name = newWidget.name;
                widgets[i].size = newWidget.size;

                if(newWidget.widgetType === "IMAGE" || newWidget.widgetType === "YOUTUBE") {
                    console.log('testing');
                    widgets[i].url = newWidget.url;
                    widgets[i].width = newWidget.width+"%";
                }
                return res.send(widgets[i]);
            }
        }
        return false;
    }

    function deleteWidget(req, res) {
        var widgetID = req.params.widgetId;
        for (var i in widgets) {
            if (widgets[i]._id === widgetID) {
                widgets.splice(i, 1);
                return res.send(widgets);
            }
        }
        return res.send(null);
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
