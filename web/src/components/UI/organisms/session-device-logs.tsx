import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../../../../widgets/spinner/spinner";
import Session from "../../../interfaces/session";
import { getDeviceLogs, getisDeviceLogsLoading, getisTextLogsLoading } from "../../../store/selectors/entities/logs-selector";
import "./text-logs.css";

const LogsEntry = styled.div``;

function useLogs(filterText: string) {
  const logs = useSelector(getDeviceLogs);

  return logs.filter((log: any) => log.message.indexOf(filterText) >= 0)
    .map((log: any) => (
      <LogsEntry key={log.message}>
        {log.message}
      </LogsEntry>
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
  const isLoading = useSelector(getisDeviceLogsLoading);

  if (isLoading) {
    return <Spinner />;
  } else {
    return (
      <Container>
        <Header>
          <input
            type="text"
            placeholder="Filter logs"
            onChange={(e) => setFilterText(e.target.value)}
            value={filterText}
          />
        </Header>
        <Content>
          {logs}
        </Content>
      </Container>
    );
  }
}
