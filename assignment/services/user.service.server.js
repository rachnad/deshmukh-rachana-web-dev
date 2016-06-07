/**
 * Created by rachanadeshmukh on 5/31/16.
 */

module.exports = function(app, models) {

    var userModel = models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send(error);
                    //res.status(400).send("Username " + newUser.username + " is already in use");
                }
            );

        //users.push(newUser);
        //res.send(newUser);
    }



    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user){
                    res.send(user);
                },
                function(error){
                    res.status(400).send(error);
                }
            );
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
        //var username = req.params.username;
        /*
        for (var i in users) {
            if (users[i].username === username) {
                return res.send(users[i]);
            }
        }
        return res.send({});
        */
    }

    function findUserByCredentials(username, password, res) {
        //var username = req.params.username;
        //var password  = req.params.password;
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        /*
        for (var i in users) {
            if(users[i].username === username && users[i].password === password) {
                return res.send(users[i]);
            }
        }
        return res.send(null);
        */
    }

    function updateUser(req, res) {
        var userID = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userID, newUser)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );

        /*
        for (var i in users)  {
            if (users[i]._id === userID) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].username = newUser.username;
                return res.send(users[i]);
            }
        }
        return false;
        */
    }

    function deleteUser(req, res) {
        var userID = req.params.userId;
        userModel
            .deleteUser(userID)
            .then(
                function(users) {
                    res.send(users);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
        /*
        for (var i in users) {
            if (users[i]._id === userID) {
                users.splice(users[i], 1)
            }
        }
        res.send(null);
        */
    }

    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        if(username && password) {
            return findUserByCredentials(username, password, res);
        } if(username) {
            return findUserByUsername(username, res);
        } else {
            res.send(users);
        }
    }
};


