/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.addWidget = addWidget;

        function addWidget(widgetType) {
            var newWidget = {
                "widgetType": widgetType,
                "_id": (new Date).getTime().toString(),
                "pageId": vm.pageId,
                "name": "New Widget",
                "text" : "New Text"
            };

            WidgetService
                .createWidget(vm.pageId, newWidget).
                then(function(response) {

            });
            $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }

    }

})();