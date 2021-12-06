import { Tab } from "@material-ui/core";
import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
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

const Delete = styled.div`
  position: relative;
  top: 2px;
  text-align: right;
  cursor: pointer;
`;

const StyledColumn = styled(Column)`
  border-right: 1px solid ${(props) => props.theme.colors.border};
`;

export const SUMMARY_HEIGHT = 140;

type PropsType = any;

export default function SessionDetails(props: PropsType) {
  const session = useSelector(getSelectedSession);
  const dispatch = useDispatch();
  const onDelete = useCallback((id: string) => {
    dispatch(deleteSession(id));
  }, []);

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
        <Row
          height={`calc(100vh - ${
            SUMMARY_HEIGHT + APP_HEADER_HEIGHT + SUB_APP_HEADER_HEIGHT
          }px)`}
        >
          <ParallelLayout>
            <StyledColumn grid={4} scrollable>
              <SerialLayout>
                <Row>
                  <SessionVideo session={session} />
                </Row>
                <Row>
                  <SessionCapabilityDetails session={session} />
                </Row>
              </SerialLayout>
            </StyledColumn>
            <Column grid={8}>
              <SessionLogs session={session} />
            </Column>
          </ParallelLayout>
        </Row>
      </SerialLayout>
    </Container>
  );
}
