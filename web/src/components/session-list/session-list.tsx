import React from "react";
import "./session-list.css";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SessionInfoCard from "../session-info-card/session-info-card";
import SessionFilter from "./session-filter/session-filter";

export default class SessionList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      appliedFilterCount: 0,
      showFilter: false,
      filter: {
        name: "",
        os: "",
        status: "",
      },
    };
  }

  onFilterApplied(filters: any) {
    let filterCount = 0;
    Object.keys(filters).forEach((key: any) => {
      if (filters[key] != "") {
        filterCount++;
      }
    });
    this.setState({ filter: filters, showFilter: false, appliedFilterCount: filterCount });
  }

  toggleFilter(state: boolean) {
    this.setState({ showFilter: state });
  }

  getSessions() {
    let filters: any = [];
    if (this.state.filter.name) {
      filters.push(
        (session: any) =>
          session.session_id.indexOf(this.state.filter.name) >= 0 ||
          session.name?.toLowerCase().indexOf(this.state.filter.name.toLowerCase()) >= 0
      );
    }
    if (this.state.filter.os) {
      filters.push((session: any) => session.platform_name.toLowerCase() == this.state.filter.os.toLowerCase());
    }

    if (this.state.filter.status) {
      filters.push((session: any) => session.session_status.toLowerCase() == this.state.filter.status.toLowerCase());
    }

    return React.Children.toArray(
      filters
        .reduce((acc: any, filter: any) => {
          return acc.filter(filter);
        }, this.props.sessions)
        .map((session: any) => {
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
            {this.state.appliedFilterCount > 0 && (
              <div className="session-list__filter_count">{this.state.appliedFilterCount}</div>
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
