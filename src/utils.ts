import { SessionInfo } from "./types/session-info";
import fetch from "node-fetch";
const circularjson = require("circular-json");
import { log } from "./logger";

function getSessionDetails(sessionResponse: any): any {
  console.log(sessionResponse.value);
  let [session_id, caps] = sessionResponse.value;
  let sessionInfo: SessionInfo = {
    session_id,
    platform: caps.platform,
    platform_name: caps.platformName.toUpperCase(),
    automation_name: caps.automationName,
    app: caps.app,
    udid: caps.platformName.toLowerCase() == "ios" ? caps.udid : caps.deviceUDID,
    capabilities: {} as any,
  };

  Object.keys(caps)
    .filter((k) => Object.keys(sessionInfo).indexOf(k) == -1)
    .forEach((k: string) => ((sessionInfo.capabilities as any)[k] = caps[k]));

  return sessionInfo;
}

function getDriverEndpoint(driver: any) {
  let { address, port, basePath } = driver.opts;
  return `http://${address}:${port}${basePath != "" ? "/" + basePath : ""}`;
}

async function makePostCall(driver: any, sessionId: string, path: string, body: any): Promise<any> {
  log.info(`enpoint ${getDriverEndpoint(driver)}/session/${sessionId}/${path}`);
  const response = await fetch(`${getDriverEndpoint(driver)}/session/${sessionId}/${path}`, {
    method: "post",
    body: body ? JSON.stringify(body) : "{}",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function startScreenRecording(driver: any, sessionId: string) {
  return await makePostCall(driver, sessionId, "appium/start_recording_screen", {
    options: {
      videoType: "mpeg4",
    },
  });
}

async function stopScreenRecording(driver: any, sessionId: string) {
  return await makePostCall(driver, sessionId, "appium/stop_recording_screen", {});
}

export { getSessionDetails, startScreenRecording, stopScreenRecording };
