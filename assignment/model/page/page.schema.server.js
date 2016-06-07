/**
 * Created by rachanadeshmukh on 6/6/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var PageSchema = mongoose.Schema({
       _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
        name: String,
        title: String,
        description: String,
        widgets:[String],
        dateCreated:{type: Date, default: Date.now}
    }, {collection: "pages"});

    return PageSchema
};