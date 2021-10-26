import Tab from "../../../widgets/tab/tab";
import { RouteReactiveComponent } from "../base-component-class";
import "./session-logs.css";
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
        label: "Appium Logs",
        key: 1,
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
    // return {
    //   0: <TextLogs session={this.props.session} />,
    // }[activeTab];
    return <TextLogs session={this.props.session} />;
  }

  render() {
    return (
      <div className="session-logs__container">
        <Tab headers={this.getTabs()} activeTab={this.state.activeTab} onTabSwitched={this.onTabSwitched.bind(this)} />
        <div className="session-logs__body">{this.getActiveTabComponent(this.state.activeTab)}</div>
      </div>
    );
  }
}
