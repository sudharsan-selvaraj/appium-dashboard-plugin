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
exports.CommandParser = void 0;
class CommandParser {
    constructor(sessionInfo) {
        this.sessionInfo = sessionInfo;
    }
    isProxyRequest(args) {
        return !!args[0].route;
    }
    //TODO
    getStatus(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getStatus",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //COMPLETED
    createSession(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "CREATED NEW SESSION",
                title_info: response.session_id,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getSessions(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getSessions",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getSession(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getSession",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //COMPLETED
    deleteSession(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "CLIENT DELETED THE SESSION",
                title_info: args[0],
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getTimeouts(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getTimeouts",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    timeouts(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "timeouts",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    asyncScriptTimeout(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "asyncScriptTimeout",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    implicitWait(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "implicitWait",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getWindowHandle(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getWindowHandle",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getWindowHandles(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getWindowHandles",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getUrl(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getUrl",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setUrl(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setUrl",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    forward(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "forward",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    back(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "back",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    refresh(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "refresh",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    execute(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "execute",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    executeAsync(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "executeAsync",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getScreenshot(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getScreenshot",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    availableIMEEngines(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "availableIMEEngines",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getActiveIMEEngine(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getActiveIMEEngine",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    isIMEActivated(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "isIMEActivated",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    deactivateIMEEngine(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "deactivateIMEEngine",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    activateIMEEngine(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "activateIMEEngine",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setFrame(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setFrame",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setWindow(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setWindow",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    closeWindow(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "closeWindow",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getWindowSize(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getWindowSize",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    maximizeWindow(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "maximizeWindow",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getCookies(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getCookies",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setCookie(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setCookie",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    deleteCookies(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "deleteCookies",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getCookie(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getCookie",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    deleteCookie(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "deleteCookie",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getPageSource(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getPageSource",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    title(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "title",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    findElement(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let newArgs = [...args];
            if (this.isProxyRequest(args)) {
                newArgs = [...Object.keys(args[0].body), args.pop()];
            }
            return {
                title: "Find element",
                title_info: `${newArgs[0]}=${newArgs[1]}`,
                response: {
                    type: "object",
                    value: response,
                },
                params: {
                    using: newArgs[0],
                    value: newArgs[1],
                },
            };
        });
    }
    //TODO
    findElements(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let newArgs = [...args];
            if (this.isProxyRequest(args)) {
                newArgs = [...Object.keys(args[0].body), args.pop()];
            }
            return {
                title: "Find multiple elements",
                title_info: `${newArgs[0]}=${newArgs[1]}`,
                response: {
                    type: "object",
                    value: response,
                },
                params: {
                    using: newArgs[0],
                    value: newArgs[1],
                },
            };
        });
    }
    //TODO
    active(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "active",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    findElementFromElement(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "findElementFromElement",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    findElementsFromElement(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "findElementsFromElement",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    click(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "click",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    submit(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "submit",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getText(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getText",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setValue(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setValue",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    keys(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "keys",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getName(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getName",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    clear(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "clear",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    elementSelected(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "elementSelected",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    elementEnabled(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "elementEnabled",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getAttribute(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getAttribute",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    equalsElement(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "equalsElement",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    elementDisplayed(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "elementDisplayed",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getLocation(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getLocation",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getLocationInView(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getLocationInView",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getSize(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getSize",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getCssProperty(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getCssProperty",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getOrientation(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getOrientation",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setOrientation(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setOrientation",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getRotation(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getRotation",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setRotation(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setRotation",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    moveTo(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "moveTo",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    clickCurrent(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "clickCurrent",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    buttonDown(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "buttonDown",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    buttonUp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "buttonUp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    doubleClick(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "doubleClick",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    touchDown(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "touchDown",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    touchUp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "touchUp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    touchMove(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "touchMove",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    performActions(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "performActions",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    releaseActions(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "releaseActions",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    touchLongClick(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "touchLongClick",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    flick(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "flick",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getGeoLocation(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getGeoLocation",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setGeoLocation(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setGeoLocation",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getLog(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getLog",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getLogTypes(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getLogTypes",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getCurrentContext(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getCurrentContext",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setContext(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setContext",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getContexts(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getContexts",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getPageIndex(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getPageIndex",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getNetworkConnection(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getNetworkConnection",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setNetworkConnection(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setNetworkConnection",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    performTouch(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "performTouch",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    performMultiAction(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "performMultiAction",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    receiveAsyncResponse(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "receiveAsyncResponse",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    mobileShake(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "mobileShake",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getDeviceTime(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getDeviceTime",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    lock(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "lock",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    unlock(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "unlock",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    isLocked(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "isLocked",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    startRecordingScreen(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "startRecordingScreen",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    stopRecordingScreen(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "stopRecordingScreen",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getPerformanceDataTypes(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getPerformanceDataTypes",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getPerformanceData(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getPerformanceData",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    pressKeyCode(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "pressKeyCode",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    longPressKeyCode(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "longPressKeyCode",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    fingerprint(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "fingerprint",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    sendSMS(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "sendSMS",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    gsmCall(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "gsmCall",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    gsmSignal(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "gsmSignal",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    gsmVoice(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "gsmVoice",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    powerCapacity(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "powerCapacity",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    powerAC(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "powerAC",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    networkSpeed(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "networkSpeed",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    keyevent(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "keyevent",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    mobileRotation(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "mobileRotation",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getCurrentActivity(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getCurrentActivity",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getCurrentPackage(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getCurrentPackage",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    installApp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "installApp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    activateApp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "activateApp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    removeApp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "removeApp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    terminateApp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "terminateApp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    isAppInstalled(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "isAppInstalled",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    queryAppState(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "queryAppState",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    hideKeyboard(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "hideKeyboard",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    isKeyboardShown(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "isKeyboardShown",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    pushFile(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "pushFile",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    pullFile(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "pullFile",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    pullFolder(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "pullFolder",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    toggleFlightMode(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "toggleFlightMode",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    toggleData(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "toggleData",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    toggleWiFi(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "toggleWiFi",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    toggleLocationServices(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "toggleLocationServices",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    openNotifications(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "openNotifications",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    startActivity(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "startActivity",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getSystemBars(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getSystemBars",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getDisplayDensity(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getDisplayDensity",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    touchId(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "touchId",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    toggleEnrollTouchId(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "toggleEnrollTouchId",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    launchApp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "launchApp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    closeApp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "closeApp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    reset(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "reset",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    background(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "background",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    endCoverage(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "endCoverage",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getStrings(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getStrings",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setValueImmediate(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setValueImmediate",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    replaceValue(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "replaceValue",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getSettings(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getSettings",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    updateSettings(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "updateSettings",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    executeDriverScript(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "executeDriverScript",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getLogEvents(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getLogEvents",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    logCustomEvent(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "logCustomEvent",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getAlertText(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getAlertText",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setAlertText(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setAlertText",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    postAcceptAlert(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "postAcceptAlert",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    postDismissAlert(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "postDismissAlert",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getElementRect(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getElementRect",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getElementScreenshot(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getElementScreenshot",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getWindowRect(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getWindowRect",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setWindowRect(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setWindowRect",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    minimizeWindow(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "minimizeWindow",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    fullScreenWindow(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "fullScreenWindow",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getProperty(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getProperty",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setClipboard(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setClipboard",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getClipboard(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getClipboard",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    compareImages(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "compareImages",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    executeCdp(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "executeCdp",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    addVirtualAuthenticator(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "addVirtualAuthenticator",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    removeVirtualAuthenticator(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "removeVirtualAuthenticator",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    addAuthCredential(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "addAuthCredential",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    getAuthCredential(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "getAuthCredential",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    removeAllAuthCredentials(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "removeAllAuthCredentials",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    removeAuthCredential(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "removeAuthCredential",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
    //TODO
    setUserAuthVerified(driver, args, response) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                title: "setUserAuthVerified",
                title_info: null,
                response: null,
                params: null,
            };
        });
    }
}
exports.CommandParser = CommandParser;
