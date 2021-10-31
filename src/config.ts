import * as os from "os";

let basePath = `${os.homedir()}/.cache/appium-dashboard-plugin`;

export let config = {
  databasePath: `${basePath}/`,
  videoSavePath: `${basePath}/videos`,
  screenshotSavePath: `${basePath}/screen-shots`,
  takeScreenshotsFor: ["click", "setUrl", "setValue", "performActions"],
};
