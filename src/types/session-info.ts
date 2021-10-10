export interface SessionInfo {
  session_id: string;
  platform: string;
  platform_name: string;
  automation_name: string;
  app: string;
  udid: string;
  capabilities: [string: any];
  is_completed?: boolean;
}
