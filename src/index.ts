import { Container } from "typedi";
import { sequelizeLoader } from "./database-loader";
import { getRouter } from "./app/index";
import { AppiumDashboardPlugin } from "./plugin";
import { config } from "./config";
import * as fs from "fs";
import { pluginLogger } from "./loggers/plugin-logger";
import { EventEmitter } from "events";
import ADB from "appium-adb";

const ffmpeg = require("@ffmpeg-installer/ffmpeg").path;
const DebugEventNotifier = new EventEmitter();

async function createVideoDirectoryPath(fullPath: string) {
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    pluginLogger.info("Video directory created " + fullPath);
  }
}

Container.set("debugEventEmitter", DebugEventNotifier);
Container.set("expressRouter", getRouter({ config, dependencies: { debugEventEmitter: DebugEventNotifier } }));
Container.set("config", config);

(async () => {
  //Create ADB instance
  try {
    Container.set("adb", await ADB.createADB({}));
  } catch (ignore) {
    pluginLogger.error("Unable to create adb instance");
    pluginLogger.error(ignore);
  }

  //Add FFMPEG to path
  process.env.PATH = process.env.PATH + ":" + ffmpeg.replace(/ffmpeg$/g, "");

  //load sequelize database
  await sequelizeLoader({ dbPath: config.databasePath });

  //create directory for videos
  await createVideoDirectoryPath(config.videoSavePath);
})();

export { AppiumDashboardPlugin };
