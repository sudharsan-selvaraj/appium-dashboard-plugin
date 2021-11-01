import { Session, Logs } from "./models/index";
import { SessionInfo } from "./types/session-info";

export class DashboardCommands {
  constructor(private sessionInfo: SessionInfo) {}

  /**
   * commandName: dashboard: setTestName
   */
  private async setTestName(args: any[]): Promise<void> {
    await Session.update(
      {
        name: args[0],
      },
      {
        where: { session_id: this.sessionInfo.session_id },
      }
    );
  }

  /**
   * commandName: dashboard: debug
   */
  private async debug(args: any[]): Promise<void> {
    let props: any = args[0];
    await Logs.create({
      session_id: this.sessionInfo.session_id,
      log_type: "DEBUG",
      message: props.message,
      args: props.args || null,
      timestamp: new Date(),
    } as any);
  }

  /**
   * commandName: dashboard: updateStatus
   */
  private async updateStatus(args: any[]): Promise<void> {
    let props: any = args[0];
    if (!props.status || !new RegExp(/passed|failed/g).test(props.status.toLowerCase())) {
      return;
    }
    await Session.update(
      {
        session_status_message: props.message,
        session_status: props.status,
        is_test_passed: props.status.toLowerCase() == "passed",
      },
      {
        where: { session_id: this.sessionInfo.session_id },
      }
    );
  }
}
