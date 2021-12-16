import { AppiumCommand } from "./appium-command";
import { SessionInfo } from "./session-info";

export interface IAppiumEventAdapter {
  onSessionStarted(command: AppiumCommand, sessionInfo: SessionInfo): Promise<void>;
  onSessionTerminated(command: AppiumCommand, sessionInfo: SessionInfo, video: string): Promise<void>;
  onSessionTimeout(command: AppiumCommand, sessionInfo: SessionInfo, video: string): Promise<void>;

  saveLog(log: CommandLog, sessionInfo: SessionInfo): Promise<void>;
}
export interface CommandLog {
  session_id: string;
  command_name: string;
  title: string;
  title_info: string | null;
  response: any;
  params: any;
  is_error: boolean;
  screen_shot: string | null;
  start_time: Date;
  end_time: Date;
}
