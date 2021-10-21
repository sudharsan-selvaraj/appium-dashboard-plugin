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
exports.elementEnabled = exports.elementSelected = exports.clear = exports.getName = exports.keys = exports.setValue = exports.getText = exports.submit = exports.click = exports.findElementsFromElement = exports.findElementFromElement = exports.active = exports.findElements = exports.findElement = exports.title = exports.getPageSource = exports.deleteCookie = exports.getCookie = exports.deleteCookies = exports.setCookie = exports.getCookies = exports.maximizeWindow = exports.getWindowSize = exports.closeWindow = exports.setWindow = exports.setFrame = exports.activateIMEEngine = exports.deactivateIMEEngine = exports.isIMEActivated = exports.getActiveIMEEngine = exports.availableIMEEngines = exports.getScreenshot = exports.executeAsync = exports.execute = exports.refresh = exports.back = exports.forward = exports.setUrl = exports.getUrl = exports.getWindowHandles = exports.getWindowHandle = exports.implicitWait = exports.asyncScriptTimeout = exports.timeouts = exports.getTimeouts = exports.deleteSession = exports.getSession = exports.getSessions = exports.createSession = exports.getStatus = void 0;
exports.gsmCall = exports.sendSMS = exports.fingerprint = exports.longPressKeyCode = exports.pressKeyCode = exports.getPerformanceData = exports.getPerformanceDataTypes = exports.stopRecordingScreen = exports.startRecordingScreen = exports.isLocked = exports.unlock = exports.lock = exports.getDeviceTime = exports.mobileShake = exports.receiveAsyncResponse = exports.performMultiAction = exports.performTouch = exports.setNetworkConnection = exports.getNetworkConnection = exports.getPageIndex = exports.getContexts = exports.setContext = exports.getCurrentContext = exports.getLogTypes = exports.getLog = exports.setGeoLocation = exports.getGeoLocation = exports.flick = exports.touchLongClick = exports.releaseActions = exports.performActions = exports.touchMove = exports.touchUp = exports.touchDown = exports.doubleClick = exports.buttonUp = exports.buttonDown = exports.clickCurrent = exports.moveTo = exports.setRotation = exports.getRotation = exports.setOrientation = exports.getOrientation = exports.getCssProperty = exports.getSize = exports.getLocationInView = exports.getLocation = exports.elementDisplayed = exports.equalsElement = exports.getAttribute = void 0;
exports.getWindowRect = exports.getElementScreenshot = exports.getElementRect = exports.postDismissAlert = exports.postAcceptAlert = exports.setAlertText = exports.getAlertText = exports.logCustomEvent = exports.getLogEvents = exports.executeDriverScript = exports.updateSettings = exports.getSettings = exports.replaceValue = exports.setValueImmediate = exports.getStrings = exports.endCoverage = exports.background = exports.reset = exports.closeApp = exports.launchApp = exports.toggleEnrollTouchId = exports.touchId = exports.getDisplayDensity = exports.getSystemBars = exports.startActivity = exports.openNotifications = exports.toggleLocationServices = exports.toggleWiFi = exports.toggleData = exports.toggleFlightMode = exports.pullFolder = exports.pullFile = exports.pushFile = exports.isKeyboardShown = exports.hideKeyboard = exports.queryAppState = exports.isAppInstalled = exports.terminateApp = exports.removeApp = exports.activateApp = exports.installApp = exports.getCurrentPackage = exports.getCurrentActivity = exports.mobileRotation = exports.keyevent = exports.networkSpeed = exports.powerAC = exports.powerCapacity = exports.gsmVoice = exports.gsmSignal = void 0;
exports.setUserAuthVerified = exports.removeAuthCredential = exports.removeAllAuthCredentials = exports.getAuthCredential = exports.addAuthCredential = exports.removeVirtualAuthenticator = exports.addVirtualAuthenticator = exports.executeCdp = exports.compareImages = exports.getClipboard = exports.setClipboard = exports.getProperty = exports.fullScreenWindow = exports.minimizeWindow = exports.setWindowRect = void 0;
//TODO
function getStatus(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getStatus",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getStatus = getStatus;
//COMPLETED
function createSession(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "CREATED NEW SESSION",
            title_info: response.session_id,
            response: null,
            params: null,
        };
    });
}
exports.createSession = createSession;
//TODO
function getSessions(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getSessions",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getSessions = getSessions;
//TODO
function getSession(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getSession",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getSession = getSession;
//COMPLETED
function deleteSession(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "CLIENT DELETED THE SESSION",
            title_info: args[0],
            response: null,
            params: null,
        };
    });
}
exports.deleteSession = deleteSession;
//TODO
function getTimeouts(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getTimeouts",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getTimeouts = getTimeouts;
//TODO
function timeouts(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "timeouts",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.timeouts = timeouts;
//TODO
function asyncScriptTimeout(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "asyncScriptTimeout",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.asyncScriptTimeout = asyncScriptTimeout;
//TODO
function implicitWait(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "implicitWait",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.implicitWait = implicitWait;
//TODO
function getWindowHandle(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getWindowHandle",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getWindowHandle = getWindowHandle;
//TODO
function getWindowHandles(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getWindowHandles",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getWindowHandles = getWindowHandles;
//TODO
function getUrl(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getUrl",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getUrl = getUrl;
//TODO
function setUrl(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setUrl",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setUrl = setUrl;
//TODO
function forward(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "forward",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.forward = forward;
//TODO
function back(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "back",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.back = back;
//TODO
function refresh(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "refresh",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.refresh = refresh;
//TODO
function execute(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "execute",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.execute = execute;
//TODO
function executeAsync(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "executeAsync",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.executeAsync = executeAsync;
//TODO
function getScreenshot(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getScreenshot",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getScreenshot = getScreenshot;
//TODO
function availableIMEEngines(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "availableIMEEngines",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.availableIMEEngines = availableIMEEngines;
//TODO
function getActiveIMEEngine(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getActiveIMEEngine",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getActiveIMEEngine = getActiveIMEEngine;
//TODO
function isIMEActivated(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "isIMEActivated",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.isIMEActivated = isIMEActivated;
//TODO
function deactivateIMEEngine(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "deactivateIMEEngine",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.deactivateIMEEngine = deactivateIMEEngine;
//TODO
function activateIMEEngine(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "activateIMEEngine",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.activateIMEEngine = activateIMEEngine;
//TODO
function setFrame(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setFrame",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setFrame = setFrame;
//TODO
function setWindow(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setWindow",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setWindow = setWindow;
//TODO
function closeWindow(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "closeWindow",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.closeWindow = closeWindow;
//TODO
function getWindowSize(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getWindowSize",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getWindowSize = getWindowSize;
//TODO
function maximizeWindow(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "maximizeWindow",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.maximizeWindow = maximizeWindow;
//TODO
function getCookies(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getCookies",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getCookies = getCookies;
//TODO
function setCookie(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setCookie",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setCookie = setCookie;
//TODO
function deleteCookies(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "deleteCookies",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.deleteCookies = deleteCookies;
//TODO
function getCookie(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getCookie",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getCookie = getCookie;
//TODO
function deleteCookie(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "deleteCookie",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.deleteCookie = deleteCookie;
//TODO
function getPageSource(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getPageSource",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getPageSource = getPageSource;
//TODO
function title(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "title",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.title = title;
//TODO
function findElement(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "findElement",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.findElement = findElement;
//TODO
function findElements(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "findElements",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.findElements = findElements;
//TODO
function active(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "active",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.active = active;
//TODO
function findElementFromElement(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "findElementFromElement",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.findElementFromElement = findElementFromElement;
//TODO
function findElementsFromElement(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "findElementsFromElement",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.findElementsFromElement = findElementsFromElement;
//TODO
function click(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "click",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.click = click;
//TODO
function submit(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "submit",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.submit = submit;
//TODO
function getText(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getText",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getText = getText;
//TODO
function setValue(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setValue",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setValue = setValue;
//TODO
function keys(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "keys",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.keys = keys;
//TODO
function getName(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getName",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getName = getName;
//TODO
function clear(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "clear",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.clear = clear;
//TODO
function elementSelected(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "elementSelected",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.elementSelected = elementSelected;
//TODO
function elementEnabled(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "elementEnabled",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.elementEnabled = elementEnabled;
//TODO
function getAttribute(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getAttribute",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getAttribute = getAttribute;
//TODO
function equalsElement(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "equalsElement",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.equalsElement = equalsElement;
//TODO
function elementDisplayed(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "elementDisplayed",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.elementDisplayed = elementDisplayed;
//TODO
function getLocation(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getLocation",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getLocation = getLocation;
//TODO
function getLocationInView(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getLocationInView",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getLocationInView = getLocationInView;
//TODO
function getSize(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getSize",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getSize = getSize;
//TODO
function getCssProperty(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getCssProperty",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getCssProperty = getCssProperty;
//TODO
function getOrientation(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getOrientation",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getOrientation = getOrientation;
//TODO
function setOrientation(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setOrientation",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setOrientation = setOrientation;
//TODO
function getRotation(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getRotation",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getRotation = getRotation;
//TODO
function setRotation(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setRotation",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setRotation = setRotation;
//TODO
function moveTo(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "moveTo",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.moveTo = moveTo;
//TODO
function clickCurrent(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "clickCurrent",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.clickCurrent = clickCurrent;
//TODO
function buttonDown(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "buttonDown",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.buttonDown = buttonDown;
//TODO
function buttonUp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "buttonUp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.buttonUp = buttonUp;
//TODO
function doubleClick(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "doubleClick",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.doubleClick = doubleClick;
//TODO
function touchDown(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "touchDown",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.touchDown = touchDown;
//TODO
function touchUp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "touchUp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.touchUp = touchUp;
//TODO
function touchMove(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "touchMove",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.touchMove = touchMove;
//TODO
function performActions(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "performActions",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.performActions = performActions;
//TODO
function releaseActions(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "releaseActions",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.releaseActions = releaseActions;
//TODO
function touchLongClick(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "touchLongClick",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.touchLongClick = touchLongClick;
//TODO
function flick(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "flick",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.flick = flick;
//TODO
function getGeoLocation(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getGeoLocation",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getGeoLocation = getGeoLocation;
//TODO
function setGeoLocation(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setGeoLocation",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setGeoLocation = setGeoLocation;
//TODO
function getLog(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getLog",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getLog = getLog;
//TODO
function getLogTypes(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getLogTypes",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getLogTypes = getLogTypes;
//TODO
function getCurrentContext(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getCurrentContext",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getCurrentContext = getCurrentContext;
//TODO
function setContext(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setContext",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setContext = setContext;
//TODO
function getContexts(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getContexts",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getContexts = getContexts;
//TODO
function getPageIndex(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getPageIndex",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getPageIndex = getPageIndex;
//TODO
function getNetworkConnection(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getNetworkConnection",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getNetworkConnection = getNetworkConnection;
//TODO
function setNetworkConnection(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setNetworkConnection",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setNetworkConnection = setNetworkConnection;
//TODO
function performTouch(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "performTouch",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.performTouch = performTouch;
//TODO
function performMultiAction(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "performMultiAction",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.performMultiAction = performMultiAction;
//TODO
function receiveAsyncResponse(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "receiveAsyncResponse",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.receiveAsyncResponse = receiveAsyncResponse;
//TODO
function mobileShake(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "mobileShake",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.mobileShake = mobileShake;
//TODO
function getDeviceTime(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getDeviceTime",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getDeviceTime = getDeviceTime;
//TODO
function lock(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "lock",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.lock = lock;
//TODO
function unlock(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "unlock",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.unlock = unlock;
//TODO
function isLocked(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "isLocked",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.isLocked = isLocked;
//TODO
function startRecordingScreen(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "startRecordingScreen",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.startRecordingScreen = startRecordingScreen;
//TODO
function stopRecordingScreen(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "stopRecordingScreen",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.stopRecordingScreen = stopRecordingScreen;
//TODO
function getPerformanceDataTypes(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getPerformanceDataTypes",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getPerformanceDataTypes = getPerformanceDataTypes;
//TODO
function getPerformanceData(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getPerformanceData",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getPerformanceData = getPerformanceData;
//TODO
function pressKeyCode(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "pressKeyCode",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.pressKeyCode = pressKeyCode;
//TODO
function longPressKeyCode(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "longPressKeyCode",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.longPressKeyCode = longPressKeyCode;
//TODO
function fingerprint(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "fingerprint",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.fingerprint = fingerprint;
//TODO
function sendSMS(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "sendSMS",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.sendSMS = sendSMS;
//TODO
function gsmCall(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "gsmCall",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.gsmCall = gsmCall;
//TODO
function gsmSignal(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "gsmSignal",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.gsmSignal = gsmSignal;
//TODO
function gsmVoice(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "gsmVoice",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.gsmVoice = gsmVoice;
//TODO
function powerCapacity(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "powerCapacity",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.powerCapacity = powerCapacity;
//TODO
function powerAC(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "powerAC",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.powerAC = powerAC;
//TODO
function networkSpeed(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "networkSpeed",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.networkSpeed = networkSpeed;
//TODO
function keyevent(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "keyevent",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.keyevent = keyevent;
//TODO
function mobileRotation(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "mobileRotation",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.mobileRotation = mobileRotation;
//TODO
function getCurrentActivity(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getCurrentActivity",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getCurrentActivity = getCurrentActivity;
//TODO
function getCurrentPackage(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getCurrentPackage",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getCurrentPackage = getCurrentPackage;
//TODO
function installApp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "installApp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.installApp = installApp;
//TODO
function activateApp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "activateApp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.activateApp = activateApp;
//TODO
function removeApp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "removeApp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.removeApp = removeApp;
//TODO
function terminateApp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "terminateApp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.terminateApp = terminateApp;
//TODO
function isAppInstalled(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "isAppInstalled",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.isAppInstalled = isAppInstalled;
//TODO
function queryAppState(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "queryAppState",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.queryAppState = queryAppState;
//TODO
function hideKeyboard(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "hideKeyboard",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.hideKeyboard = hideKeyboard;
//TODO
function isKeyboardShown(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "isKeyboardShown",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.isKeyboardShown = isKeyboardShown;
//TODO
function pushFile(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "pushFile",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.pushFile = pushFile;
//TODO
function pullFile(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "pullFile",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.pullFile = pullFile;
//TODO
function pullFolder(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "pullFolder",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.pullFolder = pullFolder;
//TODO
function toggleFlightMode(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "toggleFlightMode",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.toggleFlightMode = toggleFlightMode;
//TODO
function toggleData(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "toggleData",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.toggleData = toggleData;
//TODO
function toggleWiFi(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "toggleWiFi",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.toggleWiFi = toggleWiFi;
//TODO
function toggleLocationServices(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "toggleLocationServices",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.toggleLocationServices = toggleLocationServices;
//TODO
function openNotifications(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "openNotifications",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.openNotifications = openNotifications;
//TODO
function startActivity(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "startActivity",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.startActivity = startActivity;
//TODO
function getSystemBars(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getSystemBars",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getSystemBars = getSystemBars;
//TODO
function getDisplayDensity(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getDisplayDensity",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getDisplayDensity = getDisplayDensity;
//TODO
function touchId(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "touchId",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.touchId = touchId;
//TODO
function toggleEnrollTouchId(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "toggleEnrollTouchId",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.toggleEnrollTouchId = toggleEnrollTouchId;
//TODO
function launchApp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "launchApp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.launchApp = launchApp;
//TODO
function closeApp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "closeApp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.closeApp = closeApp;
//TODO
function reset(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "reset",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.reset = reset;
//TODO
function background(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "background",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.background = background;
//TODO
function endCoverage(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "endCoverage",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.endCoverage = endCoverage;
//TODO
function getStrings(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getStrings",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getStrings = getStrings;
//TODO
function setValueImmediate(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setValueImmediate",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setValueImmediate = setValueImmediate;
//TODO
function replaceValue(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "replaceValue",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.replaceValue = replaceValue;
//TODO
function getSettings(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getSettings",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getSettings = getSettings;
//TODO
function updateSettings(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "updateSettings",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.updateSettings = updateSettings;
//TODO
function executeDriverScript(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "executeDriverScript",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.executeDriverScript = executeDriverScript;
//TODO
function getLogEvents(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getLogEvents",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getLogEvents = getLogEvents;
//TODO
function logCustomEvent(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "logCustomEvent",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.logCustomEvent = logCustomEvent;
//TODO
function getAlertText(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getAlertText",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getAlertText = getAlertText;
//TODO
function setAlertText(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setAlertText",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setAlertText = setAlertText;
//TODO
function postAcceptAlert(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "postAcceptAlert",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.postAcceptAlert = postAcceptAlert;
//TODO
function postDismissAlert(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "postDismissAlert",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.postDismissAlert = postDismissAlert;
//TODO
function getElementRect(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getElementRect",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getElementRect = getElementRect;
//TODO
function getElementScreenshot(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getElementScreenshot",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getElementScreenshot = getElementScreenshot;
//TODO
function getWindowRect(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getWindowRect",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getWindowRect = getWindowRect;
//TODO
function setWindowRect(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setWindowRect",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setWindowRect = setWindowRect;
//TODO
function minimizeWindow(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "minimizeWindow",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.minimizeWindow = minimizeWindow;
//TODO
function fullScreenWindow(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "fullScreenWindow",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.fullScreenWindow = fullScreenWindow;
//TODO
function getProperty(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getProperty",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getProperty = getProperty;
//TODO
function setClipboard(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setClipboard",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setClipboard = setClipboard;
//TODO
function getClipboard(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getClipboard",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getClipboard = getClipboard;
//TODO
function compareImages(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "compareImages",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.compareImages = compareImages;
//TODO
function executeCdp(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "executeCdp",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.executeCdp = executeCdp;
//TODO
function addVirtualAuthenticator(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "addVirtualAuthenticator",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.addVirtualAuthenticator = addVirtualAuthenticator;
//TODO
function removeVirtualAuthenticator(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "removeVirtualAuthenticator",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.removeVirtualAuthenticator = removeVirtualAuthenticator;
//TODO
function addAuthCredential(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "addAuthCredential",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.addAuthCredential = addAuthCredential;
//TODO
function getAuthCredential(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "getAuthCredential",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.getAuthCredential = getAuthCredential;
//TODO
function removeAllAuthCredentials(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "removeAllAuthCredentials",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.removeAllAuthCredentials = removeAllAuthCredentials;
//TODO
function removeAuthCredential(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "removeAuthCredential",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.removeAuthCredential = removeAuthCredential;
//TODO
function setUserAuthVerified(sessionInfo, driver, args, response) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            title: "setUserAuthVerified",
            title_info: null,
            response: null,
            params: null,
        };
    });
}
exports.setUserAuthVerified = setUserAuthVerified;
