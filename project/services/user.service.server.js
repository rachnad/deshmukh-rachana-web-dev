/**
 * Created by rachanadeshmukh on 6/3/16.
 */

module.exports = function(app, models) {

    var userModel = models.userModel;

    app.post("/project/user", createUser);
    app.get("/project/user", getUsers);
    app.get("/project/user/:userId", findUserById);
    app.get("/project/user?username=username", findUserByUsername);
    app.get("/project/user?username=username&password=password", findUserByCredentials);
    app.put("/project/user/:userId", updateUser);
    app.delete("/project/user/:userId", deleteUser);


    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }


    function findUserById(req, res) {
        var userID = req.params.userId;

        userModel
            .findUserById(userID)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
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
    }

    function findUserByCredentials(username, password, res) {
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


