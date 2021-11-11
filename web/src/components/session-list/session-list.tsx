import React from "react";
import "./session-list.css";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SessionInfoCard from "../session-info-card/session-info-card";
import SessionFilter from "./session-filter/session-filter";

export default class SessionList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      showFilter: this.props.showFilter,
    };
  }

  getActiveFilterCount() {
    let filterCount = 0;
    Object.keys(this.props.filters).forEach((key: any) => {
      if (this.props.filters[key] != "") {
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
      this.props.sessions.map((session: any) => {
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
    let session = this.getSessions();
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
            <SessionFilter
              filter={this.props.filters}
              onFilterApplied={(filter: any) => {
                this.props.onFilterApplied(filter);
                this.toggleFilter(!this.state.showFilter);
              }}
            />
          )}
        </div>
        {session.length > 0 ? (
          <div className="session-list__scrollConatiner">
            {this.getSessions()}
            <div className="session-list__padding-helper"></div>
          </div>
        ) : (
          <div className="session-list__message_container">
            <div className="session-list__message_text">No sessions found for given filter..</div>
          </div>
        )}
      </div>
    );
  }
}
