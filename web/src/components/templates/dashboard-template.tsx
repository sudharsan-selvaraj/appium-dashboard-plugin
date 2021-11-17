import React from "react";
import { APP_HEADER_HEIGHT } from "../../constants/ui";
import ParallelLayout, { Column } from "../UI/layouts/parallel-layout";
import SerialLayout, { Row } from "../UI/layouts/serial-layout";
import AppHeader from "../UI/organisms/app-header";
import SessionList from "../UI/organisms/session-list";

export default function DashboardTemplate() {
  return (
    <SerialLayout>
      <Row height={`${APP_HEADER_HEIGHT}px`}>
        <AppHeader />
      </Row>
      <Row height={`calc(100vh - ${APP_HEADER_HEIGHT}px)`}>
        <ParallelLayout>
          <Column grid={2}>
            <SessionList />
          </Column>
          <Column grid={10}>
          </Column>
        </ParallelLayout>
      </Row>
    </SerialLayout>
  );
}
