import React from "react";
import Header from "./components/header/header";
import SessionList from "./components/session-list/session-list";
import SessionDetails from "./components/session-details/session-details";
import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="app__container">
        <div className="app__wrapper">
          <Header />
          <div className="app__main_content">
            <SessionList />
            <SessionDetails />
          </div>
        </div>
      </div>
    );
  }
}
