"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionDetails = void 0;
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
