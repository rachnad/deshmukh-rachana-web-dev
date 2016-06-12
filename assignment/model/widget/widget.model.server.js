/**
 * Created by rachanadeshmukh on 6/6/16.
 */
/**
 * Created by rachanadeshmukh on 6/6/16.
 */
module.exports = function() {

    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget)
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetID) {
        return Widget.findById(widgetID);
    }

    function updateWidget(widgetID, widget) {
        if(widget.formatted === undefined) {
            widget.formatted = false;
        }
        return Widget.findByIdAndUpdate(widgetID, widget);
    }

    function deleteWidget(widgetID) {
        return Widget.findByIdAndRemove(widgetID);

    }

    function reorderWidget(pageId, start, end) {
        var startIndex = parseInt(start);
        var endIndex = parseInt(end);

        //use temp order value of -1 to switch orders of start and end index
        return Widget
            .update({order : startIndex, _page: pageId}, {order : -1})
            .then(function(widget) {
                return Widget
                    .update({order : endIndex, _page: pageId}, {order: startIndex})
                    .then(function(widget) {
                        return Widget
                            .update({order : -1, _page: pageId}, {order : endIndex})
                            .then(function(widget) {
                                console.log('reordering in widget model done')
                            });
                    }
                );
            }
        );

    }
};