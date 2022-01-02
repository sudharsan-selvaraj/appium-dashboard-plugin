import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { APP_HEADER_HEIGHT } from "../../constants/ui";
import { setSelectedSession } from "../../store/actions/session-actions";
import { getSessions } from "../../store/selectors/entities/sessions-selector";
import ParallelLayout, { Column } from "../UI/layouts/parallel-layout";
import SerialLayout, { Row } from "../UI/layouts/serial-layout";
import AppHeader from "../UI/organisms/app-header";
import SessionDetails from "../UI/organisms/session-details";
import SessionList from "../UI/organisms/session-list";

export default function DashboardTemplate() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const session_id = location.pathname.split("/").pop();
  const sessions = useSelector(getSessions);
  useEffect(() => {
    if (session_id) {
      const SelectedSession = sessions.find((d) => d.session_id === session_id);
      SelectedSession && dispatch(setSelectedSession(SelectedSession));
    }
  }, [session_id, sessions]);

  return (
    <SerialLayout>
      <Row height={`${APP_HEADER_HEIGHT}px`}>
        <AppHeader />
      </Row>
      <Row height={`calc(100vh - ${APP_HEADER_HEIGHT}px)`}>
        <ParallelLayout>
          <Column grid={3}>
            <SessionList />
          </Column>
          <Column grid={9}>
            <Router history={history}>
              <Switch>
                <Route>
                  <SessionDetails />
                </Route>
              </Switch>
            </Router>
          </Column>
        </ParallelLayout>
      </Row>
    </SerialLayout>
  );
}
