import React from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  APP_HEADER_HEIGHT,
  SUB_APP_HEADER_HEIGHT,
} from "../../../constants/ui";
import { deleteSession } from "../../../store/actions/session-actions";
import { getSelectedSession } from "../../../store/selectors/entities/sessions-selector";
import { getHeaderStyle } from "../../../utils/ui";
import Icon from "../atoms/icon";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import SerialLayout, { Row } from "../layouts/serial-layout";
import EmptyMessage from "../molecules/empty-message";
import SessionCapabilityDetails from "./session-capability-details";
import SessionLogs from "./session-logs";
import SessionSummary from "./session-summary";
import SessionVideo from "./session-video";
import chroma from "chroma-js";
import Session from "../../../interfaces/session";

const Container = styled.div``;

const HEADER = styled.div`
  ${(props) => getHeaderStyle(props.theme)};
  padding: 14px 10px;
`;

const Name = styled.div`
  font-size: ${(props) => props.theme.fonts.size.XXL};
`;

const Delete = styled.div`
  position: relative;
  top: 2px;
  text-align: right;
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  border: 1px solid ${(props) => chroma(props.theme.colors.error).hex()};
  border-left: 5px solid ${(props) => chroma(props.theme.colors.error).hex()};
  background: ${(props) =>
    chroma(props.theme.colors.error).brighten(3.5).hex()};
  border-radius: ${(props) => props.theme.borderRadius.M};
  overflow: scroll;
  padding: 10px;
  margin: 0 15px 0 15px;
  z-index: 1;
`;

export const SUMMARY_HEIGHT = 120;
export const FAIL_MESSAGE_CONTAINER_HEIGHT = 100;

function hasSessionFailureMessage(session: Session) {
  return session.session_status === "FAILED" && session.session_status_message;
}

function getSessiobDetailsMainContainerHeight(session: Session) {
  return (
    SUMMARY_HEIGHT +
    APP_HEADER_HEIGHT +
    SUB_APP_HEADER_HEIGHT +
    (hasSessionFailureMessage(session) ? FAIL_MESSAGE_CONTAINER_HEIGHT : 0)
  );
}

export default function SessionDetails() {
  const session = useSelector(getSelectedSession);
  const dispatch = useDispatch();
  const onDelete = useCallback((id: string) => {
    dispatch(deleteSession(id));
  }, []);

  if (!session) {
    return <EmptyMessage>Select a Session</EmptyMessage>;
  }

  const MAIN_CONTENT_CONTAINER_HEIGHT =
    getSessiobDetailsMainContainerHeight(session);

  return (
    <Container>
      <SerialLayout>
        <Row height={`${SUB_APP_HEADER_HEIGHT}px`}>
          <HEADER>
            <ParallelLayout>
              <Column grid={11}>
                <Name>{session.name || session.session_id}</Name>
              </Column>
              <Column grid={1}>
                <Delete onClick={() => onDelete(session.session_id)}>
                  <Icon name="delete" />
                  &nbsp;Delete
                </Delete>
              </Column>
            </ParallelLayout>
          </HEADER>
        </Row>
        <Row height={`${SUMMARY_HEIGHT}px`}>
          <SessionSummary session={session} />
        </Row>
        {hasSessionFailureMessage(session) && (
          <Row height={`${FAIL_MESSAGE_CONTAINER_HEIGHT}px`} padding={"10px"}>
            <ErrorContainer>{session.session_status_message}</ErrorContainer>
          </Row>
        )}
        <Row height={`calc(100vh - ${MAIN_CONTENT_CONTAINER_HEIGHT}px)`}>
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
              <SessionLogs
                session={session}
                parentHeight={MAIN_CONTENT_CONTAINER_HEIGHT}
              />
            </Column>
          </ParallelLayout>
        </Row>
      </SerialLayout>
    </Container>
  );
}
