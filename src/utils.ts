import { SessionInfo } from "./interfaces/session-info";
import fetch from "node-fetch";
import { routeToCommandName as _routeToCommandName } from "appium-base-driver";
import { CustomColumnOption } from "./interfaces/custom-column-options";
import { DashboardCommands } from "./dashboard-commands";

function getSessionDetails(args: any, sessionResponse: any): any {
  let [session_id, caps] = sessionResponse.value;
  let sessionInfo: SessionInfo = {
    session_id,
    platform: caps.platform,
    platform_name: caps.platformName.toUpperCase(),
    automation_name: caps.automationName,
    device_name: caps.deviceName,
    browser_name: caps.browserName,
    platform_version: caps.platformVersion,
    app: caps.app,
    udid: caps.platformName.toLowerCase() == "ios" ? caps.udid : caps.deviceUDID,
    capabilities: JSON.parse(JSON.stringify(args[0])),
  };

  Object.keys(caps)
    .filter((k) => Object.keys(sessionInfo).indexOf(k) == -1)
    .forEach((k: string) => ((sessionInfo.capabilities as any)[k] = caps[k]));

  return sessionInfo;
}

function getDriverEndpoint(driver: any) {
  let { address, port, basePath } = driver.opts || driver;
  return `http://${address}:${port}${constructBasePath(basePath)}`;
}

function constructBasePath(basePath: string) {
  if (!basePath || basePath == "") {
    return "";
  }
  if (!basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }
  if (basePath.endsWith("/")) {
    basePath = basePath.substr(0, basePath.length - 2);
  }
  return basePath;
}

async function makePostCall(driver: any, sessionId: string, path: string, body: any): Promise<any> {
  const response = await fetch(`${getDriverEndpoint(driver)}/session/${sessionId}/${path}`, {
    method: "post",
    body: body ? JSON.stringify(body) : "{}",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
}

async function makeGETCall(driver: any, sessionId: string, path: string): Promise<any> {
  const response = await fetch(`${getDriverEndpoint(driver)}/session/${sessionId}/${path}`);
  return await response.json();
}

function interceptProxyResponse(response: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const defaultWrite = response.write;
    const defaultEnd = response.end;
    const chunks: any = [];

    response.write = (...restArgs: any) => {
      chunks.push(Buffer.from(restArgs[0]));
      defaultWrite.apply(response, restArgs);
    };
    response.end = (...restArgs: any) => {
      if (restArgs[0]) {
        chunks.push(Buffer.from(restArgs[0]));
      }
      const body = Buffer.concat(chunks).toString("utf8");
      defaultEnd.apply(response, restArgs);
      resolve(JSON.parse(body).value);
    };
  });
}

function routeToCommand(proxyReqRes: any) {
  return {
    commandName: _routeToCommandName(proxyReqRes[0].originalUrl, proxyReqRes[0].method),
    newargs: [proxyReqRes[0].body, proxyReqRes[proxyReqRes.length - 1]],
  };
}

function customModelColumn(options: CustomColumnOption) {
  let result: any = {};
  result["set"] = function (value: any) {
    if (options.json) {
      if ((value != null || value != undefined) && typeof value === "object") {
        value = JSON.stringify(value);
      }
    }
    this.setDataValue(options.name, value);
  };

  result["get"] = function () {
    let value = this.getDataValue(options.name);
    if (value == null) {
      return value;
    }
    if (options.json) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        //ignore
      }
    }
    return value;
  };
  return result;
}

function millisToMinutesAndSeconds(millis: any) {
  var minutes = Math.floor(millis / 60000);
  var seconds: any = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function isDashboardCommand(dashboardCommand: DashboardCommands, commandName: string) {
  let parts = commandName.split(":").map((p) => p.trim());
  return parts[0] == "dashboard" && typeof dashboardCommand[parts[1] as keyof DashboardCommands] == "function";
}

export {
  makeGETCall,
  makePostCall,
  getSessionDetails,
  interceptProxyResponse,
  routeToCommand,
  customModelColumn,
  millisToMinutesAndSeconds,
  isDashboardCommand,
};
