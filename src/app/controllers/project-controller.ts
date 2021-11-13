import { NextFunction, Router, Request, Response } from "express";
import { BaseController } from "../commons/base-controller";
import { Project } from "../../models/project";

export class ProjectController extends BaseController {
  public initializeRoutes(router: Router, config: any) {
    router.get("/", this.getProjects.bind(this));
  }

  public async getProjects(request: Request, response: Response, next: NextFunction) {
    let projects = await Project.findAndCountAll({
      order: [["created_at", "DESC"]],
    });
    this.sendSuccessResponse(response, projects);
  }
}
