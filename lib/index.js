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
exports.AppiumDashboardPlugin = void 0;
const database_loader_1 = require("./database-loader");
const plugin_1 = require("./plugin");
Object.defineProperty(exports, "AppiumDashboardPlugin", { enumerable: true, get: function () { return plugin_1.AppiumDashboardPlugin; } });
(() => __awaiter(void 0, void 0, void 0, function* () { 
//load sequelize database
return yield (0, database_loader_1.sequelizeLoader)(); }))();
