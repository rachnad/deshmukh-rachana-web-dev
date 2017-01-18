var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://personal-deshmukhrachana.rhcloud.com");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport     = require('passport');


//var meanTest = require ("./test/app.js");
var assignment = require("./assignment/app.js");
var project = require("./project/app.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session(
    {secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true}));


app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


//meanTest(app);
project(app);
assignment(app);

app.listen(port, ipaddress);
