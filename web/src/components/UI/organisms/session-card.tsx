import React from "react";
import styled from "styled-components";
import SerialLayout, { Row } from "../layouts/serial-layout";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import { useMemo } from "react";
import Session from "../../../interfaces/session";
import Icon, { Sizes } from "../atoms/icon";
import Spinner from "../atoms/spinner";
import CommonUtils from "../../../utils/common-utils";
import Centered from "../molecules/centered";
import { useHistory } from "react-router-dom";
import { getSessionDetailsUrl } from "../../../constants/routes";

const getStatusIcon = (is_completed: boolean, session_status: string) => {
  if (!is_completed) {
    return <Spinner />;
  } else if (session_status === "PASSED") {
    return <Icon name="success" size={Sizes.XXXL} />;
  } else {
    return <Icon name="error" size={Sizes.XXXL} />;
  }
};

const Container = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.greyscale[5]};
  }

  &.active {
    background-color: ${(props) => props.theme.colors.greyscale[5]};
  }
`;

const Name = styled.div`
  font-weight: 600;
`;

const PlatformVersion = styled.div``;

const DeviceName = styled.div``;

const StatusIcon = styled.div<{ status: string }>`
  color: ${(props) => {
    switch (props.status) {
      case "PASSED":
        return props.theme.colors.success;
      case "error":
      case "TIMEOUT":
        return props.theme.colors.error;
    }
  }};
`;

const StatusLabel = styled.div`
  color: ${(props) => props.theme.colors.success};
`;

const ExecutionTime = styled.div`
  color: ${(props) => props.theme.colors.greyscale[2]};
`;

type PropsType = {
  session: Session;
  selected: boolean;
};

export default function SessionCard(props: PropsType) {
  const { session } = props;
  const {
    session_id,
    platform_version,
    device_name,
    start_time,
    session_status,
    is_completed,
  } = session;
  const formattedStartTime = useMemo(() => {
    return CommonUtils.convertTimeToReadableFormat(
      new Date(start_time),
      new Date(),
    );
  }, [start_time]);
  const history = useHistory();

  return (
    <Container
      className={props.selected ? "active" : ""}
      onClick={() => {
        history.push(getSessionDetailsUrl(session_id));
      }}
    >
      <ParallelLayout>
        <Column grid={11}>
          <SerialLayout>
            <Row padding="10px 0px">
              <Name>{session_id}</Name>
            </Row>
            <Row padding="10px 0px">
              <ParallelLayout>
                <Column grid={3}>
                  <PlatformVersion>v{platform_version}</PlatformVersion>
                </Column>
                <Column grid={8}>
                  <DeviceName>{device_name}</DeviceName>
                </Column>
              </ParallelLayout>
            </Row>
            <Row padding="10px 0px">
              <ParallelLayout>
                <Column grid={3}>
                  <StatusLabel>{session_status}</StatusLabel>
                </Column>
                <Column grid={8}>
                  <ExecutionTime>{formattedStartTime}</ExecutionTime>
                </Column>
              </ParallelLayout>
            </Row>
          </SerialLayout>
        </Column>
        <Column grid={1}>
          <Centered>
            <StatusIcon status={session_status}>
              {getStatusIcon(is_completed, session_status)}
            </StatusIcon>
          </Centered>
        </Column>
      </ParallelLayout>
    </Container>
  );
}
