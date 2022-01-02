import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  APP_HEADER_HEIGHT,
  SUB_APP_HEADER_HEIGHT,
} from "../../../constants/ui";
import Session from "../../../interfaces/session";
import {
  addPollingTask,
  removePollingTask,
} from "../../../store/actions/polling-actions";
import { fetchSessionTextLogs } from "../../../store/actions/session-actions";
import {
  getisTextLogsLoading,
  getTextLogs,
} from "../../../store/selectors/entities/logs-selector";
import { getHeaderStyle } from "../../../utils/ui";
import CheckBox from "../atoms/checkbox";
import Spinner from "../atoms/spinner";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import SerialLayout, { Row } from "../layouts/serial-layout";
import { TAB_HEADER_HEIGHT } from "../layouts/tab-layout";
import Centered from "../molecules/centered";
import EmptyMessage from "../molecules/empty-message";
import { SUMMARY_HEIGHT } from "./session-details";
import LogEntry from "./session-text-logs-entry";

function useLogs(showScreenShots: boolean, showExceptions: boolean) {
  const logs = useSelector(getTextLogs);

  return logs
    .filter((log: any) => !showExceptions || log.is_error)
    .map((log: any) => (
      <LogEntry key={log} entry={log} showScreenShots={showScreenShots} />
    ));
}

const Container = styled.div``;

const Header = styled.div`
  ${(props) => getHeaderStyle(props.theme)};
  padding: 16px 10px;
`;

const Content = styled.div``;

const HEADER_HEIGHT = 50;

type PropsType = {
  session: Session;
};

export default function SessionTextLogs(props: PropsType) {
  const { session } = props;
  const [showScreenShots, setShowScreenShots] = useState(false);
  const [showExceptions, setShowExceptions] = useState(false);
  const [enablePolling, setEnablePolling] = useState(true);
  const logs = useLogs(showScreenShots, showExceptions);
  const isLoading = useSelector(getisTextLogsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSessionTextLogs(session.session_id));
    if (enablePolling) {
      togglePolling(true);
    }

    return () => {
      togglePolling(false);
    };
  }, [session.session_id]);

  const togglePolling = useCallback(
    (on: boolean) => {
      if (on) {
        dispatch(addPollingTask(fetchSessionTextLogs(session.session_id)));
      } else {
        dispatch(removePollingTask(fetchSessionTextLogs(session.session_id)));
      }
      setEnablePolling(on);
    },
    [session.session_id],
  );

  if (isLoading) {
    return (
      <Centered>
        <Spinner />
      </Centered>
    );
  } else if (!logs.length) {
    return <EmptyMessage>No logs</EmptyMessage>;
  } else {
    return (
      <Container>
        <SerialLayout>
          <Row height={`${HEADER_HEIGHT}px`}>
            <Header>
              <ParallelLayout>
                <Column grid={2}>
                  <CheckBox
                    label="Show Images"
                    checked={showScreenShots}
                    onChange={(checked: boolean) => setShowScreenShots(checked)}
                  />
                </Column>
                <Column grid={2}>
                  <CheckBox
                    label="Show Errors Only"
                    checked={showExceptions}
                    onChange={(checked: boolean) => setShowExceptions(checked)}
                  />
                </Column>
                <Column grid={2}>
                  <CheckBox
                    label="enable polling"
                    checked={enablePolling}
                    onChange={(checked: boolean) => togglePolling(checked)}
                  />
                </Column>
              </ParallelLayout>
            </Header>
          </Row>
          <Row
            height={`calc(100vh - ${
              HEADER_HEIGHT +
              TAB_HEADER_HEIGHT +
              SUMMARY_HEIGHT +
              APP_HEADER_HEIGHT +
              SUB_APP_HEADER_HEIGHT
            }px)`}
            scrollable
          >
            <Content>{logs}</Content>
          </Row>
        </SerialLayout>
      </Container>
    );
  }
}
