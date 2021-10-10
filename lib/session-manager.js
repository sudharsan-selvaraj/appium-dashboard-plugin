"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.SessionManager = void 0;
const utils_1 = require("./utils");
const logger_1 = require("./logger");
const fs = __importStar(require("fs"));
const circularjson = require("circular-json");
class SessionManager {
    constructor(sessionInfo) {
        this.sessionInfo = sessionInfo;
        this.sessionInfo.is_completed = false;
    }
    onCommandRecieved(command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (command.commandName == "createSession") {
                return yield this.startScreenRecording(command.driver);
            }
            else if (command.commandName == "deleteSession") {
                this.sessionInfo.is_completed = true;
                yield this.saveScreenRecording(command.driver);
            }
            else if (command.commandName == "proxyReqRes") {
                let promise = (0, utils_1.interceptProxyResponse)(command.args[1]);
                let originalNext = command.next;
                command.next = () => __awaiter(this, void 0, void 0, function* () { return (yield Promise.all([originalNext(), promise]))[1]; });
                Object.assign(command, Object.assign({}, (0, utils_1.routeToCommand)(command.args)));
                this.appendLogs("Inside Proxy Req");
            }
            this.appendLogs(`Recieved command ${command.commandName}`);
            let res = yield command.next();
            this.appendLogs(command.commandName);
            this.appendLogs(!res ? "null" : JSON.stringify(res));
            this.appendLogs("------------------------------------------------------------------------------------------");
            return res;
        });
    }
    appendLogs(log) {
        fs.appendFileSync("/Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/log.txt", `${log}\n`);
    }
    startScreenRecording(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, utils_1.startScreenRecording)(driver, this.sessionInfo.session_id);
        });
    }
    saveScreenRecording(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            let videoBase64String = yield (0, utils_1.stopScreenRecording)(driver, this.sessionInfo.session_id);
            if (videoBase64String.value != "") {
                fs.writeFileSync(`/Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/videos/${this.sessionInfo.session_id}.mp4`, videoBase64String.value, "base64");
                logger_1.log.info(`Saving screenrecording.. /Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/videos/${this.sessionInfo.session_id}.mp4`);
            }
        });
    }
}
exports.SessionManager = SessionManager;
