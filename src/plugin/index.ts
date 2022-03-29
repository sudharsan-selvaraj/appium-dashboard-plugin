import { Container } from "typedi";
import BasePlugin from "@appium/base-plugin";
import { CommandParser } from "./command-parser";
import { SessionManager } from "./session-manager";
import { getSessionDetails, routeToCommand } from "./utils/plugin-utils";
import { pluginLogger } from "../loggers/plugin-logger";
import { logger } from "../loggers/logger";
import { PluginCliArgs } from "../interfaces/PluginCliArgs";
import * as express from "express";
import { registerDebugMiddlware } from "./debugger";
import _ from "lodash";
import getPort from "get-port";

const sessionMap: Map<string, SessionManager> = new Map();
const IGNORED_COMMANDS = ["getScreenshot", "stopRecordingScreen", "startRecordingScreen"];
const CUSTOM_CAPABILITIES = ["newCommandTimeout", "dashboard:project", "dashboard:build", "dashboard:name"];

class AppiumDashboardPlugin extends BasePlugin {
  constructor(pluginName: string) {
    super(pluginName);
  }

  static get argsConstraints() {
    return {
      sessionTimeout: {
        isNumber: true,
      },
    };
  }

  public static async updateServer(expressApp: express.Application) {
    registerDebugMiddlware(expressApp);
    expressApp.use("/dashboard", Container.get("expressRouter") as any);
    pluginLogger.info("Dashboard plugin is enabled and will be served at http://localhost:4723/dashboard");
    pluginLogger.info(
      "If the appium server is started with different port other than 4723, then use the correct port number to access the device farm dashboard"
    );
    logger.info("Dashboard plugin enabled..");
  }

  async handle(next: () => Promise<any>, driver: any, commandName: string, ...args: any) {
    let appiumCommand = {
      driver,
      commandName,
      next,
      args,
    };

    let originalCommandName: string = commandName == "proxyReqRes" ? routeToCommand(args).commandName : commandName;

    if (IGNORED_COMMANDS.indexOf(originalCommandName) >= 0) {
      logger.info(`Skipped parsing command for ${originalCommandName}`);
      return await next();
    }

    if (commandName == "createSession") {
      /**
       * Append additional log capabilities to payload
       */
      let rawCapabilities = Object.assign({}, args[2].firstMatch[0], args[2].alwaysMatch);
      await this.constructDesiredCapabilities(args);
      var response = await next();
      if (response.error) {
        return response;
      } else {
        let sessionInfo = getSessionDetails(rawCapabilities, response);
        let sessionManager = new SessionManager({
          sessionInfo,
          commandParser: new CommandParser(sessionInfo),
          sessionResponse: response,
          cliArgs: this.cliArgs,
          adb: Container.get("adb"),
        });
        sessionMap.set(sessionInfo.session_id, sessionManager);
        await sessionManager.onCommandRecieved(appiumCommand);
        logger.info(`New Session created with session id ${sessionInfo.session_id}`);
        return response;
      }
    }

    let sessionId = args[args.length - 1];
    if (sessionMap.has(sessionId)) {
      return await this.getSessionManager(sessionId)?.onCommandRecieved(appiumCommand);
    } else {
      return await next();
    }
  }

  private getSessionManager(sessionId: string) {
    return sessionMap.get(sessionId);
  }

  private async constructDesiredCapabilities(args: any) {
    let rawCapabilities = Object.assign({}, args[2].firstMatch[0], args[2].alwaysMatch);
    CUSTOM_CAPABILITIES.forEach((capability) => {
      delete rawCapabilities[capability];
    });

    let newCapabilities: Record<string, any> = {
      "appium:clearDeviceLogsOnStart": true,
      "appium:nativeWebScreenshot": true, //to make screenshot endpoint work in android webview tests,
    };

    if (rawCapabilities?.["platformName"].toLowerCase() == "android" && !rawCapabilities?.["appium:mjpegServerPort"]) {
      newCapabilities["appium:mjpegServerPort"] = await getPort();
    }

    Object.keys(newCapabilities).forEach((k) => {
      args[2][k] = newCapabilities[k];
      args[2].firstMatch[0][k] = newCapabilities[k];
    });
  }
}

export { AppiumDashboardPlugin };
