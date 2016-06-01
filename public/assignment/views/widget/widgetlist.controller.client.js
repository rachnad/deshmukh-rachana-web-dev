/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.embeddedUrl = embeddedUrl;
        vm.getHtml = getHtml;

        function init() {
            WidgetService
                .findWidgetByPageId(vm.pageId)
                .then(function(response) {
                    vm.widgets = response.data;
                })
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
})();