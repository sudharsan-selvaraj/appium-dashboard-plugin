import BasePlugin from "@appium/base-plugin";
import { SessionManager } from "./session-manager";
import { getSessionDetails } from "./utils";

class AppiumDashboardPlugin extends BasePlugin {
  private sessionMap: Map<string, SessionManager> = new Map();

  constructor(pluginName: string) {
    super(pluginName);
  }

  async handle(
    next: () => Promise<any>,
    driver: any,
    commandName: string,
    ...args: any
  ) {
    let appiumCommand = {
      driver,
      commandName,
      next,
      args,
    };

    if (commandName == "createSession") {
      var response = await next();
      if (response.error) {
        return response;
      } else {
        let sessionInfo = getSessionDetails(response);
        let sessionManager = new SessionManager(sessionInfo);
        this.sessionMap.set(
          sessionInfo.session_id,
          new SessionManager(sessionInfo)
        );
        return await sessionManager.onCommandRecieved(appiumCommand);
      }
    }

    if (this.sessionMap.get(args[0])) {
      return await this.sessionMap
        .get(args[0])
        ?.onCommandRecieved(appiumCommand);
    } else {
      return await next();
    }
  }
}
