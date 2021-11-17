import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CheckBox from "../../../../widgets/check-box/checkbox";
import LogEntry from "../../../../widgets/log-entry/log-entry";
import Spinner from "../../../../widgets/spinner/spinner";
import Session from "../../../interfaces/session";
import { getDebugLogs, getisDebugLogsLoading } from "../../../store/selectors/entities/logs-selector";
import EmptyMessage from "../molecules/empty-message";
import "./text-logs.css";


function useLogs(filterText: string) {
  const logs = useSelector(getDebugLogs);

  return logs.filter((log: any) => log.message.indexOf(filterText) >= 0)
    .map((log: any) => (
      <DebugLogEntry key={log} log={log} />
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
  const [filterText, setFilterText] = useState("");
  const logs = useLogs(filterText);
  const isLoading = useSelector(getisDebugLogsLoading);

  if (isLoading) {
    return <Spinner />;
  } else if (!logs.length) {
    return (
      <EmptyMessage>No Logs available</EmptyMessage>
    );
  } else {
    return (
      <Container>
        <Header>
          <input
            type="text"
            placeholder="Filter logs"
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Header>
        <Content>
          {logs}
        </Content>
      </Container>
    );
  }
}
