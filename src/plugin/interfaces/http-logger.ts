export interface IHttpLogger {
  start(): Promise<void | Error>;
  stop(): Promise<void>;
  getLogs(): Array<any>;
}
