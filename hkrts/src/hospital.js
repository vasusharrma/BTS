"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
var PORT = 4444;
app.use(body_parser_1.default.json());
var user = [{
        name: "Baklasur",
        kidneys: [{
                healthy: true
            }, {
                healthy: true
            }, {
                healthy: false
            }]
    }];
function knowKidneys() {
    var hkidneys = 0;
    var tkidneys = 0;
    var ukidneys = 0;
    var i = user[0];
    var uname = i.name;
    tkidneys = i.kidneys.length;
    var healthykidney = i.kidneys.filter(function (e) { return e.healthy; });
    hkidneys = healthykidney.length;
    ukidneys = tkidneys - hkidneys;
    return { uname: uname, hkidneys: hkidneys, tkidneys: tkidneys, ukidneys: ukidneys };
}
function addKidneys(arg) {
    user[0].kidneys = __spreadArray(__spreadArray([], user[0].kidneys, true), arg, true);
}
app.get('/', function (req, res) {
    var _a = knowKidneys(), ukidneys = _a.ukidneys, uname = _a.uname, hkidneys = _a.hkidneys, tkidneys = _a.tkidneys;
    res.json({
        username: uname,
        totalkindneys: tkidneys,
        totalHealthyKidneys: hkidneys,
        totalunhealthykindeys: ukidneys
    });
});
app.post('/', function (req, res) {
    var arg = req.body.arg;
    addKidneys(arg);
    res.json({ msg: "Done" });
});
app.put('/', function (req, res) {
    if (isKidneyUnhealtyAvailable()) {
        res.status(411).send("There is no unhealthy kidney");
    }
    else {
        for (var _i = 0, _a = user[0].kidneys; _i < _a.length; _i++) {
            var i = _a[_i];
            i.healthy = true;
        }
        res.json({ msg: "put req done" });
    }
});
app.delete('/', function (req, res) {
    var kidneytodelete = Number(req.query.td);
    if (isKidneyDeleteAvailable(kidneytodelete)) {
        res.status(411).send("There is no kidney to delete");
    }
    else {
        for (var i = 0; i < kidneytodelete; i++) {
            user[0].kidneys.pop();
        }
        res.json({ msg: "delete req done" });
    }
});
app.listen(PORT, function () {
    console.log("server is linstening on port ".concat(PORT, " "));
});
function isKidneyDeleteAvailable(kidneytodelete) {
    var isKDA = false;
    if (user[0].kidneys.length - kidneytodelete < 0) {
        isKDA = true;
    }
    return isKDA;
}
function isKidneyUnhealtyAvailable() {
    var isKUA = true;
    for (var _i = 0, _a = user[0].kidneys; _i < _a.length; _i++) {
        var i = _a[_i];
        if (i.healthy === false) {
            isKUA = false;
        }
    }
    return isKUA;
}
