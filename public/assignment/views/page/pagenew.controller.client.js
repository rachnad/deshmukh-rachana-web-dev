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
            var newPage = {"_id": (new Date).getTime().toString(),
                "name": vm.page.name,
                "websiteId": vm.websiteId,
                "title": vm.page.title
            };

            console.log(newPage);

            if (!vm.added) {
                PageService.createPage(newPage, vm.websiteId);
                vm.success = "New Page has been added";
                vm.added = true;
            }
        }


    }
})();
