import { SessionInfo } from "./types/session-info";
import { saveLocator, getLocatorStrategy } from "./locator-factory";
import { millisToMinutesAndSeconds } from "./utils";

export class CommandParser {
  constructor(private sessionInfo: SessionInfo) {}

  private isProxyRequest(args: any[]) {
    return args && args[0] && !!args[0].route;
  }

  /* Private methods  */
  private async getLocatorTitleInfo(elementId: string) {
    let strategy = await getLocatorStrategy(elementId);
    if (!strategy) {
      return "";
    } else if (strategy.index == null) {
      return `[${strategy.using}=${strategy.value}]`;
    } else {
      return `[${strategy.using}=${strategy.value}][${strategy.index}]`;
    }
  }

  private getElementCommandArgs(args: any) {
    if (this.isProxyRequest(args)) {
      return Object.values(args[0].params).reverse();
    } else {
      return args;
    }
  }

  private isError(response: any) {
    return response && !!response.error;
  }

  private getResponseObj(response: any) {
    let responseType = this.getResponseType(response);
    if (!responseType) {
      return null;
    } else {
      return {
        type: responseType,
        value: response,
      };
    }
  }

  private getResponseType(response: any) {
    if (response == null) {
      return null;
    } else if (this.isError(response)) {
      return "error";
    } else if (Array.isArray(response) || typeof response === "object") {
      return "object";
    } else {
      return "string";
    }
  }

  private getArgsBodyValue(args: any, key: string, index: number) {
    if (this.isProxyRequest(args)) {
      return args[0].body[key];
    } else {
      return args[index];
    }
  }

  private getArgsParamsValue(args: any, key: string, index: number) {
    if (this.isProxyRequest(args)) {
      return args[0].params[key];
    } else {
      return args[index];
    }
  }

  private async constructCommandResponse(config: {
    driver: any;
    args: any[];
    response: any;
    title: any;
    titleInfoFormat?: (parsedArgs: any) => Promise<any>;
    paramsFormat?: (parsedArgs: any) => Promise<any>;
    responseFormat?: (response: any) => Promise<any>;
  }) {
    let newArgs = [...config.args];
    if (this.isProxyRequest(config.args)) {
      newArgs = [...Object.values(config.args[0].body), config.args.pop()];
    }

    let title = null;
    if (config.titleInfoFormat) {
      title = await config.titleInfoFormat(newArgs);
    }

    return {
      title: config.title,
      title_info: config.titleInfoFormat ? await config.titleInfoFormat(newArgs) : null,
      response: config.responseFormat
        ? this.getResponseObj(await config.responseFormat(config.response))
        : this.getResponseObj(config.response),
      params: config.paramsFormat ? this.getResponseObj(await config.paramsFormat(newArgs)) : null,
    };
  }

  /**
   * Command parser methods
   */
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

