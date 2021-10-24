import { SessionInfo } from "./types/session-info";
import { AppiumCommand } from "./types/appium-command";
import { interceptProxyResponse, routeToCommand } from "./utils";
import { startScreenRecording, stopScreenRecording } from "./command-executor";
import { getLogTypes, getLogs } from "./command-executor";
import { CommandParser } from "./command-parser";
import { CommandLogs as commandLogsModel, Session } from "./models";
import { Op } from "sequelize";
import { log } from "./logger";
import * as fs from "fs";
import "reflect-metadata";
import { Container } from "typedi";

const cj = require("circular-json");

const CREATE_SESSION = "createSession";
class SessionManager {
  private logTypes: Array<string> = [];
  private logInterval!: NodeJS.Timeout;
  private isLogsPending: Boolean = false;
  private driverOpts: any;
  private config: any = Container.get("config");

  constructor(private sessionInfo: SessionInfo, private commandParser: CommandParser, private sessionResponse: any) {
    this.sessionInfo.is_completed = false;
  }

  public async onCommandRecieved(command: AppiumCommand): Promise<any> {
    if (command.commandName == CREATE_SESSION) {
      this.appendLogs(`Recieved command ${command.commandName}`);
      this.appendLogs(cj.stringify(command.args));
      this.appendLogs(`${JSON.stringify(this.sessionResponse)}`);
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
      this.appendLogs("Inside Proxy Req");
    }

    this.appendLogs(`Recieved command ${command.commandName}`);
    this.appendLogs(cj.stringify(command.args));
    try {
      let res = await command.next();
      await this.saveCommandLog(command, res);
      this.appendLogs(!res ? "null" : JSON.stringify(res));
      this.appendLogs("------------------------------------------------------------------------------------------");
      return res;
    } catch (err: any) {
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
      this.appendLogs("------------------------------------------------------------------------------------------");
    }
  }

  private async sessionStarted(command: AppiumCommand) {
    this.driverOpts = command.driver.opts;

    await Session.create({
      ...this.sessionInfo,
      start_time: new Date(),
    } as any);

    await this.initializeLogging(command.driver);
    await this.saveCommandLog(command, null);
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

  private async saveCommandLog(command: AppiumCommand, response: any) {
    if (typeof this.commandParser[command.commandName as keyof CommandParser] == "function") {
      response = command.commandName == CREATE_SESSION ? this.sessionInfo : response;
      let parsedLog: any = await this.commandParser[command.commandName as keyof CommandParser](
        command.driver,
        command.args,
        response
      );
      Object.assign(parsedLog, {
        session_id: this.sessionInfo.session_id,
        command_name: command.commandName,
        is_error: response && !!response.error ? true : false,
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

  private async initializeLogging(driver: any) {
    this.logTypes = (await getLogTypes(driver, this.sessionInfo.session_id)).value || [];
    //this.logInterval = setInterval(this.fetchLogs.bind(this), 5000);
  }

  private async fetchLogs() {
    if (this.isLogsPending) {
      return;
    }
    if (this.sessionInfo.is_completed) {
      clearInterval(this.logInterval);
      log.info(`Closing logs for session ${this.sessionInfo.session_id}`);
    } else {
      this.isLogsPending = true;
      log.info(`Fetching logs for session ${this.sessionInfo.session_id}`);
      let logs = await Promise.all(
        this.logTypes.map(async (l) => {
          return await getLogs(this.driverOpts, this.sessionInfo.session_id, l);
        })
      );
      log.info(`${logs.length}`);
      this.isLogsPending = false;
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
