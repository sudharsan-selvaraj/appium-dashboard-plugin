import React from "react";
import styled from "styled-components";
import TabsLayout, { Tab } from "../layouts/tab-layout";
import Session from "../../../interfaces/session";

const Container = styled.div`
  word-break: break-word;
  padding: 10px;
`;

const Entry = styled.div`
  width: 100%;
  display: flex;
  margin: 5px;
  margin-top: 15px;
`;

const Label = styled.div`
  min-width: 200px;
  font-weight: 600;
`;

const Value = styled.div`
  flex-wrap: wrap;
`;

const getCapabilityEntries = (tab: string, session: Session) => {
  const capabilityObject =
    tab == "Capabilities" ? session.capabilities : session.capabilities.desired;
  if (!capabilityObject) {
    return null;
  }

  return Object.keys(capabilityObject)
    .filter((k) => k != "desired" && capabilityObject[k] != "")
    .map((k) => {
      return (
        <Entry key={k}>
          <Label>{k}:</Label>
          <Value>
            {typeof capabilityObject[k] == "object" ||
            typeof capabilityObject[k] == "boolean"
              ? JSON.stringify(capabilityObject[k])
              : capabilityObject[k]}
          </Value>
        </Entry>
      );
    });
};

type Propstype = {
  session: Session;
};

export default function SessionCapabilityDetails(props: Propstype) {
  const { session } = props;
  return (
    <Container>
      <TabsLayout selected="Capabilities">
        <Tab name="Capabilities">
          <>{getCapabilityEntries("Capabilities", session)}</>
        </Tab>
        <Tab name="Desired Capabilities">
          <>{getCapabilityEntries("Desired Capabilities", session)}</>
        </Tab>
      </TabsLayout>
    </Container>
  );
}
