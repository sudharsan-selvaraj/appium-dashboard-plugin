import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckBox from "../../../../widgets/check-box/checkbox";
import LogEntry from "../../../../widgets/log-entry/log-entry";
import Spinner from "../../../../widgets/spinner/spinner";
import Session from "../../../interfaces/session";
import { getisTextLogsLoading, getTextLogs } from "../../../store/selectors/entities/logs-selector";
import "./text-logs.css";


function useLogs(showScreenShots: boolean, showExceptions: boolean) {
  const logs = useSelector(getTextLogs);

  return logs.filter((log: any) => !showExceptions || log.is_error)
    .map((log: any) => (
      <LogEntry
        key={log}
        log={log}
        showScreenShots={showScreenShots}
      />
    ));
}

const Container = styled.div``;

const Header = styled.div``;

const Content = styled.div``;

type PropsType = {
  session: Session;
};

export default function SessionTextLogs(props: PropsType) {
  const { session } = props;
  const [showScreenShots, setShowScreenShots] = useState(false);
  const [showExceptions, setShowExceptions] = useState(false);
  const logs = useLogs(showScreenShots, showExceptions);
  const isLoading = useSelector(getisTextLogsLoading);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <Container>
        <Header>
          <CheckBox
            label="Show Images"
            checked={showScreenShots}
            onValueChanged={() => setShowScreenShots(true)}
          />
          <CheckBox
            label="Show Errors Only"
            checked={showExceptions}
            onValueChanged={() => setShowExceptions(true)}
          />
        </Header>
        <Content>
          {logs}
        </Content>
      </Container>
    );
  }
}
