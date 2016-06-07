/**
 * Created by rachanadeshmukh on 6/6/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        pages: [String],
        dateCreate: {type: Date, default: Date.now}
    }, {collection: "websites"});

    return WebsiteSchema;
};