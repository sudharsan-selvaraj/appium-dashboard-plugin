import EventEmitter from "events";
import B from "bluebird";
import _ from "lodash";
import { SubProcess, exec } from "teen_process";
import { pluginLogger } from "../loggers/plugin-logger";

class DeviceProfiler extends EventEmitter {
  private adb: any;
  private logs: Array<any>;
  private deviceUDID: string;
  private appPackage: string;
  private proc!: SubProcess | null;
  private deviceInfo: any;

  constructor(opts: any = {}) {
    super();
    this.adb = opts.adb;
    this.logs = [];
    this.deviceUDID = opts.deviceUDID;
    this.appPackage = opts.appPackage;
  }

  async startCapture() {
    let started = false;

    return await new B(async (_resolve, _reject) => {
      const resolve = function (...args: any[]) {
        started = true;
        _resolve(...args);
      };

      const reject = function (...args: any[]) {
        started = true;
        _reject(...args);
      };

      this.deviceInfo = await this.getDeviceInfo();
      const cmd = [
        ...this.adb.defaultArgs,
        "-s",
        this.deviceUDID,
        "shell",
        "top",
        "-o",
        "%CPU,RSS,ARGS",
        "-s",
        "1",
        "-m",
        "20",
        "-d",
        "1",
      ];
      this.proc = new SubProcess(this.adb.path, cmd);
      this.proc.on("exit", (code, signal) => {
        this.proc = null;
        if (!started) {
          resolve();
        }
      });

      this.proc.on("lines-stdout", (lines) => {
        resolve();
        if (!lines[3]) {
          return;
        }
        let slicedLines = lines.slice(4);
        let sysInfo = {
          total_cpu_used: this.getSystemCpuUsage(lines[3]),
          total_memory_used: this.getSystemMemoryUsage(lines[1]),
          raw_cpu_log: lines[3],
          raw_memory_log: lines[1],
        };
        for (let line of slicedLines) {
          if (new RegExp(/\r/g).test(line)) {
            line
              .split(/\r/g)
              .filter((l: string) => !!l)
              .forEach((l: string) => this.outputHandler(sysInfo, _.trim(l)));
          } else {
            this.outputHandler(sysInfo, _.trim(line));
          }
        }
      });
      await this.proc.start(0);
    });
  }

  outputHandler(generalCpuInfo: any, output: string) {
    //remove all ascii chanracters from the log line
    output = output.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
    let [cpu, memory, pkg] = output.split(" ");
    if (!output || pkg != this.appPackage) {
      return;
    }
    const outputObj = {
      timestamp: new Date().toISOString(),
      cpu,
      memory,
      ...generalCpuInfo,
    };
    this.logs.push(outputObj);
    this.emit("output", outputObj);
  }

  async stopCapture() {
    if (!this.proc || !this.proc.isRunning) {
      this.proc = null;
      return;
    }
    this.proc.removeAllListeners("exit");
    await this.proc.stop();
    this.proc = null;
  }

  getLogs() {
    return this.logs;
  }

  async getDeviceInfo() {
    return {
      total_cpu: await this.getTotalCpus(),
      total_memory: await this.getTotalMemory(),
    };
  }

  private async getTotalCpus() {
    const args = [...this.adb.defaultArgs, "-s", this.deviceUDID, "shell", "cat", "/proc/cpuinfo"];
    let out = await exec(this.adb.path, args);
    return out.stdout.match(/processor/g)?.length;
  }

  private async getTotalMemory() {
    const args = [...this.adb.defaultArgs, "-s", this.deviceUDID, "shell", "cat", "/proc/meminfo"];
    let out = await exec(this.adb.path, args);
    let match = out.stdout.match(/MemTotal:.*[0-9]/g);
    if (match && match.length) {
      return match[0].replace(/[^0-9]/g, "");
    }
    return 0;
  }

  private getSystemCpuUsage(logLine: string) {
    if (!logLine) {
      return;
    }
    let data: Record<string, any> = {};
    ["cpu", "idle"].forEach((type: string) => {
      let match = logLine.match(new RegExp(`([0-9]{0,})%${type}`));
      data[type] = match && match.length > 1 ? Number(match[1]) : 0;
    });
    let cpuUsage = data["cpu"] - data["idle"];
    return cpuUsage > 0 ? cpuUsage : 0;
  }

  private getSystemMemoryUsage(logLine: string) {
    if (!logLine) {
      return;
    }
    let match = logLine.match(new RegExp(/([0-9]{0,})k used/i));
    /* In some devices, memory will be shows in GB, so convert it back to KB */
    if (!match) {
      /* sample logLine "Mem:      5.5G total,      5.4G used,       71M free,       36M buffers" */
      match = logLine.match(new RegExp(/(\d+(\.\d+))G used/i));
      return match && match.length > 1 ? Math.ceil(parseFloat(match[1]) * 1024 * 1024) : 0;
    }
    return match && match.length > 1 ? Number(match[1]) : 0;
  }
}

export { DeviceProfiler };
