import { Container } from "typedi";
import BasePlugin from "@appium/base-plugin";
import { CommandParser } from "./command-parser";
import { SessionManager } from "./session-manager";
import { getSessionDetails } from "./utils";
import { routeToCommand } from "./utils";
import { pluginLogger } from "./loggers/plugin-logger";
import { logger } from "./loggers/logger";
import { PluginCliArgs } from "./interfaces/PluginCliArgs";
import * as express from "express";

const sessionMap: Map<string, SessionManager> = new Map();
const IGNORED_COMMANDS = ["getScreenshot", "stopRecordingScreen", "startRecordingScreen"];
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
      args[2]["appium:clearDeviceLogsOnStart"] = true;
      args[2].firstMatch[0]["appium:clearDeviceLogsOnStart"] = true;
      var response = await next();
      if (response.error) {
        return response;
      } else {
        let sessionInfo = getSessionDetails(args, response);
        let sessionManager = new SessionManager(sessionInfo, new CommandParser(sessionInfo), response, this.cliArgs);
        sessionMap.set(sessionInfo.session_id, sessionManager);
        await sessionManager.onCommandRecieved(appiumCommand);
        logger.info(`New Session created with session id ${sessionInfo.session_id}`);
        return response;
      }
    }

    let sessionId = args[args.length - 1];
    if (sessionMap.has(sessionId)) {
      return await sessionMap.get(sessionId)?.onCommandRecieved(appiumCommand);
    } else {
      return await next();
    }
  }
}

export { AppiumDashboardPlugin };
