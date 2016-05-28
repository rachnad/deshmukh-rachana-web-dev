/**
 * Created by rachanadeshmukh on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
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
            users.push(user);
        }

        function findUserById(userID) {
            for (var i in users) {
                if (users[i]._id === userID) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    return users[i];
                }
            }
            return null;
        }



        function findUserByCredentials(username, password) {
            for (var i in users) {
                if(users[i].username === username && users[i].password === password) {
                    return users[i];
                }
            }
            return null;
        }

        function updateUser(userID, newUser) {
            for (var i in users)  {
                if (users[i]._id === userID) {
                    users[i].firstName = newUser.firstName;
                    users[i].lastName = newUser.lastName;
                    users[i].username = newUser.username;
                    console.log(users[i]);
                    return true;
                }
            }
            return false;
        }

        function deleteUser(userID) {
            for (var i in users) {
                if (users[i]._id === userID) {
                    users.splice(users[i], 1)
                }
            }
            return null;
        }
    }
})();
