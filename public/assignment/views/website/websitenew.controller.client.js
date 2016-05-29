/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;
        vm.added = false;

        function createWebsite() {
            var website = {"_id": (new Date).getTime().toString(),
                "name": vm.website.name,
                "developerId": vm.userId,
                "description": vm.website.description};

            if (!vm.added) {
                var result = WebsiteService.createWebsite(website);
                vm.success = "New Website has been added";
                vm.added = true;
            }
        }

    }
})();

