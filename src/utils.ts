import { SessionInfo } from "./types/session-info";

function getSessionDetails(sessionResponse: any): any {
  console.log(sessionResponse.value);
  let [session_id, caps] = sessionResponse.value;
  let sessionInfo: SessionInfo = {
    session_id,
    platform: caps.platform,
    platform_name: caps.platformName.toUpperCase(),
    automation_name: caps.automationName,
    app: caps.app,
    udid:
      caps.platformName.toLowerCase() == "ios" ? caps.udid : caps.deviceUDID,
    capabilities: {} as any,
  };

  Object.keys(caps)
    .filter((k) => Object.keys(sessionInfo).indexOf(k) == -1)
    .forEach((k: string) => ((sessionInfo.capabilities as any)[k] = caps[k]));

  return sessionInfo;
}

export { getSessionDetails };
