import * as os from "os";

let basePath = `${os.homedir()}/.cache/appium-dashboard-plugin`;

export let config = {
  cacheDir: basePath,
  databasePath: `${basePath}/`,
  videoSavePath: `${basePath}/videos`,
  screenshotSavePath: `${basePath}/screen-shots`,
  logFilePath: `${basePath}/appium-dashboard-plugin.log`,
  takeScreenshotsFor: ["click", "setUrl", "setValue", "performActions"],
};
