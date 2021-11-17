import React from "react";
import "./session-info-card.css";
import Spinner from "../../widgets/spinner/spinner";
import SuccessIcon from "../../widgets/success-icon/success-icon";
import ErrorIcon from "../../widgets/error-icon/error-icon";
import PhoneAndroidSharpIcon from "@material-ui/icons/PhoneAndroidSharp";
import CommonUtils from "../../utils/common-utils";
import ios from "../../assets/ios.svg";
import android from "../../assets/android.svg";
import safari from "../../assets/safari.svg";
import styled from "styled-components";
import SerialLayout, { Row } from "../layouts/serial-layout";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import { useMemo } from "react";
import Session from "../../../interfaces/session";

const getStatusIcon = (is_completed: boolean, session_status: string) => {
  if (!is_completed) {
    return <Spinner />;
  } else if (session_status === "success") {
    return <SuccessIcon />;
  } else {
    return <ErrorIcon />;
  }
};

const getPlatformIcon = (platform_name: string) => {
  const os: string = platform_name.toLowerCase();
  return {
    android: <img src={android} />,
    ios: <img src={ios} />,
  }[os] as any;
}

const getBrowserIcon = (browser_name: string) => {
  const browser: string = browser_name.toLowerCase();
  return {
    safari: <img src={safari} />,
  }[browser] as any;
}

const Container = styled.div``;

const Name = styled.div``;

const PlatformVersion = styled.div``;

const DeviceName = styled.div``;

const StatusLabel = styled.div``;

const ExecutionTime = styled.div``;

type PropsType = {
  session: Session;
};

export default function SessionCard(props: PropsType) {
  const { session } = props;
  const { session_id, platform_version, device_name, start_time, session_status, is_completed } = session;
  const formattedStartTime = useMemo(() => {
    return CommonUtils.convertTimeToReadableFormat(
      new Date(start_time),
      new Date(),
    );
  }, [start_time]);
  return (
    <Container>
      <SerialLayout>
        <Row>
          <Name>
            {session_id}
          </Name>
        </Row>
        <Row>
          <ParallelLayout>
            <Column grid={3}>
              <PlatformVersion>
                {platform_version}
              </PlatformVersion>
            </Column>
            <Column grid={3}>
              <DeviceName>
                {device_name}
              </DeviceName>
            </Column>
            <Column grid={3}>
               {getStatusIcon(is_completed, session_status)}
            </Column>
          </ParallelLayout>
        </Row>
        <Row>
          <ParallelLayout>
            <Column grid={3}>
              <StatusLabel>
                {session_status}
              </StatusLabel>
            </Column>
            <Column grid={9}>
              <ExecutionTime>
                {formattedStartTime}
              </ExecutionTime>
            </Column>
          </ParallelLayout>
        </Row>
      </SerialLayout>
    </Container>
  );
}
