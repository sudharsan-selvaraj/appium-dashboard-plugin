import { IHttpLogger } from "../interfaces/http-logger";
import _ from "lodash";
import { exec } from "teen_process";
import CDP, { Client } from "chrome-remote-interface";
import { pluginLogger } from "../../loggers/plugin-logger";
import { NetworkLogsParser } from "./http-log-parser";
import status from "http-status";

export type AndroidNetworkProfilerOptions = {
  udid: string;
  adb: any;
  isWebView?: boolean;
  webviewName?: string;
};

class AndroidNetworkProfiler implements IHttpLogger {
  private started: boolean = false;
  private logs: Record<string, any> = {};
  private remoteDebugger!: Client;
  private logParser: NetworkLogsParser;

  constructor(private options: AndroidNetworkProfilerOptions) {
    this.logParser = new NetworkLogsParser(this.getContextName() || "");
  }

  async start(): Promise<void | Error> {
    const { udid, adb, isWebView = false } = this.options;
    try {
      if (!this.started) {
        this.remoteDebugger = await this.getClient(adb.executable, udid, isWebView);
        await this.startListener(this.remoteDebugger);
      }
    } catch (err) {
      pluginLogger.error("Unable to initialize android network profiler");
      pluginLogger.error(err);
      this.started = false;
    }
  }

  async stop(): Promise<void> {
    if (this.remoteDebugger && this.started) {
      await this.remoteDebugger.close();
      this.started = false;
    }
  }

  getLogs(): Array<any> {
    return this.logParser.getLogs();
  }

  private async startListener(remoteDebugger: Client) {
    const { Network } = remoteDebugger;

    Network.on("requestWillBeSent", this.logParser.onRequestRecieved.bind(this.logParser));

    Network.on("responseReceived", async (params: any) => {
      if (params.type.toLowerCase() == "xhr") {
        try {
          let response = await Network.getResponseBody({
            requestId: params.requestId,
          });
          if (this.isResponseBodyValid(params.response.mimeType)) {
            params.responseBody = this.parseResponseBody(response);
          }
          params.response.statusText = !!params.response?.statusText
            ? params.response?.statusText
            : status[params.response.status];
        } catch (err) {}
      }
      this.logParser.onResponseRecieved(params);
    });
    await Network.enable({});
  }

  private getContextName() {
    return this.options.isWebView ? this.options.webviewName : "browser";
  }

  private async getClient(adb: any, udid: string, isWebView: boolean) {
    const debuggerPort = await this.getChromeDebuggerPort(adb, udid, isWebView);
    if (!!debuggerPort) {
      return await CDP({
        local: true,
        port: debuggerPort,
      });
    } else {
      throw new Error(`No debugging port found for device ${udid}`);
    }
  }

  private async getChromeDebuggerPort(adb: any, udid: string, isWebView: boolean) {
    const args = [...adb.defaultArgs, "-s", udid, "forward", "--list"];
    let portSelector = isWebView ? "localabstract:webview_devtools_remote" : "localabstract:chrome_devtools_remote";
    let portList = await exec(adb.path, args);
    pluginLogger.info(portList.stdout);
    let portEntry = portList.stdout
      .split("\n")
      .filter((portEntry) => portEntry.includes(portSelector))
      .pop()
      ?.match(/tcp:([\d]{0,})/);
    return portEntry && portEntry.length > 1 ? parseInt(portEntry[1]) : null;
  }

  private isResponseBodyValid(responseType: string) {
    return !responseType.includes("javascript");
  }

  private parseResponseBody(response: any) {
    return response.base64Encoded ? Buffer.from(response.body, "base64").toString("ascii") : response.body;
  }
}

export { AndroidNetworkProfiler };
