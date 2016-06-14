/**
 * Created by rachanadeshmukh on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            login: login,
            logout: logout,
            register: register,
            createUser   : createUser,
            findUserById : findUserById,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            checkLoggedIn: checkLoggedIn
        };
        return api;

        function checkLoggedIn() {
            return $http.get("/api/loggedin");
        }

        function login(user) {
            var url = "/api/login";
            return $http.post(url, user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }

        function register(user) {
            var url = "/api/register";
            return $http.post("/api/register", user);
        }


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
            return $http.delete("/api/user/" +userID);
        }
    }
})();
