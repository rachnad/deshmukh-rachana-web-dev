/**
 * Created by rachanadeshmukh on 5/31/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {

    var userModel = models.userModel;

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    app.post("/api/user", createUser);
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post ("/api/register", register);
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook',
            {
                successRedirect: '/auth/success',
                failureRedirect: '/auth/failure'
            }
        ));

    app.get('/auth/success', function (req, res) {
        res.redirect("/assignment/#/user/"+req.user._id);
    });
    app.get('auth/failure', function (req, res) {
        res.render('/assignment/#/login');
    });
    app.get ('/api/loggedin', loggedin);

    passport.use('wam', new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function login(req, res) {
        var user = req.user;
        console.log(user);
        return res.json(user);
    }


    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register (req, res) {
        var user = req.body;
        var password = user.password;
        user.password = bcrypt.hashSync(password);
        userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                return res.status(400).send(err);
                            } else {
                                console.log(user);
                                return res.json(user);
                            }
                        });
                    }
            }
        );
    }


    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.send(req.user)
        }
        else {
            res.send('0')
        }}


    function serializeUser(user, done) {
        return done(null, user);
    }


    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    return done(err, null);
                }
            );
    }


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log(user);
                    if(user.username === username && (bcrypt.compareSync(password, user.password))) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel.findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        var fbuser = {
                            username: profile.displayName.replace(/ /g, '').toLowerCase(),
                            facebook: {
                                id: profile.id,
                                token: token,
                                displayName: profile.displayName
                            }
                        };
                        return userModel
                            .createUser(fbuser);
                    }
                },
                function(error) {
                    return done(null);
                }
            )
            .then(
                function(user) {
                    return done(null, user);
                },
                function(error) {
                    return done(null);
                }
            );
    }

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        }
        else {
            next();
        }
    }


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

    function findUserByUsername(username, req, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            );
    }

    function findUserByCredentials(username, password, req, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    return res.send(user);
                },
                function(error) {
                    return res.send(error);
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
            return findUserByCredentials(username, password, req, res);
        } if(username) {
            return findUserByUsername(username, req, res);
        } else {
            res.send(users);
        }
    }
};


