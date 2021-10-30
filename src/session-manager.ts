import { SessionInfo } from "./types/session-info";
import { AppiumCommand } from "./types/appium-command";
import { interceptProxyResponse, routeToCommand } from "./utils";
import { getLogTypes, getLogs, startScreenRecording, stopScreenRecording, takeScreenShot } from "./command-executor";
import { CommandParser } from "./command-parser";
import { CommandLogs as commandLogsModel, Session, Logs as LogsTable } from "./models";
import { Op } from "sequelize";
import { log } from "./logger";
import * as fs from "fs";
import "reflect-metadata";
import { Container } from "typedi";
import { v4 as uuidv4 } from "uuid";

const cj = require("circular-json");

const CREATE_SESSION = "createSession";
class SessionManager {
  private lastLogLine = 0;
  private config: any = Container.get("config");

  constructor(private sessionInfo: SessionInfo, private commandParser: CommandParser, private sessionResponse: any) {
    this.sessionInfo.is_completed = false;
  }

  public async onCommandRecieved(command: AppiumCommand): Promise<any> {
    if (command.commandName == CREATE_SESSION) {
      return await this.sessionStarted(command);
    } else if (command.commandName == "deleteSession") {
      await this.sessionTerminated(command);
    } else if (command.commandName == "proxyReqRes") {
      let promise = interceptProxyResponse(command.args[1]);
      let originalNext = command.next;
      command.next = async () => (await Promise.all([originalNext(), promise]))[1];
      Object.assign(command, {
        ...routeToCommand(command.args),
      });
    }

    this.appendLogs(`Recieved command ${command.commandName}`);
    this.appendLogs(`args:\n ${cj.stringify(command.args)}`);
    await this.saveServerLogs(command);
    try {
      command.startTime = new Date();
      let res = await command.next();
      command.endTime = new Date();
      await this.saveCommandLog(command, res);
      return res;
    } catch (err: any) {
      command.endTime = new Date();
      await this.saveCommandLog(command, {
        error: err.error,
        message: err.message,
      });
      this.appendLogs(
        JSON.stringify({
          error: err.error,
          message: err.message,
        })
      );
    }
  }

  private async sessionStarted(command: AppiumCommand) {
    await Session.create({
      ...this.sessionInfo,
      start_time: new Date(),
    } as any);

    await this.saveCommandLog(command, null);
    await this.initializeScreenShotFolder();
    return await this.startScreenRecording(command.driver);
  }

  private async sessionTerminated(command: AppiumCommand) {
    this.sessionInfo.is_completed = true;
    let videoPath = await this.saveScreenRecording(command.driver);
    let errorCount = await commandLogsModel.count({
      where: {
        session_id: this.sessionInfo.session_id,
        is_error: true,
        command_name: {
          [Op.notIn]: ["findElement", "elementDisplayed"],
        },
      },
    });
    await Session.update(
      {
        is_completed: true,
        session_status: errorCount > 0 ? "FAILED" : "PASSED",
        end_time: new Date(),
        video_path: videoPath ? videoPath : null,
      },
      {
        where: {
          session_id: this.sessionInfo.session_id,
        },
      }
    );
  }

  private async saveServerLogs(command: AppiumCommand) {
    let logs = getLogs(command.driver, this.sessionInfo.session_id, "server");
    let newLogs = logs.slice(this.lastLogLine);
    if (!newLogs.length) {
      return false;
    }
    this.lastLogLine = logs.length;
    await LogsTable.bulkCreate(
      newLogs.map((l: any) => {
        return {
          ...l,
          timestamp: new Date(l.timestamp),
          session_id: this.sessionInfo.session_id,
          log_type: "DEVICE",
        };
      })
    );

    return true;
  }

  private async saveCommandLog(command: AppiumCommand, response: any) {
    if (typeof this.commandParser[command.commandName as keyof CommandParser] == "function") {
      response = command.commandName == CREATE_SESSION ? this.sessionInfo : response;
      let parsedLog: any = await this.commandParser[command.commandName as keyof CommandParser](
        command.driver,
        command.args,
        response
      );
      let screenShotPath = null;
      if (this.config.takeScreenshotsFor.indexOf(command.commandName) >= 0) {
        screenShotPath = `${this.config.screenshotSavePath}/${this.sessionInfo.session_id}/${uuidv4()}.jpg`;
        let screenShotbase64 = await takeScreenShot(command.driver, this.sessionInfo.session_id);
        fs.writeFileSync(screenShotPath, screenShotbase64.value, "base64");
      }
      Object.assign(parsedLog, {
        session_id: this.sessionInfo.session_id,
        command_name: command.commandName,
        is_error: response && !!response.error ? true : false,
        screen_shot: screenShotPath,
        start_time: command.startTime,
        end_time: command.endTime,
      });
      try {
        await commandLogsModel.create(parsedLog as any);
      } catch (err) {
        log.info(err);
        throw err;
      }
    }
  }

  private appendLogs(log: string) {
    fs.appendFileSync("/Users/sselvar4/Documents/git/personal/appium-dashboard-plugin/log.txt", `${log}\n`);
  }

  private async startScreenRecording(driver: any) {
    await startScreenRecording(driver, this.sessionInfo.session_id);
  }

  private async initializeScreenShotFolder() {
    if (!fs.existsSync(`${this.config.screenshotSavePath}/${this.sessionInfo.session_id}`)) {
      fs.mkdirSync(`${this.config.screenshotSavePath}/${this.sessionInfo.session_id}`, { recursive: true });
    }
  }

  private async saveScreenRecording(driver: any) {
    let videoBase64String = await stopScreenRecording(driver, this.sessionInfo.session_id);
    if (videoBase64String.value != "") {
      let outPath = `${this.config.videoSavePath}/${this.sessionInfo.session_id}.mp4`;
      fs.writeFileSync(outPath, videoBase64String.value, "base64");
      log.info(`Saving screenrecording.. ${outPath}`);
      return outPath;
    }
  }
}

export { SessionManager };
