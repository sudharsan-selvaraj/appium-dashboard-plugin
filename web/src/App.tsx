import React from "react";
import Header from "./components/header/header";
import SessionList from "./components/session-list/session-list";
import SessionDetails from "./components/session-details/session-details";
import "./App.css";
import { ApiService } from "./services/api";
import Spinner from "./widgets/spinner/spinner";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import history from "./history";

class App extends React.Component<any, any> {
  private polling: any;
  constructor(props: any) {
    super(props);
    let sessionId = window.location.pathname.match(new RegExp(/dashboard\/session\/(.*)/));
    this.state = {
      loading: true,
      sessions: [],
      activeSession: sessionId && sessionId.length ? sessionId[1] : null,
    };
  }

  fetchSessions() {
    ApiService.getAllSessions().then(
      (result) => {
        this.setState({
          loading: false,
          sessions: result.rows,
          activeSession:
            result.rows.filter((r: any) => r.session_id == this.state.activeSession).length > 0
              ? this.state.activeSession
              : result.rows[0]?.session_id,
        });
      },
      (error) => {
        this.setState({
          loading: false,
          sessions: [],
        });
      }
    );
  }

  componentDidMount() {
    this.initSessionPolling();
  }

  componentWillUnmount() {
    this.resetPolling();
  }

  initSessionPolling() {
    this.resetPolling();
    this.fetchSessions();
    this.polling = setInterval(this.fetchSessions.bind(this), 8000);
  }

  resetPolling() {
    this.polling && clearInterval(this.polling);
    this.polling = null;
  }

  onSessionCardClicked(sessionId: string) {
    if (sessionId != this.state.activeSession) {
      this.initSessionPolling();
      this.setState({ activeSession: sessionId });
    }
  }

  getMainContent() {
    if (this.state.loading) {
      return (
        <div className="app__loading">
          <Spinner />
          <div className="app__loading_message code">Loading... Please wait</div>
        </div>
      );
    } else if (this.state.sessions.length <= 0) {
      return (
        <div className="app__loading">
          <Spinner />
          <div className="app__loading_message code">Waiting for new session to start</div>
        </div>
      );
    } else {
      return (
        <div className="app__main_content code">
          <Router history={history}>
            <SessionList
              sessions={this.state.sessions}
              activeSession={this.state.activeSession}
              onSessionCardClicked={this.onSessionCardClicked.bind(this)}
            />
            <Route
              path="/dashboard/session/:sessionId"
              render={(props: any) => (
                <SessionDetails
                  session={this.state.sessions.filter((s: any) => s.session_id == props.match.params.sessionId)[0]}
                />
              )}
            />
            <Redirect to={`/dashboard/session/${this.state.activeSession}`} />
          </Router>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="app__container">
        <div className="app__wrapper">
          <Header />
          {this.getMainContent()}
        </div>
      </div>
    );
  }
}

export default App;
