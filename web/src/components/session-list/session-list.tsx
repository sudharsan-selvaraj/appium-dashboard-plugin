import React from "react";
import "./session-list.css";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SessionInfoCard from "../session-info-card/session-info-card";
import SessionFilter from "./session-filter/session-filter";
import CommonUtils from "../../utils/common-utils";
export default class SessionList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      appliedFilterCount: 0,
      showFilter: false,
      filter: Object.assign(
        {
          name: "",
          os: "",
          status: "",
          device_udid: "",
        },
        this.props.filters
      ),
    };
  }

  onFilterApplied(filters: any) {
    this.setState({ filter: filters, showFilter: false });
  }

  getActiveFilterCount() {
    let filterCount = 0;
    Object.keys(this.state.filter).forEach((key: any) => {
      if (this.state.filter[key] != "") {
        filterCount++;
      }
    });
    return filterCount;
  }

  toggleFilter(state: boolean) {
    this.setState({ showFilter: state });
  }

  getSessions() {
    return React.Children.toArray(
      CommonUtils.filterSessionList(this.props.sessions, this.state.filter).map((session: any) => {
        return (
          <SessionInfoCard
            session={session}
            onCardClicked={this.props.onSessionCardClicked}
            isActive={this.props.activeSession == session.session_id}
          />
        );
      })
    );
  }

  render() {
    return (
      <div className="session-list__container">
        <div className="session-list__header">
          <div className="session-list__filter_header" onClick={() => this.toggleFilter(!this.state.showFilter)}>
            <FilterListRoundedIcon />
            FILTERS
            {this.getActiveFilterCount() > 0 && (
              <div className="session-list__filter_count">{this.getActiveFilterCount()}</div>
            )}
          </div>
          {this.state.showFilter && (
            <SessionFilter filter={this.state.filter} onFilterApplied={this.onFilterApplied.bind(this)} />
          )}
        </div>
        <div className="session-list__scrollConatiner">
          {this.getSessions()}
          <div className="session-list__padding-helper"></div>
        </div>
      </div>
    );
  }
}
