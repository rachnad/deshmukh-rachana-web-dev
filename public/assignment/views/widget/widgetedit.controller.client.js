/**
 * Created by rachanadeshmukh on 5/29/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);


    function EditWidgetController($scope, $routeParams, WidgetService, $location, $http) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.uploadImage = uploadImage;


        function init() {
            console.log(vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(response) {
                    vm.widget = angular.copy(response.data);
                });
        }
        init();

        function headerValidation() {
            return (vm.widget.name == undefined || vm.widget.text == undefined ||
                vm.widget.size == undefined)
        }

        function imageValidation() {
            return (vm.widget.name == undefined || vm.widget.text == undefined
            || vm.widget.url == undefined || vm.widget.width == undefined)
        }

        function updateWidget() {
            console.log(vm.widget.width);

            if (vm.widget.type === "HEADER" && headerValidation()){
                 vm.success = "";
                vm.error = "Fill out all required fields"
            }
            else if ((vm.widget.type === "IMAGE" || vm.widget.type === "YOUTUBE") &&
                imageValidation()) {
                vm.success = "";
                vm.error = "Fill out all required fields"
            }
            else {
                vm.updatedWidget = vm.widget;
                delete vm.updatedWidget._id;
                WidgetService
                    .updateWidget(vm.widgetId, vm.updatedWidget)
                    .then(function(response) {
                        var result = response.data;
                        if (result) {
                            vm.error = "";
                            vm.success = "Website successfully updated";
                        } else {
                            vm.success = "";
                            vm.error = "Website not updated";
                        }
                    })
            }

        }

        function deleteWidget(){
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function(response) {
                    $location.url("/user/"+vm.userId + "/website/"+vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
        }

        function uploadImage() {
            console.log(vm.widget);
            $http.post("/api/upload", vm.widget);
        }
    }
})();