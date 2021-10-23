import * as express from "express";
import bodyParser from "body-parser";
import { Session } from "../models/index";
import * as path from "path";

let router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

/* Add routes */

router.use(express.static(path.join(__dirname, "../public")));

router.get("/sessions", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(200).send(await Session.findAndCountAll());
});

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
});

export { router };
