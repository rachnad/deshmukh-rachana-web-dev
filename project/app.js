module.exports = function(app) {

    require("./services/user.service.server.js")(app);
    require("./services/songkick.service.server.js")(app);
    require("./services/favorites.service.server.js")(app);
    require("./services/following.service.server.js")(app);
}