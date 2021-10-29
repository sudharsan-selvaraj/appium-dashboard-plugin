import { Container } from "typedi";
import { sequelizeLoader } from "./database-loader";
import { router } from "./app/index";
import { AppiumDashboardPlugin } from "./plugin";
import { config } from "./config";
import * as fs from "fs";
import { log } from "./logger";
var ffmpeg = require("@ffmpeg-installer/ffmpeg").path;
Container.set("expressRouter", router);
Container.set("config", config);

async function createVideoDirectoryPath(fullPath: string) {
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    log.info("Video directory created " + fullPath);
  }
}

log.info(Container.get("config"));
(async () => {
  //Add FFMPEG to path
  process.env.PATH = process.env.PATH + ":" + ffmpeg.replace(/ffmpeg$/g, "");

  //load sequelize database
  await sequelizeLoader();

  //create directory for videos
  await createVideoDirectoryPath(config.videoSavePath);
})();

export { AppiumDashboardPlugin };
