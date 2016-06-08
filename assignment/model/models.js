module.exports = function() {

    var mongoose = require('mongoose');
    var connectionString = 'mongodb://127.0.0.1:27017/web-dev';

    if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

   // Connect to mongodb
    var connect = function () {
        mongoose.connect(url);
    };
    connect();

    var db = mongoose.connection;

    db.on('error', function(error){
        console.log("Error loading the db - "+ error);
    });

    db.on('disconnected', connect);

    //mongoose.connect('mongodb://localhost/web-dev');

    var userModel = require("./user/user.model.server.js")();
    var websiteModel = require("./website/website.model.server.js")();
    var pageModel = require("./page/page.model.server.js")();
    var widgetModel = require("./widget/widget.model.server.js")();

    var models = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel: pageModel,
        widgetModel: widgetModel
    };

    return models;
};