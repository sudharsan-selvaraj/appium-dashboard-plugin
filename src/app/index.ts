import * as express from "express";
import bodyParser from "body-parser";
import * as path from "path";
const cors = require("cors");
import { registerRoutes } from "./routes";
import { Config } from "../config";

function getRouter({ config, dependencies }: { config: Config; dependencies: Record<string, any> }) {
  let router = express.Router();
  let apiRouter = express.Router();
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(cors());
  apiRouter.use(cors());

  /* Add routes */

  router.use(express.static(path.join(__dirname, "../public")));

  /* Healthcheck endpoint used by device-farm plugin to see if the dashboard plugin is loaded */
  apiRouter.get("/ping", (req, res) => {
    res.status(200).send({
      pong: true,
    });
  });

  registerRoutes(apiRouter, config, dependencies);

  router.use("/api", apiRouter);
  router.get("*", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
  });

  return router;
}
export { getRouter };
