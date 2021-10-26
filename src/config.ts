import * as os from "os";

export let config = {
  videoSavePath: `${os.homedir()}/.cache/appium-dashboard-plugin/videos`,
  screenshotSavePath: `${os.homedir()}/.cache/appium-dashboard-plugin/screen-shots`,
  takeScreenshotsFor: ["click", "setUrl", "setValue"],
};
