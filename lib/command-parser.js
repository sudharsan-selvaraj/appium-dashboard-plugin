"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.createSession = void 0;
function createSession(driver, args, response) {
    return {
        title: "CREATED NEW SESSION",
        title_info: response.session_id,
        response: null,
        params: null,
    };
}
exports.createSession = createSession;
function deleteSession(driver, args, response) {
    return {
        title: "CLIENT DELETED THE SESSION",
        title_info: response.session_id,
        response: null,
        params: null,
    };
}
exports.deleteSession = deleteSession;
