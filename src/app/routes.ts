import { Router } from "express";
import { IExpressController } from "../interfaces/express-controller";
import * as apiControllers from "./controllers/index";

export let registerRoutes = (apiRouter: Router, config: any) => {
  let controllers: [string, IExpressController][] = [
    ["/sessions", new apiControllers.SessionController()],
    ["/builds", new apiControllers.BuildController()],
    ["/projects", new apiControllers.ProjectController()],
  ];

  for (let [path, controller] of controllers) {
    /* pass the routed to the controller which will map the internal routes with corresponding methods */
    let route = Router();
    controller.initializeRoutes(route, config);
    apiRouter.use(path, route);
  }
};
