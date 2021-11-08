import { AppiumCommand } from "./interfaces/appium-command";

export class SessionTimeoutTracker {
  private lastCommandRecievedTime!: Date;
  private timer: any;
  private lastAppiumCommand!: AppiumCommand;

  constructor(
    private options: {
      timeout: number;
      pollingInterval: number;
      timeoutCallback: (command: AppiumCommand, timeoutvalue: number) => any;
    }
  ) {}

  public start() {
    if (!this.timer) {
      this.lastCommandRecievedTime = new Date();
      this.timer = setInterval(() => {
        this.checkForSessionTimeout();
      }, this.options.pollingInterval);
    }
  }

  public tick(command: AppiumCommand) {
    this.lastCommandRecievedTime = new Date();
    this.lastAppiumCommand = command;
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private checkForSessionTimeout() {
    const timediffInSeconds = Math.round((new Date().getTime() - this.lastCommandRecievedTime.getTime()) / 1000);
    if (timediffInSeconds > this.options.timeout) {
      this.stop();
      this.options.timeoutCallback(this.lastAppiumCommand, timediffInSeconds);
    }
  }
}
