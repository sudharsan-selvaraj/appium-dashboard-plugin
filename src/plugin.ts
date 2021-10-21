import BasePlugin from "@appium/base-plugin";
import { log } from "./logger";
import { SessionManager } from "./session-manager";
import { getSessionDetails } from "./utils";

const sessionMap: Map<string, SessionManager> = new Map();

class AppiumDashboardPlugin extends BasePlugin {
  constructor(pluginName: string) {
    super(pluginName);
  }

  async handle(next: () => Promise<any>, driver: any, commandName: string, ...args: any) {
    let appiumCommand = {
      driver,
      commandName,
      next,
      args,
    };

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
        let sessionInfo = getSessionDetails(response);
        let sessionManager = new SessionManager(sessionInfo);
        sessionMap.set(sessionInfo.session_id, new SessionManager(sessionInfo));
        await sessionManager.onCommandRecieved(appiumCommand);
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
