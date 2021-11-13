import { NextFunction, Router, Request, Response } from "express";
import { Op } from "sequelize";
import { BaseController } from "../commons/base-controller";
import { Build } from "../../models/build";
import { Session } from "../../models/session";

export class BuildController extends BaseController {
  public initializeRoutes(router: Router, config: any) {
    router.get("/", this.getBuilds.bind(this));
    router.get("/:builds/sessions", this.getSessionsForBuild.bind(this));
  }

  public async getBuilds(request: Request, response: Response, next: NextFunction) {
    let created_at = request.query.created_at as string;
    let filter: any = {};
    if (created_at) {
      filter.created_at = { [Op.gte]: new Date(created_at) };
    }
    let builds = await Build.findAndCountAll({
      where: filter,
      include: [
        {
          model: Session,
          as: "sessions",
        },
      ],
      order: [["updated_at", "DESC"]],
    });
    builds.rows = JSON.parse(JSON.stringify(builds.rows)).map((build: any) => {
      build.sessions = {
        total: build.sessions.length,
        passed: build.sessions.filter((s: Session) => s.session_status?.toLowerCase() === "passed").length,
        running: build.sessions.filter((s: Session) => s.session_status?.toLowerCase() === "running").length,
        failed: build.sessions.filter((s: Session) => s.session_status?.toLowerCase() === "failed").length,
        timeout: build.sessions.filter((s: Session) => s.session_status?.toLowerCase() === "timeout").length,
      };
      return build;
    }) as any;
    this.sendSuccessResponse(response, builds);
  }

  public async getSessionsForBuild(request: Request, response: Response, next: NextFunction) {
    let buildId = request.params.builId;
    this.sendSuccessResponse(
      response,
      await Session.findAndCountAll({
        where: {
          build_id: buildId,
        },
      })
    );
  }
}
