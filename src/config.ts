import * as os from "os";
import * as path from "path";
let basePath = path.join(os.homedir(), ".cache", "appium-dashboard-plugin");

export interface Config {
  cacheDir: string;
  databasePath: string;
  videoSavePath: string;
  screenshotSavePath: string;
  logFilePath: string;
  takeScreenshotsFor: Array<string>;
}

export let config = {
  cacheDir: basePath,
  databasePath: `${basePath}`,
  videoSavePath: path.join(basePath, "videos"),
  screenshotSavePath: path.join(basePath, "screen-shots"),
  logFilePath: path.join(basePath, "appium-dashboard-plugin.log"),
  takeScreenshotsFor: ["click", "setUrl", "setValue", "performActions"],
};
