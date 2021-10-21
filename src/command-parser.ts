import { SessionInfo } from "./types/session-info";

export class CommandParser {
  constructor(private sessionInfo: SessionInfo) {}

  private isProxyRequest(args: any[]) {
    return !!args[0].route;
  }

  //TODO
  public async getStatus(driver: any, args: any[], response: any) {
    return {
      title: "getStatus",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //COMPLETED
  public async createSession(driver: any, args: any[], response: any) {
    return {
      title: "CREATED NEW SESSION",
      title_info: response.session_id,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getSessions(driver: any, args: any[], response: any) {
    return {
      title: "getSessions",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getSession(driver: any, args: any[], response: any) {
    return {
      title: "getSession",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //COMPLETED
  public async deleteSession(driver: any, args: any[], response: any) {
    return {
      title: "CLIENT DELETED THE SESSION",
      title_info: args[0],
      response: null,
      params: null,
    };
  }

  //TODO
  public async getTimeouts(driver: any, args: any[], response: any) {
    return {
      title: "getTimeouts",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async timeouts(driver: any, args: any[], response: any) {
    return {
      title: "timeouts",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async asyncScriptTimeout(driver: any, args: any[], response: any) {
    return {
      title: "asyncScriptTimeout",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async implicitWait(driver: any, args: any[], response: any) {
    return {
      title: "implicitWait",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getWindowHandle(driver: any, args: any[], response: any) {
    return {
      title: "getWindowHandle",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getWindowHandles(driver: any, args: any[], response: any) {
    return {
      title: "getWindowHandles",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getUrl(driver: any, args: any[], response: any) {
    return {
      title: "getUrl",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setUrl(driver: any, args: any[], response: any) {
    return {
      title: "setUrl",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async forward(driver: any, args: any[], response: any) {
    return {
      title: "forward",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async back(driver: any, args: any[], response: any) {
    return {
      title: "back",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async refresh(driver: any, args: any[], response: any) {
    return {
      title: "refresh",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async execute(driver: any, args: any[], response: any) {
    return {
      title: "execute",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async executeAsync(driver: any, args: any[], response: any) {
    return {
      title: "executeAsync",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getScreenshot(driver: any, args: any[], response: any) {
    return {
      title: "getScreenshot",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async availableIMEEngines(driver: any, args: any[], response: any) {
    return {
      title: "availableIMEEngines",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getActiveIMEEngine(driver: any, args: any[], response: any) {
    return {
      title: "getActiveIMEEngine",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async isIMEActivated(driver: any, args: any[], response: any) {
    return {
      title: "isIMEActivated",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async deactivateIMEEngine(driver: any, args: any[], response: any) {
    return {
      title: "deactivateIMEEngine",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async activateIMEEngine(driver: any, args: any[], response: any) {
    return {
      title: "activateIMEEngine",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setFrame(driver: any, args: any[], response: any) {
    return {
      title: "setFrame",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setWindow(driver: any, args: any[], response: any) {
    return {
      title: "setWindow",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async closeWindow(driver: any, args: any[], response: any) {
    return {
      title: "closeWindow",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getWindowSize(driver: any, args: any[], response: any) {
    return {
      title: "getWindowSize",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async maximizeWindow(driver: any, args: any[], response: any) {
    return {
      title: "maximizeWindow",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getCookies(driver: any, args: any[], response: any) {
    return {
      title: "getCookies",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setCookie(driver: any, args: any[], response: any) {
    return {
      title: "setCookie",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async deleteCookies(driver: any, args: any[], response: any) {
    return {
      title: "deleteCookies",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getCookie(driver: any, args: any[], response: any) {
    return {
      title: "getCookie",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async deleteCookie(driver: any, args: any[], response: any) {
    return {
      title: "deleteCookie",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getPageSource(driver: any, args: any[], response: any) {
    return {
      title: "getPageSource",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async title(driver: any, args: any[], response: any) {
    return {
      title: "title",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async findElement(driver: any, args: any[], response: any) {
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
  }

  //TODO
  public async findElements(driver: any, args: any[], response: any) {
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
  }

  //TODO
  public async active(driver: any, args: any[], response: any) {
    return {
      title: "active",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async findElementFromElement(driver: any, args: any[], response: any) {
    return {
      title: "findElementFromElement",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async findElementsFromElement(driver: any, args: any[], response: any) {
    return {
      title: "findElementsFromElement",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async click(driver: any, args: any[], response: any) {
    return {
      title: "click",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async submit(driver: any, args: any[], response: any) {
    return {
      title: "submit",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getText(driver: any, args: any[], response: any) {
    return {
      title: "getText",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setValue(driver: any, args: any[], response: any) {
    return {
      title: "setValue",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async keys(driver: any, args: any[], response: any) {
    return {
      title: "keys",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getName(driver: any, args: any[], response: any) {
    return {
      title: "getName",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async clear(driver: any, args: any[], response: any) {
    return {
      title: "clear",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async elementSelected(driver: any, args: any[], response: any) {
    return {
      title: "elementSelected",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async elementEnabled(driver: any, args: any[], response: any) {
    return {
      title: "elementEnabled",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getAttribute(driver: any, args: any[], response: any) {
    return {
      title: "getAttribute",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async equalsElement(driver: any, args: any[], response: any) {
    return {
      title: "equalsElement",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async elementDisplayed(driver: any, args: any[], response: any) {
    return {
      title: "elementDisplayed",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getLocation(driver: any, args: any[], response: any) {
    return {
      title: "getLocation",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getLocationInView(driver: any, args: any[], response: any) {
    return {
      title: "getLocationInView",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getSize(driver: any, args: any[], response: any) {
    return {
      title: "getSize",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getCssProperty(driver: any, args: any[], response: any) {
    return {
      title: "getCssProperty",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getOrientation(driver: any, args: any[], response: any) {
    return {
      title: "getOrientation",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setOrientation(driver: any, args: any[], response: any) {
    return {
      title: "setOrientation",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getRotation(driver: any, args: any[], response: any) {
    return {
      title: "getRotation",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setRotation(driver: any, args: any[], response: any) {
    return {
      title: "setRotation",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async moveTo(driver: any, args: any[], response: any) {
    return {
      title: "moveTo",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async clickCurrent(driver: any, args: any[], response: any) {
    return {
      title: "clickCurrent",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async buttonDown(driver: any, args: any[], response: any) {
    return {
      title: "buttonDown",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async buttonUp(driver: any, args: any[], response: any) {
    return {
      title: "buttonUp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async doubleClick(driver: any, args: any[], response: any) {
    return {
      title: "doubleClick",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async touchDown(driver: any, args: any[], response: any) {
    return {
      title: "touchDown",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async touchUp(driver: any, args: any[], response: any) {
    return {
      title: "touchUp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async touchMove(driver: any, args: any[], response: any) {
    return {
      title: "touchMove",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async performActions(driver: any, args: any[], response: any) {
    return {
      title: "performActions",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async releaseActions(driver: any, args: any[], response: any) {
    return {
      title: "releaseActions",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async touchLongClick(driver: any, args: any[], response: any) {
    return {
      title: "touchLongClick",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async flick(driver: any, args: any[], response: any) {
    return {
      title: "flick",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getGeoLocation(driver: any, args: any[], response: any) {
    return {
      title: "getGeoLocation",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setGeoLocation(driver: any, args: any[], response: any) {
    return {
      title: "setGeoLocation",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getLog(driver: any, args: any[], response: any) {
    return {
      title: "getLog",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getLogTypes(driver: any, args: any[], response: any) {
    return {
      title: "getLogTypes",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getCurrentContext(driver: any, args: any[], response: any) {
    return {
      title: "getCurrentContext",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setContext(driver: any, args: any[], response: any) {
    return {
      title: "setContext",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getContexts(driver: any, args: any[], response: any) {
    return {
      title: "getContexts",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getPageIndex(driver: any, args: any[], response: any) {
    return {
      title: "getPageIndex",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getNetworkConnection(driver: any, args: any[], response: any) {
    return {
      title: "getNetworkConnection",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setNetworkConnection(driver: any, args: any[], response: any) {
    return {
      title: "setNetworkConnection",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async performTouch(driver: any, args: any[], response: any) {
    return {
      title: "performTouch",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async performMultiAction(driver: any, args: any[], response: any) {
    return {
      title: "performMultiAction",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async receiveAsyncResponse(driver: any, args: any[], response: any) {
    return {
      title: "receiveAsyncResponse",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async mobileShake(driver: any, args: any[], response: any) {
    return {
      title: "mobileShake",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getDeviceTime(driver: any, args: any[], response: any) {
    return {
      title: "getDeviceTime",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async lock(driver: any, args: any[], response: any) {
    return {
      title: "lock",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async unlock(driver: any, args: any[], response: any) {
    return {
      title: "unlock",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async isLocked(driver: any, args: any[], response: any) {
    return {
      title: "isLocked",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async startRecordingScreen(driver: any, args: any[], response: any) {
    return {
      title: "startRecordingScreen",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async stopRecordingScreen(driver: any, args: any[], response: any) {
    return {
      title: "stopRecordingScreen",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getPerformanceDataTypes(driver: any, args: any[], response: any) {
    return {
      title: "getPerformanceDataTypes",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getPerformanceData(driver: any, args: any[], response: any) {
    return {
      title: "getPerformanceData",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async pressKeyCode(driver: any, args: any[], response: any) {
    return {
      title: "pressKeyCode",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async longPressKeyCode(driver: any, args: any[], response: any) {
    return {
      title: "longPressKeyCode",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async fingerprint(driver: any, args: any[], response: any) {
    return {
      title: "fingerprint",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async sendSMS(driver: any, args: any[], response: any) {
    return {
      title: "sendSMS",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async gsmCall(driver: any, args: any[], response: any) {
    return {
      title: "gsmCall",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async gsmSignal(driver: any, args: any[], response: any) {
    return {
      title: "gsmSignal",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async gsmVoice(driver: any, args: any[], response: any) {
    return {
      title: "gsmVoice",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async powerCapacity(driver: any, args: any[], response: any) {
    return {
      title: "powerCapacity",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async powerAC(driver: any, args: any[], response: any) {
    return {
      title: "powerAC",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async networkSpeed(driver: any, args: any[], response: any) {
    return {
      title: "networkSpeed",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async keyevent(driver: any, args: any[], response: any) {
    return {
      title: "keyevent",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async mobileRotation(driver: any, args: any[], response: any) {
    return {
      title: "mobileRotation",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getCurrentActivity(driver: any, args: any[], response: any) {
    return {
      title: "getCurrentActivity",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getCurrentPackage(driver: any, args: any[], response: any) {
    return {
      title: "getCurrentPackage",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async installApp(driver: any, args: any[], response: any) {
    return {
      title: "installApp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async activateApp(driver: any, args: any[], response: any) {
    return {
      title: "activateApp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async removeApp(driver: any, args: any[], response: any) {
    return {
      title: "removeApp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async terminateApp(driver: any, args: any[], response: any) {
    return {
      title: "terminateApp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async isAppInstalled(driver: any, args: any[], response: any) {
    return {
      title: "isAppInstalled",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async queryAppState(driver: any, args: any[], response: any) {
    return {
      title: "queryAppState",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async hideKeyboard(driver: any, args: any[], response: any) {
    return {
      title: "hideKeyboard",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async isKeyboardShown(driver: any, args: any[], response: any) {
    return {
      title: "isKeyboardShown",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async pushFile(driver: any, args: any[], response: any) {
    return {
      title: "pushFile",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async pullFile(driver: any, args: any[], response: any) {
    return {
      title: "pullFile",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async pullFolder(driver: any, args: any[], response: any) {
    return {
      title: "pullFolder",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async toggleFlightMode(driver: any, args: any[], response: any) {
    return {
      title: "toggleFlightMode",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async toggleData(driver: any, args: any[], response: any) {
    return {
      title: "toggleData",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async toggleWiFi(driver: any, args: any[], response: any) {
    return {
      title: "toggleWiFi",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async toggleLocationServices(driver: any, args: any[], response: any) {
    return {
      title: "toggleLocationServices",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async openNotifications(driver: any, args: any[], response: any) {
    return {
      title: "openNotifications",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async startActivity(driver: any, args: any[], response: any) {
    return {
      title: "startActivity",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getSystemBars(driver: any, args: any[], response: any) {
    return {
      title: "getSystemBars",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getDisplayDensity(driver: any, args: any[], response: any) {
    return {
      title: "getDisplayDensity",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async touchId(driver: any, args: any[], response: any) {
    return {
      title: "touchId",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async toggleEnrollTouchId(driver: any, args: any[], response: any) {
    return {
      title: "toggleEnrollTouchId",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async launchApp(driver: any, args: any[], response: any) {
    return {
      title: "launchApp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async closeApp(driver: any, args: any[], response: any) {
    return {
      title: "closeApp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async reset(driver: any, args: any[], response: any) {
    return {
      title: "reset",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async background(driver: any, args: any[], response: any) {
    return {
      title: "background",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async endCoverage(driver: any, args: any[], response: any) {
    return {
      title: "endCoverage",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getStrings(driver: any, args: any[], response: any) {
    return {
      title: "getStrings",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setValueImmediate(driver: any, args: any[], response: any) {
    return {
      title: "setValueImmediate",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async replaceValue(driver: any, args: any[], response: any) {
    return {
      title: "replaceValue",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getSettings(driver: any, args: any[], response: any) {
    return {
      title: "getSettings",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async updateSettings(driver: any, args: any[], response: any) {
    return {
      title: "updateSettings",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async executeDriverScript(driver: any, args: any[], response: any) {
    return {
      title: "executeDriverScript",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getLogEvents(driver: any, args: any[], response: any) {
    return {
      title: "getLogEvents",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async logCustomEvent(driver: any, args: any[], response: any) {
    return {
      title: "logCustomEvent",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getAlertText(driver: any, args: any[], response: any) {
    return {
      title: "getAlertText",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setAlertText(driver: any, args: any[], response: any) {
    return {
      title: "setAlertText",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async postAcceptAlert(driver: any, args: any[], response: any) {
    return {
      title: "postAcceptAlert",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async postDismissAlert(driver: any, args: any[], response: any) {
    return {
      title: "postDismissAlert",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getElementRect(driver: any, args: any[], response: any) {
    return {
      title: "getElementRect",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getElementScreenshot(driver: any, args: any[], response: any) {
    return {
      title: "getElementScreenshot",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getWindowRect(driver: any, args: any[], response: any) {
    return {
      title: "getWindowRect",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setWindowRect(driver: any, args: any[], response: any) {
    return {
      title: "setWindowRect",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async minimizeWindow(driver: any, args: any[], response: any) {
    return {
      title: "minimizeWindow",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async fullScreenWindow(driver: any, args: any[], response: any) {
    return {
      title: "fullScreenWindow",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getProperty(driver: any, args: any[], response: any) {
    return {
      title: "getProperty",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setClipboard(driver: any, args: any[], response: any) {
    return {
      title: "setClipboard",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getClipboard(driver: any, args: any[], response: any) {
    return {
      title: "getClipboard",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async compareImages(driver: any, args: any[], response: any) {
    return {
      title: "compareImages",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async executeCdp(driver: any, args: any[], response: any) {
    return {
      title: "executeCdp",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async addVirtualAuthenticator(driver: any, args: any[], response: any) {
    return {
      title: "addVirtualAuthenticator",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async removeVirtualAuthenticator(driver: any, args: any[], response: any) {
    return {
      title: "removeVirtualAuthenticator",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async addAuthCredential(driver: any, args: any[], response: any) {
    return {
      title: "addAuthCredential",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async getAuthCredential(driver: any, args: any[], response: any) {
    return {
      title: "getAuthCredential",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async removeAllAuthCredentials(driver: any, args: any[], response: any) {
    return {
      title: "removeAllAuthCredentials",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async removeAuthCredential(driver: any, args: any[], response: any) {
    return {
      title: "removeAuthCredential",
      title_info: null,
      response: null,
      params: null,
    };
  }

  //TODO
  public async setUserAuthVerified(driver: any, args: any[], response: any) {
    return {
      title: "setUserAuthVerified",
      title_info: null,
      response: null,
      params: null,
    };
  }
}
