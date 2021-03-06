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
            PageService
                .findPageById(vm.pageId)
                .then(function(response) {
                    vm.page = angular.copy(response.data);
                    console.log(vm.page);
                })
        }
        init();


        function updatePage() {
            if (vm.page == undefined || vm.page.name == undefined || vm.page.title == undefined) {
                vm.success = "";
                vm.error = "Fill out all required fields"
            }

            else {
                vm.updatedPage = vm.page;
                delete vm.updatedPage._id;
                PageService
                    .updatePage(vm.pageId, vm.updatedPage)
                    .then(function(response) {
                        var result = response.data;
                        if (result) {
                            vm.error = "";
                            vm.success = "Website successfully updated";
                        } else {
                            vm.error = "Website not updated";
                        }
                    })
            }

        }

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .then(function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                });
        }
    }

})();
