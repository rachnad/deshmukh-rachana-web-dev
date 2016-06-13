module.exports = function(app) {

    var models = require("./model/models.js")();
    require("./services/user.service.server.js")(app, models);
    require("./services/songkick.service.server.js")(app, models);
    require("./services/favorites.service.server.js")(app, models);
    require("./services/following.service.server.js")(app, models);
}