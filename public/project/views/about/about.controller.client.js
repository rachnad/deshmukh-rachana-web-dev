/**
 * Created by rachanadeshmukh on 6/20/16.
 */

(function(){
    "use strict";
    angular
        .module("Vibe")
        .controller("AboutController", AboutController);

    function AboutController($scope, $routeParams, $location, $rootScope) {
        var vm = this;
        $rootScope.landing= true;
    }



})();