/**
 * Created by rachanadeshmukh on 6/1/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
    function FlickrService($http) {

        var key = "e05bb97a51401954f8a29653c319bbd8";
        var secret = "ef2409a54400d6bc";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api={
            searchPhotos: searchPhotos
        };
        return api;


        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }


    }
    })();