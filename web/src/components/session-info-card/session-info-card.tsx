import React from "react";
import "./session-info-card.css";
import Spinner from "../../widgets/spinner/spinner";

export default class SessionInfoCard extends React.Component {
  render() {
    return (
      <div className="session-info-card__wrapper">
        <div className="session-info-card__items">
          <div className="session-info-card__title">Ios tests</div>
          <div className="session-info-card__details_wrapper">
            <div className="session-info-card__status success">PASSED</div>
            <div className="session-info-card__time">a few seconds ago</div>
          </div>
        </div>
        <div className="session-info-card__status_icon">
          <Spinner />
        </div>
      </div>
    );
  }
}
