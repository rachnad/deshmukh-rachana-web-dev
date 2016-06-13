/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;

        vm.createPage = createPage;
        vm.added = false;

        function createPage() {
            if (vm.page == undefined || vm.page.name == undefined || vm.page.title == undefined) {
                vm.success = "";
                vm.error = "Fill out all required fields"
            }
            else {
                var newPage = {
                    "name": vm.page.name,
                    "websiteId": vm.websiteId,
                    "title": vm.page.title
                };
                if (!vm.added) {
                    vm.added = true;
                    PageService
                        .createPage(newPage, vm.websiteId)
                        .then(function(response) {
                            vm.error = "";
                            vm.success = "New Page has been added";

                        })
                }
            }
        }


    }
})();
