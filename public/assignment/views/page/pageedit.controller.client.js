/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

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
            if (vm.page == undefined || vm.page.name == undefined || vm.page.title == undefined) {
                vm.success = "";
                vm.error = "Fill out all required fields"
            }

            else {
                var result = PageService.updatePage(vm.pageId, vm.page);
                if (result === true) {
                    vm.error = ""
                    vm.success = "Website successfully updated";
                } else {
                    vm.error = "Website not updated";
                }
            }

        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }


    }

})();
