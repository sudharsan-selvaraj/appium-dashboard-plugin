import { SessionInfo } from "./types/session-info";
import { AppiumCommand } from "./types/appium-command";
import { startScreenRecording, stopScreenRecording } from "./utils";
import { log } from "./logger";
import * as fs from "fs";

class SessionManager {
  constructor(private sessionInfo: SessionInfo) {
    this.sessionInfo.is_completed = false;
  }

  public async onCommandRecieved(command: AppiumCommand): Promise<any> {
    log.info(`Recieved command ${command.commandName}`);

    if (command.commandName == "createSession") {
      return await this.startScreenRecording(command.driver);
    } else if (command.commandName == "deleteSession") {
      this.sessionInfo.is_completed = true;
      await this.saveScreenRecording(command.driver);
    }
    return await command.next();
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
