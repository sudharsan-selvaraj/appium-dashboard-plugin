import { NextFunction, Router, Request, Response } from "express";
import { Session } from "../../models/session";
import { Op, Sequelize } from "sequelize";
import { BaseController } from "../commons/base-controller";
import fs from "fs";
import { CommandLogs, Logs } from "../../models";
import * as path from "path";

export class SessionController extends BaseController {
  public initializeRoutes(router: Router, config: any) {
    router.get("/", this.getSessions.bind(this));
    router.get("/:sessionId", this.getSessionBySessionId.bind(this));
    router.delete("/:sessionId", (req, res, next) => this.deleteSession(req, res, next, config));
    router.get("/:sessionId/log/:logId/screen-shot", this.getScreenShotForLog.bind(this));
    router.get("/:sessionId/video", this.getVideoForSession.bind(this));
    router.get("/:sessionId/logs/text", this.getTextLogs.bind(this));
    router.get("/:sessionId/logs/device", this.getDeviceLogs.bind(this));
    router.get("/:sessionId/logs/debug", this.getDebugLogs.bind(this));
  }

  public async getSessions(request: Request, response: Response, next: NextFunction) {
    let { start_time, name, os, status, device_udid } = request.query as any;
    let filters: any = [];
    if (start_time) {
      filters.push({ start_time: { [Op.gte]: new Date(start_time) } });
    }
    if (name) {
      filters.push({
        [Op.or]: [
          {
            session_id: {
              [Op.like]: `%${name.trim()}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${name.trim()}%`,
            },
          },
        ],
      });
    }

    if (status) {
      filters.push({
        session_status: status.toUpperCase(),
      });
    }

    if (device_udid) {
      filters.push(Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("udid")), device_udid.toLowerCase()));
    }

    if (os) {
      filters.push(Sequelize.where(Sequelize.fn("LOWER", Sequelize.col("platform_name")), os.toLowerCase()));
    }

    this.sendSuccessResponse(
      response,
      await Session.findAndCountAll({
        where: {
          [Op.and]: filters,
        },
        order: [["start_time", "DESC"]],
      })
    );
  }

  public async getSessionBySessionId(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    this.sendSuccessResponse(
      response,
      await Session.findOne({
        where: {
          session_id: sessionId,
        },
      })
    );
  }

  public async deleteSession(request: Request, response: Response, next: NextFunction, config: any) {
    let sessionId: string = request.params.sessionId;
    let session = await Session.findOne({
      where: {
        session_id: sessionId,
      },
    });

    if (session && session.session_status != "RUNNING") {
      await session.destroy();
      if (session.video_path) {
        fs.unlinkSync(session.video_path);
      }
      fs.rmdirSync(path.join(config.screenshotSavePath, session.session_id), { recursive: true });
      this.sendSuccessResponse(response, {
        success: true,
      });
    } else {
      this.sendFailureResponse(response, "Cannnot delete running session");
    }
  }

  public async getVideoForSession(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    let session = await Session.findOne({
      where: {
        session_id: sessionId,
      },
    });
    if (session && session.video_path) {
      return response.status(200).sendFile(session.video_path);
    }

    this.sendFailureResponse(response, "Video not available");
  }

  public async getTextLogs(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    let logs = await CommandLogs.findAndCountAll({
      where: {
        session_id: sessionId,
      },
    });
    this.sendSuccessResponse(response, logs);
  }

  public async getDeviceLogs(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    let logs = await Logs.findAndCountAll({
      where: {
        session_id: sessionId,
        log_type: "DEVICE",
      },
    });
    this.sendSuccessResponse(response, logs);
  }

  public async getDebugLogs(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    let logs = await Logs.findAndCountAll({
      where: {
        session_id: sessionId,
        log_type: "DEBUG",
      },
    });
    this.sendSuccessResponse(response, logs);
  }

  public async getScreenShotForLog(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    let logId: string = request.params.logId;
    let log = await CommandLogs.findOne({
      where: {
        session_id: sessionId,
        log_id: logId,
      },
    });
    if (log && log.screen_shot) {
      return response.status(200).sendFile(log.screen_shot);
    }
    this.sendFailureResponse(response, "Screen shot not available");
  }
}
