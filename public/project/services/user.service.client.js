/**
 * Created by rachanadeshmukh on 5/31/16.
 */


(function() {
    angular
        .module("Vibe")
        .factory("ProjectUserService", ProjectUserService);

    function ProjectUserService($http) {
        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser
        };
        return api;
        function createUser(user) {
            return $http.post("/project/user/", user);
        }

        function findUserById(userID) {
            return $http.get("/project/user/"+userID);
        }

        function findUserByUsername(username) {
            return $http.get("/project/user?username="+userID);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/project/user?username=" +username +"&password=" +password);
        }

        function updateUser(userID, newUser) {
            return $http.put("/project/user/" +userID, newUser);
        }

        function deleteUser(userID) {
            return $http.delete("/project/user/" + userID);
        }
    }
})();

