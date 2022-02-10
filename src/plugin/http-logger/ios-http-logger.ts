import { IHttpLogger } from "../interfaces/http-logger";
import { isRealDevice, getSimulator } from "../utils/ios-utils";
import { createRemoteDebugger } from "appium-remote-debugger";
import { retryInterval } from "asyncbox";
import _ from "lodash";
import { pluginLogger } from "../../loggers/plugin-logger";
import { logger } from "../../loggers/logger";

export type IosNetworkProfilerOptions = {
  udid: string;
  platformVersion: string;
};

interface RemoteDebugger {
  connect(): Promise<any>;
  appDict: any;
  setConnectionKey(): Promise<any>;
  disconnect(): Promise<any>;
  addClientEventListener(eventName: string, callback: (...args: any[]) => any): Promise<any>;
  startTimeline(callback: (...args: any[]) => any): Promise<any>;
  startNetwork(callback: (...args: any[]) => any): Promise<any>;
  selectApp(args: any): Promise<any>;
  selectPage(appId: string, pageId: string): Promise<any>;
}

const SAFARI_BUNDLE_ID = "com.apple.mobilesafari";

/* TODO: Temporary solution. Need a better way to retrieve the socket path */
const DEFAULT_USBMUXD_SOCKET = "/var/run/usbmuxd";
const DEFAULT_USBMUXD_PORT = 27015;
const DEFAULT_USBMUXD_HOST = "127.0.0.1";

const DEFAULT_DEBUGGER_OPTIONS = {
  bundleId: SAFARI_BUNDLE_ID,
  isSafari: true,
  useNewSafari: true,
  pageLoadMs: 1000,
  garbageCollectOnExecute: false,
};

/**
 * TODO: Not working while appium session is active
 * Rewrite with new implementation
 */
class IosNetworkProfiler implements IHttpLogger {
  private started: boolean = false;
  private remoteDebugger!: RemoteDebugger;
  private logs: Record<string, any> = {};

  constructor(private options: IosNetworkProfilerOptions) {}

  async start(): Promise<void | Error> {
    const { udid, platformVersion } = this.options;
    if (!this.started) {
      this.remoteDebugger = await IosNetworkProfiler.getRemoteDebugger(udid, platformVersion);
      try {
        await IosNetworkProfiler.waitForRemoteDebugger(this.remoteDebugger);
        await this.initializeListeners();
        this.started = true;
      } catch (err) {
        logger.error("Unable to capture network data for ios device");
        logger.error(err);
        await this.stop();
      }
    }
  }

  async stop(): Promise<void> {
    if (this.started && this.remoteDebugger) {
      await this.remoteDebugger.disconnect();
      this.started = false;
    }
  }

  getLogs(): Array<any> {
    return [];
  }

  private async initializeListeners() {
    this.remoteDebugger.addClientEventListener("NetworkEvent", (err: any, event: any) => {
      pluginLogger.info(event);
      this.logs[event.requestId] = event;
    });
    this.remoteDebugger.addClientEventListener("Network.responseReceived", async (err: any, event: any) => {
      pluginLogger.info(event);
      this.logs[event.requestId] = Object.assign({}, this.logs[event.requestId], {
        response: event,
      });
    });
    const page = _.find(await this.remoteDebugger.selectApp("http://0.0.0.0:4723/welcome"), (page) => {
      return page.url == "http://0.0.0.0:4723/welcome";
    });
    const [appIdKey, pageIdKey] = page.id.split(".").map((id: string) => parseInt(id, 10));
    pluginLogger.info(`AppId: ${appIdKey}  and pageIdKey: ${pageIdKey}`);
    //await this.remoteDebugger.selectPage(appIdKey, pageIdKey);
  }

  private static async waitForRemoteDebugger(remoteDebugger: RemoteDebugger) {
    await remoteDebugger.connect();
    await retryInterval(30, 1000, async () => {
      if (!_.isEmpty(remoteDebugger.appDict)) {
        return remoteDebugger.appDict;
      }
      await remoteDebugger.setConnectionKey();
      throw new Error("No apps connected");
    });
  }

  private static async getRemoteDebugger(deviceUUID: string, platformVersion: string) {
    if (await isRealDevice(deviceUUID)) {
      let options = {
        ...DEFAULT_DEBUGGER_OPTIONS,
        isSimulator: false,
        socketPath: DEFAULT_USBMUXD_SOCKET,
        uuid: deviceUUID,
        platformVersion,
      };
      return createRemoteDebugger(options, true);
    } else {
      let simulator = await getSimulator(deviceUUID);
      let options = {
        ...DEFAULT_DEBUGGER_OPTIONS,
        isSimulator: true,
        socketPath: await simulator.getWebInspectorSocket(),
        uuid: deviceUUID,
        platformVersion,
      };
      return createRemoteDebugger(options, false);
    }
  }
}

export { IosNetworkProfiler };
