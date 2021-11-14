import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ReduxActionTypes from "../../store/redux-action-types";

export default function Header(props: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ReduxActionTypes.INIT_APP,
    });
  }, []);
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
            onChange={(e) => props.onSessionFilterChanged(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
