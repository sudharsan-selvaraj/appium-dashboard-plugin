import React from "react";
import Tab from "../../../widgets/tab/tab";
import { RouteReactiveComponent } from "../../route-reactive-component";
import DeviceLogs from "./device-logs/device-logs";
import "./session-logs.css";
import DebugLogs from "./debug-logs/debug-logs";
import TextLogs from "./text-logs/text-logs";

export default class SessionLogs extends RouteReactiveComponent<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  getTabs() {
    return [
      {
        label: "Text Logs",
        key: 0,
      },
      {
        label: "Device Logs",
        key: 1,
      },
      {
        label: "Debug Logs",
        key: 2,
      },
    ];
  }

  protected componentUpdated(): void {
    this.setState({ activeTab: 0 });
  }

  onTabSwitched(key: any) {
    this.setState({ activeTab: key });
  }

  getActiveTabComponent(activeTab: number) {
    return {
      0: <TextLogs session={this.props.session} />,
      1: <DeviceLogs session={this.props.session} />,
      2: <DebugLogs session={this.props.session} />,
    }[activeTab];
  }

  render() {
    return (
      <div className="session-logs__container">
        <Tab
          headers={this.getTabs()}
          activeTab={this.state.activeTab}
          onTabSwitched={this.onTabSwitched.bind(this)}
        />
        <div className="session-logs__body">
          {this.getActiveTabComponent(this.state.activeTab)}
        </div>
      </div>
    );
  }
}
