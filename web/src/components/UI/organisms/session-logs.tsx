import React from "react";
import styled from "styled-components";
import Session from "../../../interfaces/session";
import TabsLayout, { Tab } from "../layouts/tab-layout";

type PropsType = {
  session: Session;
};

export default function SessionLogs(props: PropsType) {
  const { session } = props;
  return (
    <TabsLayout>
      <Tab name="Text Logs">

      </Tab>
      <Tab name="Device Logs">
        
      </Tab>
      <Tab name="Debug Logs">
        
      </Tab>
    </TabsLayout>
  )
}
