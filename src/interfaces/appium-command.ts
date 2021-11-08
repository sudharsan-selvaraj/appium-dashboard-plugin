export interface AppiumCommand {
  driver: any;
  commandName: string;
  args: Array<any>;
  next: () => Promise<any>;
  startTime?: Date;
  endTime?: Date;
}
