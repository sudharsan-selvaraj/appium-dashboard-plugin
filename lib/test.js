"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const database_loader_1 = require("./database-loader");
const session_1 = require("./models/session");
const fs = require("fs");
let android = (0, utils_1.getSessionDetails)(JSON.parse(fs.readFileSync("/Users/sselvar4/Documents/git/personal/appium-dashboard/jsons/android-session-response.json", "utf-8")));
let ios = (0, utils_1.getSessionDetails)(JSON.parse(fs.readFileSync("/Users/sselvar4/Documents/git/personal/appium-dashboard/jsons/ios-session-response.json", "utf-8")));
[android, ios].forEach((obj) => {
    obj.start_time = new Date();
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, database_loader_1.sequelizeLoader)();
        yield session_1.Session.create(android);
        yield session_1.Session.create(ios);
        let res = yield session_1.Session.findAll();
        console.log(res[0].capabilities);
    });
})();
