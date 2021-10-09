import { SessionInfo } from "./types/session-info";
import { AppiumCommand } from "./types/appium-command";

class SessionManager {
  constructor(private sessionInfo: SessionInfo) {}

  public async onCommandRecieved(command: AppiumCommand): Promise<any> {
    if (command.commandName == "createSession") {
    }
    return await command.next();
  }
}

export { SessionManager };
