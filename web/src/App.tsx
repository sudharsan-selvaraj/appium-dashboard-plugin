import React from "react";
import Header from "./components/header/header";
import SessionList from "./components/session-list/session-list";

import "./App.css";

export default class App extends React.Component {
  render() {
    return (
      <div className="app__container">
        <div className="app__wrapper">
          <Header />
          <div className="app__main_content">
            <SessionList />
            {/* <SessionDetail /> */}
          </div>
        </div>
      </div>
    );
  }
}
