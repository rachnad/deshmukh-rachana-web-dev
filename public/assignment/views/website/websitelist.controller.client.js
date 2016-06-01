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
            WebsiteService
                .findWebsiteByUser(vm.userId)
                .then(function(response) {
                    vm.websites = response.data;
                })
        }
        init();
    }
})();
