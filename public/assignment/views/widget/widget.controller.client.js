/**
 * Created by rachanadeshmukh on 5/23/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.embeddedUrl = embeddedUrl;
        vm.getHtml = getHtml;

        function init() {
            vm.widgets = WidgetService.findWidgetByPageId(vm.pageId);
        }
        init();

        function embeddedUrl(url) {
            var splitUrl = url.split("/");
            var embeddedId = splitUrl[splitUrl.length - 1];
            var embed= "https://www.youtube.com/embed/" + embeddedId;
            return $sce.trustAsResourceUrl(embed);
        }

        function getHtml(html) {
            return $sce.trustAsHtml(html);

        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.addWidget = addWidget;

        function addWidget(widgetType) {
            var newWidget = {
                "widgetType": widgetType,
                "_id": (new Date).getTime().toString()
            };
            WidgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/"+ vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }



    }

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
            var result = WidgetService.updateWidget(vm.widgetId, vm.widget);
            if(result === true) {
                vm.success = "Website successfully updated";
            } else {
                vm.error = "Website not updated";
            }
        }

        function deleteWidget(){
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
        }
    }


})();
