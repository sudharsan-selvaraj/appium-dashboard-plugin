import * as os from "os";

let basePath = `${os.homedir()}/.cache/appium-dashboard-plugin`;
export let config = {
  databasePath: `${basePath}/`,
  videoSavePath: `${basePath}/.cache/appium-dashboard-plugin/videos`,
  screenshotSavePath: `${basePath}/.cache/appium-dashboard-plugin/screen-shots`,
  takeScreenshotsFor: ["click", "setUrl", "setValue"],
};
