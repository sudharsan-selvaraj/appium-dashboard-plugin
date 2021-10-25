import React from "react";
import Tab from "../../../widgets/tab/tab";
import { BaseComponent } from "../base-component-class";
import "./session-capability-details.css";

export default class SessionCapabilityDetails extends BaseComponent<any, any> {
  private polling: any;
  constructor(props: any) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  componentDidMount() {
    this.initializePolling();
  }

  initializePolling() {
    if (this.polling) {
      clearInterval(this.polling);
    }
    this.polling = setInterval(() => {
      console.log(this.props.session.session_id);
    }, 2000);
  }

  protected componentUpdated() {
    this.initializePolling();
    this.setState({ activeTab: 0 });
  }

  getTabProperties() {
    let tabs = [
      {
        label: "Capabilities",
        key: 0,
      },
    ];

    if (this.props.session.capabilities.desired) {
      tabs.push({
        label: "Desired Capabilities",
        key: 1,
      });
    }

    return tabs;
  }

  onTabSwitched(tabKey: any) {
    if (this.state.activeTab != tabKey) {
      this.setState({
        activeTab: tabKey,
      });
    }
  }

  getCapabilityEntries() {
    let capabilityObject =
      this.state.activeTab == 0 ? this.props.session.capabilities : this.props.session.capabilities.desired;
    if (!capabilityObject) {
      return React.Children.toArray([]);
    }
    return React.Children.toArray(
      Object.keys(capabilityObject)
        .filter((k) => k != "desired" && capabilityObject[k] != "")
        .map((k) => {
          return (
            <div className="session-capabilities__entry">
              <div className="session-capabilities__entry_label">{k}:</div>
              <div className="session-capabilities__entry_value">
                {typeof capabilityObject[k] == "object" || typeof capabilityObject[k] == "boolean"
                  ? JSON.stringify(capabilityObject[k])
                  : capabilityObject[k]}
              </div>
            </div>
          );
        })
    );
    //return <div></div>;
  }

  render() {
    return (
      <div className="session-capabilities__container">
        <Tab
          headers={this.getTabProperties()}
          activeTab={this.state.activeTab}
          onTabSwitched={this.onTabSwitched.bind(this)}
        />
        <div className="session-capabilities__body">{this.getCapabilityEntries()}</div>
      </div>
    );
  }
}
