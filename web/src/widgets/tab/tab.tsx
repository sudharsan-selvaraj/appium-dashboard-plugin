import React from "react";
import "./tab.css";

export default class Tab extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  getTabItems() {
    return React.Children.toArray(
      this.props.headers.map((header: any) => {
        return (
          <div
            className={`tab-header ${
              header.key == this.props.activeTab ? "active" : ""
            }`}
            key={header.key}
            onClick={() => {
              this.props.onTabSwitched(header.key);
            }}
          >
            <span>{header.label}</span>
          </div>
        );
      }),
    );
  }

  render() {
    return <div className="tab-wrapper">{this.getTabItems()}</div>;
  }
}
