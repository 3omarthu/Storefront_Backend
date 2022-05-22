"use strict";
exports.__esModule = true;
exports.routes = void 0;
var Controller_1 = require("./Controller/Controller");
var _routes = [
    ['/', Controller_1.Controller]
];
var routes = function (app) {
    _routes.forEach(function (route) {
        var url = route[0], controller = route[1];
        app.use(url, controller);
    });
};
exports.routes = routes;