  //COMPLETED
  public async getTimeouts(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Timeouts",
    });
  }

  //COMPLETED
  public async timeouts(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Timeouts",
      titleInfoFormat: async (newArgs: any) => {
        return `[${newArgs[0]}=${millisToMinutesAndSeconds(newArgs[1] || 0)}]`;
      },
    });
  }

  //COMPLETED
  public async asyncScriptTimeout(driver: any, args: any[], response: any) {
    let res = await this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Async script timeout",
      titleInfoFormat: async (newArgs: any) => {
        return millisToMinutesAndSeconds(newArgs[0] || 0);
      },
    });

    if (res.response?.type != "error") {
      res.response = null;
    }
    return res;
  }

  //COMPLETED
  public async implicitWait(driver: any, args: any[], response: any) {
    let res = await this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Implicit wait",
      titleInfoFormat: async (newArgs: any) => {
        return millisToMinutesAndSeconds(newArgs[0] || 0);
      },
    });
    if (res.response?.type != "error") {
      res.response = null;
    }
    return res;
  }

  //COMPLETED
  public async getWindowHandle(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Window Handle",
    });
  }

  //COMPLETED
  public async getWindowHandles(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Window Handles",
    });
  }

  //COMPLETED
  public async getUrl(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get URL",
      titleInfoFormat: async (newArgs: any) => {
        return newArgs[0];
      },
      responseFormat: async (response: any) => {
        return null;
      },
    });
  }

  //COMPLETED
  public async setUrl(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Navigate to url",
      titleInfoFormat: async (newArgs) => newArgs[0],
    });
  }

  //COMPLETED
  public async forward(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Navigate forward",
    });
  }

  //COMPLETED
  public async back(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Navigate Back",
    });
  }

  //COMPLETED
  public async refresh(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Refresh page",
    });
  }

  //COMPLETED
  public async execute(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Execute script",
      titleInfoFormat: async (args) => args[0],
      paramsFormat: async (args: any) => {
        return {
          script: args[0],
          args: args[1],
        };
      },
    });
  }

  //COMPLETED
  public async executeAsync(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Execute asyncrounous script",
      titleInfoFormat: async (args) => args[0],
      paramsFormat: async (args: any) => {
        return {
          script: args[0],
          args: args[1],
        };
      },
    });
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

  //COMPLETED
  public async setFrame(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Frame",
      titleInfoFormat: (args) => args[0],
    });
  }

  //COMPLETED
  public async setWindow(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Window",
      titleInfoFormat: async (args) => args[0],
    });
  }

  //COMPLETED
  public async closeWindow(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Close Window",
      titleInfoFormat: (args) => args[0],
    });
  }

  //COMPLETED
  public async getWindowSize(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Window Size",
      titleInfoFormat: async (args) => args[0],
    });
  }

  //COMPLETED
  public async maximizeWindow(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Maximize Window",
    });
  }

  //COMPLETED
  public async getCookies(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Cookies",
    });
  }

  //COMPLETED
  public async setCookie(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Cookies",
    });
  }

  //COMPLETED
  public async deleteCookies(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Delete Cookies",
    });
  }

  //COMPLETED
  public async getCookie(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Cookies",
      titleInfoFormat: async (newArgs) => this.getArgsParamsValue(args, "name", 0),
    });
  }

  //COMPLETED
  public async deleteCookie(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Delete Cookie",
      titleInfoFormat: async (newArgs) => this.getArgsParamsValue(args, "name", 0),
    });
  }

  //COMPLETED
  public async getPageSource(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Page Source",
    });
  }

  //COMPLETED
  public async title(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Title",
      titleInfoFormat: async (newArgs) => newArgs[0],
    });
  }

  //COMPLETED
  public async findElement(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Find Element",
      titleInfoFormat: async (newArgs) => {
        if (!this.isError(response)) {
          await saveLocator(
            {
              using: newArgs[0],
              value: newArgs[1],
            },
            [response]
          );
        }
        return `[${newArgs[0]}=${newArgs[1]}]`;
      },
      paramsFormat: async (newArgs) => {
        return {
          using: newArgs[0],
          value: newArgs[1],
        };
      },
    });
  }

  //COMPLETED
  public async findElements(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Find Multiple Elements",
      titleInfoFormat: async (newArgs) => {
        if (!this.isError(response)) {
          await saveLocator(
            {
              using: newArgs[0],
              value: newArgs[1],
            },
            response
          );
        }
        return `[${newArgs[0]}=${newArgs[1]}]`;
      },
      paramsFormat: async (newArgs) => {
        return {
          using: newArgs[0],
          value: newArgs[1],
        };
      },
    });
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

  //COMPLETED
  public async findElementFromElement(driver: any, args: any[], response: any) {
    let parsedValue = await this.findElement(driver, args, response);
    parsedValue.title = "Find element from element";
    return parsedValue;
  }

  //COMPLETED
  public async findElementsFromElement(driver: any, args: any[], response: any) {
    let parsedValue = await this.findElements(driver, args, response);
    parsedValue.title = "Find multiple elements from element";
    return parsedValue;
  }

  //COMPLETED
  public async click(driver: any, args: any[], response: any) {
    let newArgs = this.getElementCommandArgs(args);
    return {
      title: "Click",
      title_info: await this.getLocatorTitleInfo(newArgs[0]),
      response: this.getResponseObj(response),
      params: null,
    };
  }

  //COMPLETED
  public async submit(driver: any, args: any[], response: any) {
    let newArgs = this.getElementCommandArgs(args);
    return {
      title: "Submit",
      title_info: await this.getLocatorTitleInfo(newArgs[0]),
      response: this.getResponseObj(response),
      params: null,
    };
  }

  //COMPLETED
  public async getText(driver: any, args: any[], response: any) {
    let newArgs = this.getElementCommandArgs(args);
    return {
      title: "Get text",
      title_info: await this.getLocatorTitleInfo(newArgs[0]),
      response: this.getResponseObj(response),
      params: null,
    };
  }

  //COMPLETED
  public async setValue(driver: any, args: any[], response: any) {
    let elementId = this.getArgsParamsValue(args, "elementId", 1);
    let text = this.getArgsBodyValue(args, "text", 0);
    return {
      title: "Send Keys",
      title_info: `${await this.getLocatorTitleInfo(elementId)} [value=${text}]`,
      response: this.getResponseObj(response),
      params: this.getResponseObj({
        text,
      }),
    };
  }

  //COMPLETED
  public async keys(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Type Keys to active element",
      paramsFormat: async (newArgs) => {
        return { text: newArgs[0] };
      },
    });
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

  //COMPLETED
  public async clear(driver: any, args: any[], response: any) {
    let newArgs = this.getElementCommandArgs(args);
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Clear",
      titleInfoFormat: async () => this.getLocatorTitleInfo(newArgs[0]),
    });
  }

  //COMPLETED
  public async elementSelected(driver: any, args: any[], response: any) {
    let elementId = this.getArgsParamsValue(args, "elementId", 0);
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Is Element Selected",
      titleInfoFormat: async (newArgs) => this.getLocatorTitleInfo(elementId),
    });
  }

  //COMPLETED
  public async elementEnabled(driver: any, args: any[], response: any) {
    let elementId = this.getArgsParamsValue(args, "elementId", 0);
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Is Element Enabled",
      titleInfoFormat: async (newArgs) => this.getLocatorTitleInfo(elementId),
    });
  }

  //COMPETED
  public async getAttribute(driver: any, args: any[], response: any) {
    let elementId = this.getArgsParamsValue(args, "elementId", 0);
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get attribute",
      titleInfoFormat: async (newArgs) => this.getLocatorTitleInfo(elementId),
    });
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

  //COMPLETED
  public async elementDisplayed(driver: any, args: any[], response: any) {
    let elementId = this.getArgsParamsValue(args, "elementId", 0);
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Is Element Displayed",
      titleInfoFormat: async (newArgs) => this.getLocatorTitleInfo(elementId),
    });
  }

  //COMPLETED
  public async getLocation(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Element Location",
      titleInfoFormat: async (newArgs) => {
        return await this.getLocatorTitleInfo(this.getArgsParamsValue(args, "elementId", 0));
      },
    });
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

  //COMPLETED
  public async getSize(driver: any, args: any[], response: any) {
    let elementId = this.getArgsParamsValue(args, "elementId", 0);
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Element Size",
      titleInfoFormat: async (newArgs) => this.getLocatorTitleInfo(elementId),
    });
  }

  //COMPLETED
  public async getCssProperty(driver: any, args: any[], response: any) {
    let elementId = this.getArgsParamsValue(args, "elementId", 1);
    let propertyName = this.getArgsParamsValue(args, "propertyName", 0);
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get CSS property",
      titleInfoFormat: async (newArgs) => `[${this.getLocatorTitleInfo(elementId)}][property=${propertyName}]`,
    });
  }

  //COMPLETED
  public async getOrientation(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Orientation",
    });
  }

  //COMPLETED
  public async setOrientation(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Orientation",
      titleInfoFormat: async (newArgs) => newArgs[0],
    });
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
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Move To Element",
      titleInfoFormat: async (newArgs) => this.getLocatorTitleInfo(newArgs[0]),
    });
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

  //COMPLETED
  public async performActions(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Perform actions",
      paramsFormat: async (newArgs) => {
        return newArgs[0];
      },
    });
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

  //COMPLETED
  public async getCurrentContext(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Current Context",
    });
  }

  //COMPLETED
  public async setContext(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Context",
      titleInfoFormat: async (args: any) => {
        return args[0];
      },
    });
  }

  //COMPLETED
  public async getContexts(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Available Contexts",
    });
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

  //COMPLETED
  public async fingerprint(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Use fingerprint",
      titleInfoFormat: async (args: any) => {
        return args[0];
      },
    });
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

  //COMPLETED
  public async hideKeyboard(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Hide Keyboard",
    });
  }

  //COMPLETED
  public async isKeyboardShown(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Is Keyboard displayed",
    });
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

  //COMPLETED
  public async reset(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Resetthe application state",
    });
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

  //COMPLETED
  public async getAlertText(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Alert Text",
    });
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

  //COMPLETED
  public async getElementRect(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Element Rect",
      titleInfoFormat: async (newArgs: any[]) => {
        return await this.getLocatorTitleInfo(this.getArgsParamsValue(args, "elementId", 0));
      },
    });
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

  //COMPLETED
  public async getWindowRect(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Get Window Rect",
    });
  }

  //COMPLETED
  public async setWindowRect(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Set Window Rect",
      titleInfoFormat: async (newArgs: any[]) => {
        return `[x=${newArgs[0]},y=${newArgs[1]},width=${newArgs[2]},height=${newArgs[3]}]`;
      },
    });
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

  //COMPLETED
  public async executeCdp(driver: any, args: any[], response: any) {
    return this.constructCommandResponse({
      driver,
      args,
      response,
      title: "Execute CDP",
      paramsFormat: async (newArgs) => {
        return {
          command: newArgs[0],
          params: newArgs[1],
        };
      },
    });
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
