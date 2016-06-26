/**
 * Created by rachanadeshmukh on 5/31/16.
 */

(function() {
    angular
        .module("Vibe")
        .factory("ProjectUserService", ProjectUserService);

    function ProjectUserService($http) {
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
            addFriend: addFriend,
            unFriend: unFriend,
            findUserbyFriendID: findUserbyFriendID,
            checkLoggedIn: checkLoggedIn
        };
        return api;

        function checkLoggedIn() {
            return $http.get("/api/loggedin");
        }

        function login(user) {
            return $http.post("/project/api/login", user);

        }

        function logout(user) {
            return $http.post("/project/api/logout");
        }

        function register(user) {
            return $http.post("/project/api/register", user);
        }

        function createUser(user) {
            return $http.post("/project/user/", user);
        }

        function findUserById(userID) {
            return $http.get("/project/user/"+userID);
        }

        function findUserByUsername(username) {
            return $http.get("/project/user?username="+username);
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

        function addFriend(userID, friendID) {
            return $http.put("/project/user/" +userID+ "/friend/" +friendID);
        }

        function unFriend(userID, friendID) {
            return $http.put("/project/user/" +userID+ "/unfriend/" +friendID);
        }

        function findUserbyFriendID(userID, friendname) {
            return $http.get("/project/user/" +userID+ "/friend/" +friendname);
        }
    }
})();

