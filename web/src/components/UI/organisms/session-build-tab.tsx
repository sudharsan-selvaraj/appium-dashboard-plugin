import React from "react";
import styled from "styled-components";
import Session from "../../../interfaces/session";
import TabsLayout, { Tab } from "../layouts/tab-layout";
import SessionDebugLogs from "./session-debug-logs";
import SessionDeviceLogs from "./session-device-logs";
import SessionTextLogs from "./session-text-logs";
import Profiling from "./app-profiling";
import SessionList from "./session-list";

type PropsType = {
  session: Session;
  parentHeight: number;
};

const Container = styled.div``;

enum TAB_HEADERS {
  SESSIONS = "Sessions",
  BUILDS = "Builds",
}

export default function SesionBuildTab() {
  return (
    <Container>
      <TabsLayout selected={TAB_HEADERS.SESSIONS}>
        <Tab name={TAB_HEADERS.SESSIONS}>
          <SessionList />
        </Tab>
        <Tab name={TAB_HEADERS.BUILDS}>
          <SessionList />
        </Tab>
      </TabsLayout>
    </Container>
  );
}
