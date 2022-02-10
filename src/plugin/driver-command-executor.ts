import { makeGETCall, makePostCall, makeDELETECall } from "./utils/plugin-utils";

async function startScreenRecording(driver: any, sessionId: string) {
  return await makePostCall(driver, sessionId, "/appium/start_recording_screen", {
    options: {
      videoType: "libx264",
      videoFps: 10,
      /* In android, adb can record only 3 mins of video. below timeLimit is used to take longer video */
      timeLimit: 1800, //in seconds (30 min)
    },
  });
}

async function takeScreenShot(driver: any, sessionId: string) {
  return await makeGETCall(driver, sessionId, "/screenshot");
}

async function stopScreenRecording(driver: any, sessionId: string) {
  return await makePostCall(driver, sessionId, "/appium/stop_recording_screen", {});
}

async function getLogTypes(driver: any, sessionId: string) {
  return await makeGETCall(driver, sessionId, "/log/types");
}

async function terminateSession(driver: any, sessionId: string) {
  return await makeDELETECall(driver, sessionId, "");
}

function getLogs(driver: any, sessionId: string, logType: string) {
  let session = driver,
    logKey: any = {
      uiautomator2: "uiautomator2.adb.logcat.logs",
      xcuitest: "logs.syslog.logs",
    };
  if (driver.sessions) {
    session = driver.sessions[sessionId];
  }

  let logs = logKey[session.caps.automationName.toLowerCase()]?.split(".").reduce((acc: any, k: any) => {
    return acc[k] || {};
  }, session);

  return Array.isArray(logs) ? logs : [];
}

export { startScreenRecording, stopScreenRecording, getLogTypes, getLogs, takeScreenShot, terminateSession };
