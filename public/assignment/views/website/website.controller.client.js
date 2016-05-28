/**
 * Created by rachanadeshmukh on 5/23/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);



    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];

        function init() {
            vm.websites = WebsiteService.findWebsiteByUser(vm.userId);
        }
        init();
    }


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
                vm.added = true;
            }
        }

    }

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId));
        }
        init();


        function updateWebsite() {
            var result = WebsiteService.updateWebsite(vm.websiteId, vm.website);
            if(result === true) {
                vm.success = "Website successfully updated";
            } else {
                vm.error = "Website not updated";
            }

        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");

        }

    }


})();
