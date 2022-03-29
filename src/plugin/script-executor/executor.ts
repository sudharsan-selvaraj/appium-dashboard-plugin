import { SessionInfo } from "../../interfaces/session-info";
import cp from "child_process";
import { timing } from "@appium/support";
import B from "bluebird";
import { getWdioServerOpts } from "../utils/plugin-utils";

const childScript = require.resolve("./script.js");
const DEFAULT_SCRIPT_TIMEOUT_MS = 1000 * 60 * 60; // default to 1 hour timeout

class DriverScriptExecutor {
  private driverOptions: any;

  constructor(private sessionInfo: SessionInfo, private driver: any) {
    let { hostname, port, path } = getWdioServerOpts(driver);

    this.driverOptions = {
      sessionId: sessionInfo.session_id,
      protocol: "http",
      hostname,
      port,
      path,
      isW3C: true,
      isMobile: true,
      capabilities: driver.caps,
    };
  }

  public async execute({ script, timeoutMs = DEFAULT_SCRIPT_TIMEOUT_MS }: { script: string; timeoutMs?: number }) {
    const scriptProc = cp.fork(childScript);
    let timeoutCanceled = false;

    try {
      const timer = new timing.Timer();
      timer.start();

      const waitForResult = async () => {
        const res: any = await new B((res) => {
          scriptProc.on("message", res); // this is node IPC
        });

        return res.data;
      };

      const waitForTimeout = async () => {
        while (!timeoutCanceled && timer.getDuration().asMilliSeconds < timeoutMs) {
          await B.delay(500);
        }

        if (timeoutCanceled) {
          return;
        }

        throw new Error(
          `Execute driver script timed out after ${timeoutMs}ms. ` + `You can adjust this with the 'timeout' parameter.`
        );
      };

      scriptProc.send({ driverOpts: this.driverOptions, script, timeoutMs });

      // and set up a race between the response from the child and the timeout
      return await B.race([waitForResult(), waitForTimeout()]);
    } finally {
      // ensure we always cancel the timeout so that the timeout promise stops
      // spinning and allows this process to die gracefully
      timeoutCanceled = true;

      if (scriptProc.connected) {
        scriptProc.disconnect();
      }

      if (scriptProc.exitCode === null) {
        scriptProc.kill();
      }
    }
  }
}

export { DriverScriptExecutor };
