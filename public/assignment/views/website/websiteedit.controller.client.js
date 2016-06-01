/**
 * Created by rachanadeshmukh on 5/29/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);


    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function(response) {
                    vm.website = angular.copy(response.data);
                })
        }
        init();


        function updateWebsite() {
            if (vm.website == undefined || vm.website.name == undefined) {
                vm.success = "";
                vm.error = "Fill out all required fields";
            }
            else {
                vm.error = "";
                WebsiteService
                    .updateWebsite(vm.websiteId, vm.website)
                    .then(function(response) {
                        var result = response.data;
                        if (result) {
                            vm.success = "Website successfully updated";
                        } else {
                            vm.error = "Website not updated";
                        }
                    })
            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function(response) {
                });
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();
