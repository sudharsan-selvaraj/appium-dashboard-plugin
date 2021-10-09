export interface AppiumCommand {
  driver: object;
  commandName: string;
  args: Array<any>;
  next: () => Promise<any>;
}
