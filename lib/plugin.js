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
exports.AppiumDashboardPlugin = void 0;
const base_plugin_1 = __importDefault(require("@appium/base-plugin"));
const command_parser_1 = require("./command-parser");
const session_manager_1 = require("./session-manager");
const utils_1 = require("./utils");
const sessionMap = new Map();
class AppiumDashboardPlugin extends base_plugin_1.default {
    constructor(pluginName) {
        super(pluginName);
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
                /**
                 * Append additional log capabilities to payload
                 */
                args[2]["appium:clearDeviceLogsOnStart"] = true;
                args[2].firstMatch[0]["appium:clearDeviceLogsOnStart"] = true;
                var response = yield next();
                if (response.error) {
                    return response;
                }
                else {
                    let sessionInfo = (0, utils_1.getSessionDetails)(response);
                    let sessionManager = new session_manager_1.SessionManager(sessionInfo, new command_parser_1.CommandParser(sessionInfo));
                    sessionMap.set(sessionInfo.session_id, sessionManager);
                    yield sessionManager.onCommandRecieved(appiumCommand);
                    return response;
                }
            }
            let sessionId = args[args.length - 1];
            if (sessionMap.has(sessionId)) {
                return yield ((_a = sessionMap.get(sessionId)) === null || _a === void 0 ? void 0 : _a.onCommandRecieved(appiumCommand));
            }
            else {
                return yield next();
            }
        });
    }
}
exports.AppiumDashboardPlugin = AppiumDashboardPlugin;
