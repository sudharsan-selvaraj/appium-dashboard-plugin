import { Tab } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedSession } from "../../../store/selectors/entities/sessions-selector";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import SerialLayout, { Row } from "../layouts/serial-layout";
import TabsLayout from "../layouts/tab-layout";
import SessionCapabilityDetails from "./session-capability-details";
import SessionLogs from "./session-logs";
import SessionSummary from "./session-summary";
import SessionVideo from "./session-video";

const Container = styled.div``;

type PropsType = {

};

export default function SessionDetails(props: PropsType) {
  const session = useSelector(getSelectedSession);
  
  if (!session) {
    return null;
  }

  return (
    <Container>
      <SerialLayout>
        <Row>
          <SessionSummary session={session} />
        </Row>
        <Row>
          <ParallelLayout>
            <Column grid={4}>
              <SerialLayout>
                <Row>
                  <SessionVideo session={session} />
                </Row>
                <Row>
                  <SessionCapabilityDetails session={session} />
                </Row>
              </SerialLayout>
            </Column>
            <Column grid={8}>
              <SessionLogs session={session}/>
            </Column>
          </ParallelLayout>
        </Row>
      </SerialLayout>
    </Container>
  );
}
