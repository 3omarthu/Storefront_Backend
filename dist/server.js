"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.serverApi = void 0;
var express_1 = __importDefault(require("express"));
var routes_1 = require("./api/routes");
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(express_1["default"].json());
(0, routes_1.routes)(app);
app.use(express_1["default"].json());
exports.serverApi = app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
