"use strict";
exports.__esModule = true;
exports.routes = void 0;
var Orders_1 = require("./Controller/Orders");
var Products_1 = require("./Controller/Products");
var Users_1 = require("./Controller/Users");
var _routes = [
    ['/order', Orders_1.OrderController],
    ['/product', Products_1.ProductController],
    ['/user', Users_1.UserController]
];
var routes = function (app) {
    _routes.forEach(function (route) {
        var url = route[0], controller = route[1];
        app.use(url, controller);
    });
};
exports.routes = routes;
