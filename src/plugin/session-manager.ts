import * as path from "path";
import _ from "lodash";
import { SessionInfo } from "../interfaces/session-info";
import { AppiumCommand } from "../interfaces/appium-command";
import { interceptProxyResponse, routeToCommand, isDashboardCommand } from "./utils";
import {
  getLogs,
  startScreenRecording,
  stopScreenRecording,
  takeScreenShot,
  terminateSession,
} from "./driver-command-executor";
import { CommandParser } from "./command-parser";
import { CommandLogs as commandLogsModel, Session, Logs as LogsTable } from "../models";
import { Op } from "sequelize";
import { logger } from "../loggers/logger";
import * as fs from "fs";
import "reflect-metadata";
import { Container } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { DashboardCommands } from "./dashboard-commands";
import { PluginCliArgs } from "../interfaces/PluginCliArgs";
import { SessionTimeoutTracker } from "./session-timeout-tracker";
import { getOrCreateNewBuild, getOrCreateNewProject } from "../database-service";
import sessionDebugMap from "./session-debug-map";
import EventEmitter from "events";

const CREATE_SESSION = "createSession";

class SessionManager {
  private lastLogLine = 0;
  private config: any = Container.get("config");
  private dashboardCommands: DashboardCommands;
  private sessionTimeoutTracker: SessionTimeoutTracker;
  private debugEventNotifier: EventEmitter;
  private driver: any;

  constructor(
    private sessionInfo: SessionInfo,
    private commandParser: CommandParser,
    private sessionResponse: any,
    private cliArgs: PluginCliArgs
  ) {
    logger.info(`new command timeout ${sessionInfo.capabilities.newCommandTimeout}`);
    this.sessionInfo.is_completed = false;
    this.dashboardCommands = new DashboardCommands(sessionInfo);
    this.sessionTimeoutTracker = new SessionTimeoutTracker({
      timeout: sessionInfo.capabilities.newCommandTimeout || 300, //defaults to 5 minutes
      pollingInterval: 1000, //1 seconds
      timeoutCallback: this.onSessionTimeOut.bind(this),
    });
    this.debugEventNotifier = Container.get("debugEventEmitter");
    this.resgisterEventListeners(this.debugEventNotifier);
  }

  public resgisterEventListeners(notifier: EventEmitter) {
    notifier.on(`${this.sessionInfo.session_id}`, async (data) => {
      if (data.event == "change_state") {
        sessionDebugMap.set(this.sessionInfo.session_id, {
          is_paused: data.state == "pause",
        });
        await Session.update(
          {
            is_paused: data.state == "pause",
          },
          {
            where: {
              session_id: this.sessionInfo.session_id,
            },
          }
        );
        return;
      }

      if (data.callback && _.isFunction(data.callback)) {
        data.callback();
      }
    });
  }

  public async onCommandRecieved(command: AppiumCommand): Promise<any> {
    if (command.commandName == CREATE_SESSION) {
      this.driver = command.driver;
      this.sessionTimeoutTracker.start();
      this.sessionTimeoutTracker.tick(command);
      return await this.sessionStarted(command);
    } else if (command.commandName == "deleteSession") {
      this.sessionTimeoutTracker.stop();
      await this.sessionTerminated();
    } else if (command.commandName == "execute" && isDashboardCommand(this.dashboardCommands, command.args[0])) {
      await this.executeCommand(command);
      return true;
    } else if (command.commandName == "proxyReqRes") {
      let promise = interceptProxyResponse(command.args[1]);
      let originalNext = command.next;
      command.next = async () => (await Promise.all([originalNext(), promise]))[1];
      Object.assign(command, {
        ...routeToCommand(command.args),
      });
      logger.info(`Recieved proxyReqRes command for ${command.commandName}`);
    }

    this.sessionTimeoutTracker.tick(command);

    logger.info(`New command recieved ${command.commandName} for session ${this.sessionInfo.session_id}`);
    await this.saveServerLogs(command);
    try {
      command.startTime = new Date();
      let res = await command.next();
      logger.info(`Recieved response for command ${command.commandName} for session ${this.sessionInfo.session_id}`);
      command.endTime = new Date();
      await this.saveCommandLog(command, res);
      return res;
    } catch (err: any) {
      command.endTime = new Date();
      await this.saveCommandLog(command, {
        error: err.error,
        message: err.message,
      });
      logger.error(
        `Error occured while executing ${command.commandName} command ` +
          JSON.stringify({
            error: err.error,
            message: err.message,
          })
      );
      throw err;
    }
  }

  private async sessionStarted(command: AppiumCommand) {
    sessionDebugMap.createNewSession(this.sessionInfo.session_id);
    let { desired } = this.sessionInfo.capabilities;
    let buildName = desired["appium:buildName"];
    let projectName = desired["appium:projectName"];

    let build, project;
    if (projectName) {
      project = await getOrCreateNewProject({ projectName });
    }
    if (buildName) {
      build = await getOrCreateNewBuild({ buildName, projectId: project?.id });
    }

    await Session.create({
      ...this.sessionInfo,
      start_time: new Date(),
      build_id: build?.build_id,
      project_id: !build ? project?.id : null,
    } as any);

    await this.saveCommandLog(command, null);
    await this.initializeScreenShotFolder();
    return await this.startScreenRecording(command.driver);
  }

