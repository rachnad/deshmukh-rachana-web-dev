/**
 * Created by rachanadeshmukh on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var api = {
            createWidget   : createWidget,
            findWidgetByPageId : findWidgetByPageId,
            findWidgetById : findWidgetById,
            updateWidget : updateWidget,
            deleteWidget : deleteWidget
        };
        return api;

        function createWidget(pageID, newWidget) {
            return $http.post("/api/page/" +pageID +"/widget", newWidget);
        }

        function findWidgetByPageId(pageID) {
            return $http.get("/api/page/" +pageID +"/widget");
        }

        function findWidgetById(widgetID) {
            return $http.get("/api/widget/" +widgetID);
        }


        function updateWidget(widgetID, newWidget) {
            return $http.put("/api/widget/" +widgetID, newWidget);
        }

        function deleteWidget(widgetID) {
            console.log(widgetID);
            return $http.delete("/api/widget/" +widgetID);
        }
    }
})();