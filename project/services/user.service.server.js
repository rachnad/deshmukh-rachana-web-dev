/**
 * Created by rachanadeshmukh on 6/3/16.
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(app, models) {

    var userModel = models.userModel;


    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };


    console.log(googleConfig);

    app.post("/project/user", createUser);
    app.get("/project/user", getUsers);
    app.get("/project/user/:userId", findUserById);
    app.get("/project/user?username=username", findUserByUsername);
    app.get("/project/user?username=username&password=password", findUserByCredentials);
    app.put("/project/user/:userId", updateUser);
    app.delete("/project/user/:userId", deleteUser);
    //app.put("/project/user/:uid/friend/:fid", addFriendtoUser);
    app.put("/project/user/:uid/unfriend/:fid", unFriendtoUser);
    app.get("/project/user/:uid/friend/:fid", findUserbyFriendName);


    app.post  ('/project/api/login', passport.authenticate('vibe-user'), login);
    app.post  ('/project/api/logout',         logout);
    app.post  ('/project/api/register',       register);


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/auth/success',
            failureRedirect: '/project/auth/failure'
        }));

    app.get('/project/auth/success', function (req, res) {
        res.redirect("/project/#/user/"+req.user._id);
    });
    app.get('/project/auth/failure', function (req, res) {
        res.render('/project/#/login');
    });


    passport.use('vibe-user', new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function login(req, res) {
        var user = req.user;
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

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token,
                                displayName: emailParts[0]
                            }
                        };
                        return userModel
                            .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
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

    /*
    function addFriendtoUser(req, res) {
        var userId = req.params.uid;
        var friendID = req.params.fid;

        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    user.friends.push(friendID);
                    userModel
                        .updateUser(user)
                        .then(
                            function(user) {
                                res.send(user);
                            },
                            function(error) {
                                res.status(400).send(error);
                            })
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }
    */

    function unFriendtoUser(req, res) {
        var userId = req.params.uid;
        var friendID = req.params.fid;

        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    var fIndex = user.friends.indexOf(friendID);
                    user.friends.splice(fIndex, 1);

                    userModel
                        .updateUser(user)
                        .then(
                            function(user) {
                                res.send(user);
                            },
                            function(error) {
                                res.status(400).send(error);
                            })
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }

    function findUserbyFriendName(req, res) {
        var userId = req.params.uid;
        var friendname = req.params.fid;

        userModel
            .findUserbyFriendID(userId, friendname)
            .then(
                function(user) {
                    res.send(user);
                },
                function(error) {
                    res.status(400).send(error);
                }
            )
    }


};


