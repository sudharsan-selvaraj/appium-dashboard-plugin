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
exports.getLogs = exports.getLogTypes = exports.stopScreenRecording = exports.startScreenRecording = void 0;
const utils_1 = require("./utils");
function startScreenRecording(driver, sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.makePostCall)(driver, sessionId, "appium/start_recording_screen", {
            options: {
                videoType: "mpeg4",
            },
        });
    });
}
exports.startScreenRecording = startScreenRecording;
function stopScreenRecording(driver, sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.makePostCall)(driver, sessionId, "appium/stop_recording_screen", {});
    });
}
exports.stopScreenRecording = stopScreenRecording;
function getLogTypes(driver, sessionId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.makeGETCall)(driver, sessionId, "log/types");
    });
}
exports.getLogTypes = getLogTypes;
function getLogs(driver, sessionId, logType) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = yield (0, utils_1.makePostCall)(driver, sessionId, "log", {
            type: logType,
        });
        return res;
    });
}
exports.getLogs = getLogs;
