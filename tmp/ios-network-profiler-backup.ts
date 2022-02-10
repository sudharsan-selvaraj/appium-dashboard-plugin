import IosDevice from "appium-ios-device";
import { getSimulator } from "appium-ios-simulator";
import { createRemoteDebugger } from "appium-remote-debugger";
import { retryInterval, retry } from "asyncbox";
import _ from "lodash";
import { IHttpLogger } from "../src/plugin/interfaces/http-logger";

export class IosNetworkProfiler implements IHttpLogger {
  private remoteDebugInstance: any;
  constructor(private opts: { uuid: string }) {}

  public async start(): Promise<void> {
    let sim = await this.getSimulator();
    console.log(await sim.getWebInspectorSocket());
    await sim.openUrl("https://www.google.com");
    if (await this.isRealDevice()) {
      this.remoteDebugInstance = createRemoteDebugger(
        {
          bundleId: "com.apple.mobilesafari",
          isSafari: true,
          useNewSafari: true,
          pageLoadMs: 1000,
          //socketPath: await sim.getWebInspectorSocket(),
          garbageCollectOnExecute: false,
          isSimulator: true,
          platformVersion: "15.1",
          logAllCommunication: false,
          logAllCommunicationHexDump: false,
        },
        false
      );
    } else {
      let sim = await this.getSimulator();
      this.remoteDebugInstance = createRemoteDebugger(
        {
          bundleId: "com.apple.mobilesafari",
          isSafari: true,
          useNewSafari: true,
          pageLoadMs: 1000,
          platformVersion: "15.1",
          socketPath: await sim.getWebInspectorSocket(),
          garbageCollectOnExecute: false,
          isSimulator: true,
          logAllCommunicationHexDump: false,
        },
        false
      );
    }

    await this.remoteDebugInstance.connect();
    await retryInterval(30, 1000, async () => {
      if (!_.isEmpty(this.remoteDebugInstance.appDict)) {
        return this.remoteDebugInstance.appDict;
      }
      await this.remoteDebugInstance.setConnectionKey();
      throw new Error("No apps connected");
    });

    this.remoteDebugInstance.addClientEventListener("Network", (event: any, a: any) => {
      console.log(a.initiator.stackTrace);
    });
    this.remoteDebugInstance.addClientEventListener("Network", async (event: any, a: any) => {
      console.log(a.requestId);
    });

    const page = _.find(await this.remoteDebugInstance.selectApp(""), (page) => {
      return page.url.indexOf("google") >= 1;
    });
    const [appIdKey, pageIdKey] = page.id.split(".").map((id: string) => parseInt(id, 10));
    await this.remoteDebugInstance.selectPage(appIdKey, pageIdKey);
  }

  async stop(): Promise<void> {}

  getLogs(): any[] {
    return [];
  }

  private async isRealDevice() {
    try {
      await IosDevice.getOSVersion(this.opts.uuid);
      return true;
    } catch (err) {
      return false;
    }
  }

  private async getSimulator() {
    return await getSimulator(this.opts.uuid);
  }
}
