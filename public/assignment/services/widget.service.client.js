/**
 * Created by rachanadeshmukh on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
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
        var api = {
            createWidget   : createWidget,
            findWidgetByPageId : findWidgetByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageID, widget) {
            widgets.pageId = pageID;
            widgets.push(widget);
        }

        function findWidgetByPageId(pageID) {
            for (var i in widgets) {
                if (widgets[i].pageId === pageID) {
                    return widgets[i];
                }
            }
            return null;
        }

        function findWidgetById(widgetID) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetID) {
                    return widgets[i];
                }
            }
            return null;
        }


        function updateWidget(widgetID, newWidget) {
            for (var i in widgets)  {
                if (widgets[i]._id === widgetID) {
                    widgets[i].widgetType = newWidget.widgetType;
                    widgets[i].pageId = newWidget.pageId;
                    widgets[i].size = newWidget.size;
                    widgets[i].text = newWidget.text;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetID) {
            for (var i in widgets) {
                if (widgets[i]._id === widgetID) {
                    widgets.splice(widgets[i], 1)
                }
            }
            return null;
        }

    }
})();