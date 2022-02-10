import { NextFunction, Router, Request, Response } from "express";
import { Session } from "../../models/session";
import { Op, Sequelize } from "sequelize";
import { BaseController } from "../commons/base-controller";
import fs from "fs";
import { CommandLogs, HttpLogs, Logs, Profiling } from "../../models";
import * as path from "path";
import { parseSessionFilterParams } from "../utils/common-utils";
import { MjpegProxy } from "mjpeg-proxy";

export class SessionController extends BaseController {
  private static mjpegProxyCache: Map<number, any> = new Map();

  public initializeRoutes(router: Router, config: any) {
    router.get("/", this.getSessions.bind(this));
    router.get("/:sessionId", this.getSessionBySessionId.bind(this));
    router.delete("/:sessionId", (req, res, next) => this.deleteSession(req, res, next, config));
    router.get("/:sessionId/log/:logId/screen-shot", this.getScreenShotForLog.bind(this));
    router.get("/:sessionId/video", this.getVideoForSession.bind(this));
    router.get("/:sessionId/logs/text", this.getTextLogs.bind(this));
    router.get("/:sessionId/logs/device", this.getDeviceLogs.bind(this));
    router.get("/:sessionId/logs/debug", this.getDebugLogs.bind(this));
    router.get("/:sessionId/profiling_data", this.getProfilingData.bind(this));
    router.get("/:sessionId/http_logs", this.getHttpLogs.bind(this));
    router.get("/:sessionId/live_video", this.getVideo.bind(this));
  }

  public async getSessions(request: Request, response: Response, next: NextFunction) {
    const filters = parseSessionFilterParams(request.query as any);

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

  public async getProfilingData(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    let logs = await Profiling.findAll({
      attributes: [
        "id",
        "timestamp",
        "cpu",
        "memory",
        "total_cpu_used",
        "total_memory_used",
        "raw_cpu_log",
        "raw_memory_log",
      ],
      where: {
        session_id: sessionId,
      },
      order: [["timestamp", "ASC"]],
    });
    this.sendSuccessResponse(response, logs);
  }

  public async getHttpLogs(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    let logs = await HttpLogs.findAndCountAll({
      where: {
        session_id: sessionId,
      },
      order: [["start_time", "ASC"]],
    });
    this.sendSuccessResponse(response, logs);
  }

  public async getVideo(request: Request, response: Response, next: NextFunction) {
    let sessionId: string = request.params.sessionId;
    let session = await Session.findOne({
      where: {
        session_id: sessionId,
      },
    });
    const proxyPort = session?.live_stream_port;
    if (!proxyPort) {
      return this.sendFailureResponse(response, { message: "Live stream not available" });
    }

    if (!SessionController.mjpegProxyCache.has(proxyPort)) {
      const url = `${request.protocol}://${request.hostname}:${proxyPort}`;
      SessionController.mjpegProxyCache.set(proxyPort, new MjpegProxy(url));
    }
    SessionController.mjpegProxyCache.get(proxyPort)?.proxyRequest(request, response);
  }
}
