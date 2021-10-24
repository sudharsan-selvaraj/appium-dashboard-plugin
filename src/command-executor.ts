import { makeGETCall, makePostCall } from "./utils";

async function startScreenRecording(driver: any, sessionId: string) {
  return await makePostCall(driver, sessionId, "appium/start_recording_screen", {
    options: {
      videoType: "libx264",
      videoFps: 24,
    },
  });
}

async function stopScreenRecording(driver: any, sessionId: string) {
  return await makePostCall(driver, sessionId, "appium/stop_recording_screen", {});
}

async function getLogTypes(driver: any, sessionId: string) {
  return await makeGETCall(driver, sessionId, "log/types");
}

async function getLogs(driver: any, sessionId: string, logType: string) {
  var res = await makePostCall(driver, sessionId, "log", {
    type: logType,
  });
  return res;
}

export { startScreenRecording, stopScreenRecording, getLogTypes, getLogs };
