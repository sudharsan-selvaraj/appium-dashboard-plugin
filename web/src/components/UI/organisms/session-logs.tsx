import React from "react";
import styled from "styled-components";
import Session from "../../../interfaces/session";
import TabsLayout, { Tab } from "../layouts/tab-layout";
import SessionDebugLogs from "./session-debug-logs";
import SessionDeviceLogs from "./session-device-logs";
import SessionTextLogs from "./session-text-logs";

type PropsType = {
  session: Session;
};

export default function SessionLogs(props: PropsType) {
  const { session } = props;
  return (
    <TabsLayout selected="Debug Logs">
      <Tab name="Text Logs">
        <SessionTextLogs session={session} />
      </Tab>
      <Tab name="Device Logs">
        <SessionDeviceLogs session={session} />
      </Tab>
      <Tab name="Debug Logs">
        <SessionDebugLogs session={session} />
      </Tab>
    </TabsLayout>
  );
}
