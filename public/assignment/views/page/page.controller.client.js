/**
 * Created by rachanadeshmukh on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);


    function PageListController($routeParams, PageService){
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            console.log(vm.pages);
        }
        init();
    }

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
                vm.added = true;
            }
        }


    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = angular.copy(PageService.findPageById(vm.pageId));
        }
        init();


        function updatePage() {
            var result = PageService.updatePage(vm.pageId, vm.page);
            if(result === true) {
                vm.success = "Website successfully updated";
            } else {
                vm.error = "Website not updated";
            }

        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


    }

})();
