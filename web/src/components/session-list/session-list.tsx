import React from "react";
import "./session-list.css";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SessionInfoCard from "../session-info-card/session-info-card";

export default class SessionList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  getSessions() {
    return React.Children.toArray(
      this.props.sessions.map((s: any) => (
        <SessionInfoCard
          session={s}
          onCardClicked={this.props.onSessionCardClicked}
          isActive={this.props.activeSession == s.session_id}
        />
      ))
    );
  }

  render() {
    return (
      <div className="session-list__container">
        <div className="session-list__header">
          <FilterListRoundedIcon />
          FILTERS
        </div>
        <div className="session-list__scrollConatiner">
          {this.getSessions()}
          <div className="session-list__padding-helper"></div>
        </div>
      </div>
    );
  }
}
