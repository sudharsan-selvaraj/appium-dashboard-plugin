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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_plugin_1 = __importDefault(require("@appium/base-plugin"));
const session_manager_1 = require("./session-manager");
const utils_1 = require("./utils");
class AppiumDashboardPlugin extends base_plugin_1.default {
    constructor(pluginName) {
        super(pluginName);
        this.sessionMap = new Map();
    }
    handle(next, driver, commandName, ...args) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let appiumCommand = {
                driver,
                commandName,
                next,
                args,
            };
            if (commandName == "createSession") {
                var response = yield next();
                if (response.error) {
                    return response;
                }
                else {
                    let sessionInfo = (0, utils_1.getSessionDetails)(response);
                    let sessionManager = new session_manager_1.SessionManager(sessionInfo);
                    this.sessionMap.set(sessionInfo.session_id, new session_manager_1.SessionManager(sessionInfo));
                    return yield sessionManager.onCommandRecieved(appiumCommand);
                }
            }
            if (this.sessionMap.get(args[0])) {
                return yield ((_a = this.sessionMap
                    .get(args[0])) === null || _a === void 0 ? void 0 : _a.onCommandRecieved(appiumCommand));
            }
            else {
                return yield next();
            }
        });
    }
}
