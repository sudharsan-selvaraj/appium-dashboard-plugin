import { SessionManager } from "../../src/plugin/session-manager";
import { MockServer } from "jest-mock-server";
import { FakeDriver } from "./FakeDriver";
import { CommandParser } from "../../src/plugin/command-parser";
import { SessionTimeoutTracker } from "../../src/plugin/session-timeout-tracker";
import { SessionInfo } from "../../src/interfaces/session-info";
import path from "path";
import os from "os";
import { v4 as uuidv4 } from "uuid";
export function getTestHelpers(sessionInfo: SessionInfo): {
  sessionManager: SessionManager;
  driver: FakeDriver;
  timeoutTracker: SessionTimeoutTracker;
} {
  let fakeDriver: FakeDriver = new FakeDriver({
      mockserver: new MockServer(),
      sessionId: sessionInfo.session_id,
    }),
    timeoutTracker = new SessionTimeoutTracker({
      timeout: 1000,
      pollingInterval: 100,
      timeoutCallback: () => {},
    });
  return {
    sessionManager: new SessionManager(sessionInfo, new CommandParser(sessionInfo), {}, {}, timeoutTracker),
    driver: fakeDriver,
    timeoutTracker,
  };
}

export function getTestConfig() {
  const basePath = path.join(os.tmpdir(), "appium-dashboard-plugin");
  return {
    cacheDir: basePath,
    databasePath: `${basePath}`,
    videoSavePath: path.join(basePath, "videos"),
    screenshotSavePath: path.join(basePath, "screen-shots"),
    logFilePath: path.join(basePath, "appium-dashboard-plugin.log"),
    takeScreenshotsFor: ["click", "setUrl", "setValue", "performActions"],
  };
}

export function getAndroidSessionInfo(sessionId?: string): SessionInfo {
  return {
    session_id: sessionId || uuidv4(),
    platform: "Android",
    platform_name: "Android",
    device_name: "emulator-5554",
    browser_name: undefined,
    platform_version: "15.0",
    automation_name: "UiAutomator2",
    app: "wdio-demo.apk",
    udid: "emulator-5554",
    capabilities: {} as any,
  };
}

export function getCapabilities(opts: { platformName?: "android" | "ios"; projectName?: string; buildName?: string }) {
  return {
    capabilities: {
      alwaysMatch: {
        platformName: opts?.platformName || "Android",
        "appium:projectName": opts?.projectName,
        "appium:buildName": opts?.buildName,
        "appium:orientation": "PORTRAIT",
        "appium:automationName": "UiAutomator2",
        "appium:app": "/Users/sselvar4/Documents/git/playground/appiumboilerplate/apps/AndroidNativeDemoApp.4..apk",
        "appium:appWaitActivity": "com.wdiodemoapp.MainActivity",
        "appium:noReset": true,
        "appium:newCommandTimeout": 24,
      },
      firstMatch: [{}],
    },
    desiredCapabilities: {
      platformName: opts?.platformName || "Android",
      "appium:projectName": opts?.projectName || "appiumtest",
      "appium:buildName": opts?.buildName || "Wdio android test",
      "appium:automationName": "UiAutomator2",
      "appium:app": "/Users/sselvar4/Documents/git/playground/appiumboilerplate/apps/AndroidNativeDemoApp.4..apk",
      "appium:appWaitActivity": "com.wdiodemoapp.MainActivity",
      "appium:noReset": true,
      "appium:newCommandTimeout": 24,
    },
  };
}
