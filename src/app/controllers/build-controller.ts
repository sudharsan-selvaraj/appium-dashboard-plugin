import { NextFunction, Router, Request, Response } from "express";
import { Op } from "sequelize";
import { BaseController } from "../commons/base-controller";
import { Build } from "../../models/build";

export class BuildController extends BaseController {
  public initializeRoutes(router: Router, config: any) {
    router.get("/", this.getBuilds.bind(this));
  }

  public async getBuilds(request: Request, response: Response, next: NextFunction) {
    let created_at = request.query.created_at as string;
    let filter: any = {};
    if (created_at) {
      filter.created_at = { [Op.gte]: new Date(created_at) };
    }
    this.sendSuccessResponse(
      response,
      await Build.findAndCountAll({
        where: filter,
        order: [["created_at", "DESC"]],
      })
    );
  }
}
