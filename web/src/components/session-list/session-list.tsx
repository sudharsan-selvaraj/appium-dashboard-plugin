import React from "react";
import "./session-list.css";
import FilterListRoundedIcon from "@material-ui/icons/FilterListRounded";
import SessionInfoCard from "../session-info-card/session-info-card";
export default class SessionList extends React.Component {
  render() {
    return (
      <div className="session-list__container">
        <div className="session-list__header">
          <FilterListRoundedIcon />
          FILTERS
        </div>
        <div className="session-list__scrollConatiner">
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          <SessionInfoCard />
          hi
        </div>
      </div>
    );
  }
}
