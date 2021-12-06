import React from "react";
import { useEffect } from "react";
import {
  Route,
  Router,
  Switch,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { SESSION_DETAILS } from "../../constants/routes";
import { APP_HEADER_HEIGHT } from "../../constants/ui";
import Animation from "../UI/atoms/animation";
import ParallelLayout, { Column } from "../UI/layouts/parallel-layout";
import SerialLayout, { Row } from "../UI/layouts/serial-layout";
import Centered from "../UI/molecules/centered";
import EmptyMessage from "../UI/molecules/empty-message";
import AppHeader from "../UI/organisms/app-header";
import SessionDetails from "../UI/organisms/session-details";
import SessionList from "../UI/organisms/session-list";

export default function DashboardTemplate() {
  const history = useHistory();

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
