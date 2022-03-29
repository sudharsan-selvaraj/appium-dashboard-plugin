export class SessionTimeoutTracker {
  private lastCommandRecievedTime!: Date;
  private timer: any;

  constructor(
    private options: {
      timeout: number;
      pollingInterval: number;
      timeoutCallback: (timeout: number) => any;
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

  public tick() {
    this.lastCommandRecievedTime = new Date();
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
      this.options.timeoutCallback(this.options.timeout);
    }
  }
}
