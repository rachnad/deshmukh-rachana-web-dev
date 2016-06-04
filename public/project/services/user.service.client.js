/**
 * Created by rachanadeshmukh on 5/31/16.
 */


(function() {
    angular
        .module("Vibe")
        .factory("UserService", UserService);

    function UserService($http) {
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
            return $http.post("/api/user/", user);
        }

        function findUserById(userID) {
            return $http.get("/api/user/"+userID);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+userID);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" +username +"&password=" +password);
        }

        function updateUser(userID, newUser) {
            return $http.put("/api/user/" +userID, newUser);
        }

        function deleteUser(userID) {
            return $http.delete("/api/user/" + userID);
        }
    }
})();

