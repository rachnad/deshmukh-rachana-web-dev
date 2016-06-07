/**
 * Created by rachanadeshmukh on 6/6/16.
 */
module.exports = function() {
    var mongoose = require("mongoose");

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        type: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'],
        name: String,
        text: String,
        placeholder:String,
        description: String,
        url: String,
        width: Number,
        height: Number,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreate: {type: Date, default: Date.now}
    }, {collection: "widgets"});

    return WidgetSchema;
};