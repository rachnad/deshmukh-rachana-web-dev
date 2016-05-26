/**
 * Created by rachanadeshmukh on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "/views/user/login.view.client.html",
                controller: "LoginController"
            })
            .when("/default", {
                templateUrl: "/views/user/login.view.client.html",
                controller: "LoginController"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController"
            })
            .when("/user/:uid", {
                templateUrl: "/views/user/profile.view.client.html",
                controller: "ProfileController"
            })
            .when("/user/:uid/website", {
                templateUrl: "/views/user/website-list.view.client.html",
                controller: "WebsiteListController"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "/views/user/website-new.view.client.html",
                controller: "NewWebsiteController"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "/views/user/website-edit.view.client.html",
                controller: "EditWebsiteController"
            })
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "/views/user/page-list.view.client.html",
                controller: "PageListController"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "/views/user/page-new.view.client.html",
                controller: "NewPageController"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "/views/user/pade-edit.view.client.html",
                controller: "EditPageController"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "/views/user/widget-list.view.client.html",
                controller: "WidgetListController"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "/views/user/widget-choose.view.client.html",
                controller: "NewWidgetController"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "/views/user/widget-edit.view.client.html",
                controller: "EditWidgetController"
            })
    }
})();
