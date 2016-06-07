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
            if (vm.website == undefined) {
                vm.error = "Fill out all required fields"
            }

            else {
                vm.error = "";
                var website = {
                    "name": vm.website.name,
                    "developerId": vm.userId,
                    "description": vm.website.description
                };

                if (!vm.added) {
                    WebsiteService
                        .createWebsite(website)
                        .then(function(response) {
                            console.log(response.data);
                        });
                    vm.success = "New Website has been added";
                    vm.added = true;
                }
            }
        }

    }
})();

