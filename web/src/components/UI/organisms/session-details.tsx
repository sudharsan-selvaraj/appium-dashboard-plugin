import { Tab } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  APP_HEADER_HEIGHT,
  SUB_APP_HEADER_HEIGHT,
} from "../../../constants/ui";
import { getSelectedSession } from "../../../store/selectors/entities/sessions-selector";
import { getHeaderStyle } from "../../../utils/ui";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import SerialLayout, { Row } from "../layouts/serial-layout";
import TabsLayout from "../layouts/tab-layout";
import EmptyMessage from "../molecules/empty-message";
import SessionCapabilityDetails from "./session-capability-details";
import SessionLogs from "./session-logs";
import SessionSummary from "./session-summary";
import SessionVideo from "./session-video";

const Container = styled.div``;

const HEADER = styled.div`
  ${(props) => getHeaderStyle(props.theme)};
  padding: 14px 10px;
`;

const Name = styled.div`
  font-size: ${(props) => props.theme.fonts.size.XXL};
`;

export const SUMMARY_HEIGHT = 140;

type PropsType = any;

export default function SessionDetails(props: PropsType) {
  const session = useSelector(getSelectedSession);
  if (!session) {
    return <EmptyMessage>Select a Session</EmptyMessage>;
  }

  return (
    <Container>
      <SerialLayout>
        <Row height={`${SUB_APP_HEADER_HEIGHT}px`}>
          <HEADER>
            <ParallelLayout>
              <Column grid={11}>
                <Name>{session.session_id}</Name>
              </Column>
              <Column grid={1}>
                <div></div>
              </Column>
            </ParallelLayout>
          </HEADER>
        </Row>
        <Row height={`${SUMMARY_HEIGHT}px`}>
          <SessionSummary session={session} />
        </Row>
        <Row
          height={`calc(100vh - ${
            SUMMARY_HEIGHT + APP_HEADER_HEIGHT + SUB_APP_HEADER_HEIGHT
          }px)`}
        >
          <ParallelLayout>
            <Column grid={4} scrollable>
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
              <SessionLogs session={session} />
            </Column>
          </ParallelLayout>
        </Row>
      </SerialLayout>
    </Container>
  );
}
