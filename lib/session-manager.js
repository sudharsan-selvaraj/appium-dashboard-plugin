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
const comman_executor_1 = require("./comman-executor");
const comman_executor_2 = require("./comman-executor");
const parser = __importStar(require("./command-parser"));
const models_1 = require("./models");
const logger_1 = require("./logger");
const fs = __importStar(require("fs"));
const CREATE_SESSION = "createSession";
class SessionManager {
    constructor(sessionInfo) {
        this.sessionInfo = sessionInfo;
        this.logTypes = [];
        this.isLogsPending = false;
        this.sessionInfo.is_completed = false;
    }
    onCommandRecieved(command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (command.commandName == CREATE_SESSION) {
                return yield this.sessionStarted(command);
            }
            else if (command.commandName == "deleteSession") {
                yield this.sessionTerminated(command);
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
            yield this.saveCommandLog(command, res);
            this.appendLogs(command.commandName);
            this.appendLogs(!res ? "null" : JSON.stringify(res));
            this.appendLogs("------------------------------------------------------------------------------------------");
            return res;
        });
    }
    sessionStarted(command) {
        return __awaiter(this, void 0, void 0, function* () {
            this.driverOpts = command.driver.opts;
            yield models_1.Session.create(Object.assign(Object.assign({}, this.sessionInfo), { start_time: new Date() }));
            yield this.initializeLogging(command.driver);
            yield this.saveCommandLog(command, null);
            return yield this.startScreenRecording(command.driver);
        });
    }
    sessionTerminated(command) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sessionInfo.is_completed = true;
            yield this.saveScreenRecording(command.driver);
        });
    }
    saveCommandLog(command, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let p = parser;
            if (p[command.commandName]) {
                response = command.commandName == CREATE_SESSION ? this.sessionInfo : response;
                let parsedLog = p[command.commandName](command.driver, command.args, response);
                Object.assign(parsedLog, {
                    session_id: this.sessionInfo.session_id,
                    command_name: command.commandName,
                });
                try {
                    yield models_1.CommandLogs.create(parsedLog);
                }
                catch (err) {
                    logger_1.log.info(err);
                    throw err;
                }
            }
        });
    }
    appendLogs(log) {
        fs.appendFileSync("/Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/log.txt", `${log}\n`);
    }
    startScreenRecording(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, comman_executor_1.startScreenRecording)(driver, this.sessionInfo.session_id);
        });
    }
    initializeLogging(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logTypes = (yield (0, comman_executor_2.getLogTypes)(driver, this.sessionInfo.session_id)).value || [];
            //this.logInterval = setInterval(this.fetchLogs.bind(this), 5000);
        });
    }
    fetchLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isLogsPending) {
                return;
            }
            if (this.sessionInfo.is_completed) {
                clearInterval(this.logInterval);
                logger_1.log.info(`Closing logs for session ${this.sessionInfo.session_id}`);
            }
            else {
                this.isLogsPending = true;
                logger_1.log.info(`Fetching logs for session ${this.sessionInfo.session_id}`);
                let logs = yield Promise.all(this.logTypes.map((l) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, comman_executor_2.getLogs)(this.driverOpts, this.sessionInfo.session_id, l);
                })));
                logger_1.log.info(`${logs.length}`);
                this.isLogsPending = false;
            }
        });
    }
    saveScreenRecording(driver) {
        return __awaiter(this, void 0, void 0, function* () {
            let videoBase64String = yield (0, comman_executor_1.stopScreenRecording)(driver, this.sessionInfo.session_id);
            if (videoBase64String.value != "") {
                fs.writeFileSync(`/Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/videos/${this.sessionInfo.session_id}.mp4`, videoBase64String.value, "base64");
                logger_1.log.info(`Saving screenrecording.. /Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/videos/${this.sessionInfo.session_id}.mp4`);
            }
        });
    }
}
exports.SessionManager = SessionManager;
