/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);



    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        }
        init();
    }
})();
