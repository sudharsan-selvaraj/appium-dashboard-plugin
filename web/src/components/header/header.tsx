import React from "react";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";

export default class Header extends React.Component<any, any> {
  render() {
    return (
      <div className="header__wrapper">
        <div className="header__container">
          <div className="header__logo">
            <HomeRoundedIcon />
            APPIUM DASHBOARD
          </div>
          <div className="header__search_container">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for session id"
              onChange={(e) =>
                this.props.onSessionFilterChanged(e.target.value)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
