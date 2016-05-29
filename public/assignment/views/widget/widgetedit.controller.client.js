/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);


    function EditWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = angular.copy(WidgetService.findWidgetById(vm.widgetId));
        }
        init();

        function updateWidget() {

            if (vm.widget.widgetType === "HEADER" &&
                (vm.widget.name == undefined || vm.widget.text == undefined || vm.widget.size == undefined)) {
                vm.success = "";
                vm.error = "Fill out all required fields"
            }
            else if ((vm.widget.widgetType === "IMAGE" || vm.widget.widgetType === "YOUTUBE") &&
                (vm.widget.name == undefined || vm.widget.text == undefined
                || vm.widget.url == undefined || vm.widget.width == undefined)) {
                vm.success = "";
                vm.error = "Fill out all required fields"
            }
            else {
                var result = WidgetService.updateWidget(vm.widgetId, vm.widget);
                console.log(vm.widget);
                if (result === true) {
                    vm.error = "";
                    vm.success = "Website successfully updated";
                } else {
                    vm.success = "";
                    vm.error = "Website not updated";
                }
            }

        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }
})();