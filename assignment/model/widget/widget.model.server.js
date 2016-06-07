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
        return Widget.findByIdAndUpdate(widgetID, widget);
    }

    function deleteWidget(widgetID) {
        return Widget.findByIdAndRemove(widgetID);

    }

    function reorderWidget(pageId, start, end) {

    }
};