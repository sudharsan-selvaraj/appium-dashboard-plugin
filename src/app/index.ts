import * as express from "express";
import bodyParser from "body-parser";
import { Session, CommandLogs, Logs } from "../models/index";
import * as path from "path";
import * as fs from "fs";
import { Op } from "sequelize";
const cors = require("cors");

function getRouter({ config }: { config: any }) {
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

  apiRouter.get("/sessions", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let start_time = req.query.start_time as string;
    let filter: any = {};
    if (start_time) {
      filter.start_time = { [Op.gte]: new Date(start_time) };
    }
    res.status(200).send(
      await Session.findAndCountAll({
        where: filter,
        order: [["start_time", "DESC"]],
      })
    );
  });

  apiRouter.get(
    "/sessions/:sessionId",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      let sessionId: string = req.params.sessionId;
      res.status(200).send(
        await Session.findOne({
          where: {
            session_id: sessionId,
          },
        })
      );
    }
  );

  apiRouter.delete(
    "/sessions/:sessionId",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      let sessionId: string = req.params.sessionId;
      let session = await Session.findOne({
        where: {
          session_id: sessionId,
        },
      });

      if (session) {
        await session.destroy();
        if (session.video_path) {
          fs.unlinkSync(session.video_path);
        }
        fs.rmdirSync(`${config.screenshotSavePath}/${session.session_id}`, { recursive: true });
      }
      res.status(200).send({
        success: true,
      });
    }
  );

  apiRouter.get(
    "/sessions/:sessionId/video",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      let sessionId: string = req.params.sessionId;
      let session = await Session.findOne({
        where: {
          session_id: sessionId,
        },
      });
      if (session && session.video_path) {
        return res.status(200).sendFile(session.video_path);
      }
      res.status(400).send({
        error: true,
        message: "Video not available",
      });
    }
  );

  apiRouter.get(
    "/sessions/:sessionId/log/:logId/screen-shot",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      let sessionId: string = req.params.sessionId;
      let logId: string = req.params.logId;
      let log = await CommandLogs.findOne({
        where: {
          session_id: sessionId,
          log_id: logId,
        },
      });
      if (log && log.screen_shot) {
        return res.status(200).sendFile(log.screen_shot);
      }
      res.status(400).send({
        error: true,
        message: "Screenshot not available",
      });
    }
  );

  apiRouter.get(
    "/sessions/:sessionId/logs/text",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      let sessionId: string = req.params.sessionId;
      res.status(200).send(
        await CommandLogs.findAndCountAll({
          where: {
            session_id: sessionId,
          },
        })
      );
    }
  );

  apiRouter.get(
    "/sessions/:sessionId/logs/device",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      let sessionId: string = req.params.sessionId;
      res.status(200).send(
        await Logs.findAndCountAll({
          where: {
            session_id: sessionId,
            log_type: "DEVICE",
          },
        })
      );
    }
  );

  apiRouter.get(
    "/sessions/:sessionId/logs/debug",
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      let sessionId: string = req.params.sessionId;
      res.status(200).send(
        await Logs.findAndCountAll({
          where: {
            session_id: sessionId,
            log_type: "DEBUG",
          },
        })
      );
    }
  );

  router.use("/api", apiRouter);

  router.get("*", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
  });

  return router;
}
export { getRouter };
