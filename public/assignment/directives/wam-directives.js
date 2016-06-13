/**
 * Created by rachanadeshmukh on 6/8/16.
 */
(function() {
    angular
        .module("wamDirective", [])
        .directive("wamDirective", wamDirective);

    function wamDirective() {
        function linker(scope, element, attributes) {
            var data = scope.data;
            var startIndex = -1;
            var stopIndex = -1;

            $(element)
                .sortable({
                    axis: "y",
                    handle: ".rd-widget-tool",
                    start: function(event, ui) {
                        startIndex = ui.item.index();
                    },
                    stop: function(event, ui) {
                        stopIndex = ui.item.index();
                        var sorting = scope.data.splice(startIndex, 1);
                        var sortedElement = sorting[0];
                        scope.data.splice(stopIndex, 0, sortedElement);
                        scope.$apply();
                        scope.reorder({start: startIndex, end: stopIndex});
                    }
                });
        }
        return {
            scope: {
                data: "=",
                reorder: "&sorted"
            },
            link: linker
        }
    }
})();