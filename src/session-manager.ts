import { SessionInfo } from "./types/session-info";
import { AppiumCommand } from "./types/appium-command";
import { startScreenRecording, stopScreenRecording, interceptProxyResponse, routeToCommand } from "./utils";
import { log } from "./logger";
import * as fs from "fs";
const circularjson = require("circular-json");

class SessionManager {
  constructor(private sessionInfo: SessionInfo) {
    this.sessionInfo.is_completed = false;
  }

  public async onCommandRecieved(command: AppiumCommand): Promise<any> {
    if (command.commandName == "createSession") {
      return await this.startScreenRecording(command.driver);
    } else if (command.commandName == "deleteSession") {
      this.sessionInfo.is_completed = true;
      await this.saveScreenRecording(command.driver);
    } else if (command.commandName == "proxyReqRes") {
      let promise = interceptProxyResponse(command.args[1]);
      let originalNext = command.next;
      command.next = async () => (await Promise.all([originalNext(), promise]))[1];
      Object.assign(command, {
        ...routeToCommand(command.args),
      });
      this.appendLogs("Inside Proxy Req");
    }

    this.appendLogs(`Recieved command ${command.commandName}`);
    let res = await command.next();
    this.appendLogs(command.commandName);
    this.appendLogs(!res ? "null" : JSON.stringify(res));
    this.appendLogs("------------------------------------------------------------------------------------------");
    return res;
  }

  private appendLogs(log: string) {
    fs.appendFileSync("/Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/log.txt", `${log}\n`);
  }

  private async startScreenRecording(driver: any) {
    await startScreenRecording(driver, this.sessionInfo.session_id);
  }

  private async saveScreenRecording(driver: any) {
    let videoBase64String = await stopScreenRecording(driver, this.sessionInfo.session_id);
    if (videoBase64String.value != "") {
      fs.writeFileSync(
        `/Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/videos/${this.sessionInfo.session_id}.mp4`,
        videoBase64String.value,
        "base64"
      );

      log.info(
        `Saving screenrecording.. /Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/videos/${this.sessionInfo.session_id}.mp4`
      );
    }
  }
}

export { SessionManager };
