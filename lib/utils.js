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
exports.routeToCommand = exports.interceptProxyResponse = exports.getSessionDetails = exports.makePostCall = exports.makeGETCall = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const circularjson = require("circular-json");
const appium_base_driver_1 = require("appium-base-driver");
const logger_1 = require("./logger");
function getSessionDetails(sessionResponse) {
    console.log(sessionResponse.value);
    let [session_id, caps] = sessionResponse.value;
    let sessionInfo = {
        session_id,
        platform: caps.platform,
        platform_name: caps.platformName.toUpperCase(),
        automation_name: caps.automationName,
        app: caps.app,
        udid: caps.platformName.toLowerCase() == "ios" ? caps.udid : caps.deviceUDID,
        capabilities: {},
    };
    Object.keys(caps)
        .filter((k) => Object.keys(sessionInfo).indexOf(k) == -1)
        .forEach((k) => (sessionInfo.capabilities[k] = caps[k]));
    return sessionInfo;
}
exports.getSessionDetails = getSessionDetails;
function getDriverEndpoint(driver) {
    let { address, port, basePath } = driver.opts || driver;
    return `http://${address}:${port}${basePath != "" ? "/" + basePath : ""}`;
}
function makePostCall(driver, sessionId, path, body) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.log.info(`enpoint ${getDriverEndpoint(driver)}/session/${sessionId}/${path}`);
        const response = yield (0, node_fetch_1.default)(`${getDriverEndpoint(driver)}/session/${sessionId}/${path}`, {
            method: "post",
            body: body ? JSON.stringify(body) : "{}",
            headers: { "Content-Type": "application/json" },
        });
        return yield response.json();
    });
}
exports.makePostCall = makePostCall;
function makeGETCall(driver, sessionId, path) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.log.info(`enpoint ${getDriverEndpoint(driver)}/session/${sessionId}/${path}`);
        const response = yield (0, node_fetch_1.default)(`${getDriverEndpoint(driver)}/session/${sessionId}/${path}`);
        return yield response.json();
    });
}
exports.makeGETCall = makeGETCall;
function interceptProxyResponse(response) {
    return new Promise((resolve, reject) => {
        const defaultWrite = response.write;
        const defaultEnd = response.end;
        const chunks = [];
        response.write = (...restArgs) => {
            chunks.push(Buffer.from(restArgs[0]));
            defaultWrite.apply(response, restArgs);
        };
        response.end = (...restArgs) => {
            if (restArgs[0]) {
                chunks.push(Buffer.from(restArgs[0]));
            }
            const body = Buffer.concat(chunks).toString("utf8");
            defaultEnd.apply(response, restArgs);
            resolve(JSON.parse(body).value);
        };
    });
}
exports.interceptProxyResponse = interceptProxyResponse;
function routeToCommand(proxyReqRes) {
    return {
        commandName: (0, appium_base_driver_1.routeToCommandName)(proxyReqRes[0].originalUrl, proxyReqRes[0].method),
        newargs: [proxyReqRes[0].body, proxyReqRes[proxyReqRes.length - 1]],
    };
}
exports.routeToCommand = routeToCommand;