  public async sessionTerminated(options: { sessionTimedOut: boolean } = { sessionTimedOut: false }) {
    let session = await Session.findOne({
      where: {
        session_id: this.sessionInfo.session_id,
      },
    });

    if (session?.session_status?.toLowerCase() == "timeout") {
      logger.info(`Session ${this.sessionInfo.session_id} already timed out. So ignoring sessionTerminated command`);
      return;
    }

    this.sessionInfo.is_completed = true;
    let videoPath = await this.saveScreenRecording(this.driver);
    let errorCount = await commandLogsModel.count({
      where: {
        session_id: this.sessionInfo.session_id,
        is_error: true,
        command_name: {
          [Op.notIn]: ["findElement", "elementDisplayed"],
        },
      },
    });

    let updateObject: Partial<Session> = {
      is_completed: true,
      is_paused: false,
      end_time: new Date(),
      video_path: videoPath || null,
    };

    if (session?.session_status?.toLowerCase() == "running") {
      updateObject.session_status = options.sessionTimedOut ? "TIMEOUT" : errorCount > 0 ? "FAILED" : "PASSED";
    }

    if (session?.is_test_passed == null) {
      updateObject.is_test_passed = options.sessionTimedOut || errorCount > 0 ? false : true;
    }

    await Session.update(updateObject, {
      where: {
        session_id: this.sessionInfo.session_id,
      },
    });
    logger.info(`Session terminated ${this.sessionInfo.session_id}`);
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
    try {
      if (typeof this.commandParser[command.commandName as keyof CommandParser] == "function") {
        response = command.commandName == CREATE_SESSION ? this.sessionInfo : response;
        let parsedLog: any = await this.commandParser[command.commandName as keyof CommandParser](
          command.driver,
          command.args,
          response
        );
        let screenShotPath = null;
        if (this.config.takeScreenshotsFor.indexOf(command.commandName) >= 0) {
          let screenShotbase64 = await takeScreenShot(command.driver, this.sessionInfo.session_id);
          if (screenShotbase64.value && typeof screenShotbase64.value === "string") {
            screenShotPath = path.join(this.config.screenshotSavePath, this.sessionInfo.session_id, `${uuidv4()}.jpg`);
            fs.writeFileSync(screenShotPath, screenShotbase64.value, "base64");
            logger.info(
              `Screen shot saved for ${command.commandName} command in session ${this.sessionInfo.session_id}`
            );
          } else {
            logger.error(
              `Screen shot not saved for ${command.commandName} command in session ${
                this.sessionInfo.session_id
              } .response ${JSON.stringify(screenShotbase64.value)}`
            );
          }
        }
        Object.assign(parsedLog, {
          session_id: this.sessionInfo.session_id,
          command_name: command.commandName,
          is_error: response && !!response.error ? true : false,
          screen_shot: screenShotPath,
          start_time: command.startTime,
          end_time: command.endTime,
        });

        await commandLogsModel.create(parsedLog as any);
      }
    } catch (err) {
      logger.error(err);
    }
  }

  private async startScreenRecording(driver: any) {
    await startScreenRecording(driver, this.sessionInfo.session_id);
  }

  private async initializeScreenShotFolder() {
    let dirPath = path.join(this.config.screenshotSavePath, this.sessionInfo.session_id);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  private async saveScreenRecording(driver: any) {
    try {
      let videoBase64String = await stopScreenRecording(driver, this.sessionInfo.session_id);
      if (videoBase64String.value != "" && typeof videoBase64String.value === "string") {
        let outPath = path.join(this.config.videoSavePath, `${this.sessionInfo.session_id}.mp4`);
        fs.writeFileSync(outPath, videoBase64String.value, "base64");
        logger.info(`Video saved for ${this.sessionInfo.session_id} in ${outPath}`);
        return outPath;
      } else {
        logger.error(
          `Video not saved for session ${this.sessionInfo.session_id}. response: ${JSON.stringify(
            videoBase64String.value
          )}`
        );
      }
    } catch (err) {
      logger.error(err);
    }
  }

  private async executeCommand(command: AppiumCommand) {
    let scriptName = command.args[0].split(":")[1].trim();
    await (this.dashboardCommands[scriptName as keyof DashboardCommands] as any)(command.args[1]);
  }

  private async onSessionTimeOut(timeoutValue: number) {
    logger.warn(`Session ${this.sessionInfo.session_id} timed out after ${timeoutValue} seconds`);
    await this.saveCommandLog(
      {
        driver: this.driver,
        startTime: new Date(),
        endTime: new Date(),
        commandName: "sessionTimedout",
        args: [timeoutValue],
        next: async () => {},
      },
      {}
    );
    await this.sessionTerminated({ sessionTimedOut: true });
    await terminateSession(this.driver, this.sessionInfo.session_id);
  }
}

export { SessionManager };
