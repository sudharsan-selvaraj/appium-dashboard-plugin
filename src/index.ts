import { Container } from "typedi";
import { sequelizeLoader } from "./database-loader";
import { getRouter } from "./app/index";
import { AppiumDashboardPlugin } from "./plugin";
import { config } from "./config";
import * as fs from "fs";
import { pluginLogger } from "./loggers/plugin-logger";
var ffmpeg = require("@ffmpeg-installer/ffmpeg").path;

async function createVideoDirectoryPath(fullPath: string) {
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    pluginLogger.info("Video directory created " + fullPath);
  }
}
Container.set("expressRouter", getRouter({ config }));
Container.set("config", config);

(async () => {
  //Add FFMPEG to path
  process.env.PATH = process.env.PATH + ":" + ffmpeg.replace(/ffmpeg$/g, "");

  //load sequelize database
  await sequelizeLoader({ dbPath: config.databasePath });

  //create directory for videos
  await createVideoDirectoryPath(config.videoSavePath);
})();

export { AppiumDashboardPlugin };
