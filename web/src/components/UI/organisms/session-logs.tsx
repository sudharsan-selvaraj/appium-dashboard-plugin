import React from "react";
import styled from "styled-components";
import Session from "../../../interfaces/session";
import TabsLayout, { Tab } from "../layouts/tab-layout";
import SessionDebugLogs from "./session-debug-logs";
import SessionDeviceLogs from "./session-device-logs";
import SessionTextLogs from "./session-text-logs";
import Profiling from "./app-profiling";

type PropsType = {
  session: Session;
  parentHeight: number;
};

const Container = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-bottom: none;
  margin: 20px;
`;

export default function SessionLogs(props: PropsType) {
  const { session, parentHeight } = props;

  return (
    <Container>
      <TabsLayout selected="Text Logs">
        <Tab name="Text Logs">
          <SessionTextLogs session={session} parentHeight={parentHeight} />
        </Tab>
        <Tab name="Device Logs">
          <SessionDeviceLogs session={session} parentHeight={parentHeight} />
        </Tab>
        <Tab name="Debug Logs">
          <SessionDebugLogs session={session} parentHeight={parentHeight} />
        </Tab>
        {session.is_completed && session.is_profiling_available && (
          <Tab name="App profiling">
            <Profiling session={session} parentHeight={parentHeight} />
          </Tab>
        )}
      </TabsLayout>
    </Container>
  );
}
