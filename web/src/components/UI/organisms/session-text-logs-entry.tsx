import React from "react";
import styled from "styled-components";
import { useState } from "react";
import SerialLayout, { Row } from "../layouts/serial-layout";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import Icon from "../atoms/icon";
import CommonUtils from "../../../utils/common-utils";
import CodeViewer from "../atoms/code-viewer";
import chroma from "chroma-js";

const ParamsContainer = styled.div`
  border: 1px solid ${(props) => props.theme.colors.border};
  background: ${(props) => props.theme.colors.greyscale[5]};
  padding: 15px 15px 5px;
  margin: 25px 0px 15px 0px;
  max-height: 200px;
  overflow: auto;
  border-radius: ${(props) => props.theme.borderRadius.M};
`;

const ParamsTitle = styled.div`
  padding-bottom: 10px;
  font-size: 11px;
  color: grey;
  font-weight: 900;
  text-transform: uppercase;
`;

const ErrorContainer = styled(ParamsContainer)`
  border: 1px solid ${(props) => chroma(props.theme.colors.error).hex()};
  border-left: 5px solid ${(props) => chroma(props.theme.colors.error).hex()};
  background: ${(props) => chroma(props.theme.colors.error).brighten(3).hex()};

  & .text-log-params-json-entry-key {
    text-transform: capitalize;
  }
`;

const StringValue = styled.div`
  font-size: 12px;
  padding-bottom: 10px;
`;

const JsonValue = styled(StringValue)``;

const JsonEntryKey = styled(StringValue)``;

const JsonEntryValue = styled(StringValue)``;

const ParamsJsonRow = styled.div`
  display: flex;
  align-items: center;
`;

function getLogBody(logTitle: string, logBody: any) {
  if (logBody.type == "string" || logBody.value == null) {
    return (
      <ParamsContainer>
        <ParamsTitle>{logTitle}</ParamsTitle>
        <StringValue>
          {logBody.value != null ? logBody.value.toString() : "null"}
        </StringValue>
      </ParamsContainer>
    );
  } else if (Array.isArray(logBody.value)) {
    return (
      <ParamsContainer>
        <ParamsTitle>{logTitle}</ParamsTitle>
        <JsonValue>
          <CodeViewer
            code={JSON.stringify(logBody.value, null, 2)}
            language="json"
          />
        </JsonValue>
      </ParamsContainer>
    );
  } else if (logBody.type == "error") {
    return (
      <ErrorContainer>
        <JsonEntryKey>{logBody.value.error}:</JsonEntryKey>
        <JsonValue>{logBody.value.message}</JsonValue>
      </ErrorContainer>
    );
  } else {
    return (
      <ParamsContainer>
        <ParamsTitle>{logTitle}</ParamsTitle>
        {React.Children.toArray(
          Object.keys(logBody.value).map((k) => {
            return (
              <ParamsJsonRow key={k}>
                <JsonEntryKey>{k}:</JsonEntryKey>
                <JsonEntryValue>{logBody.value[k].toString()}</JsonEntryValue>
              </ParamsJsonRow>
            );
          }),
        )}
      </ParamsContainer>
    );
  }
}

function getDuration(entry: any) {
  if (!entry.start_time || !entry.end_time) {
    return "";
  } else {
    const time = CommonUtils.convertTimeToReadableFormat(
      new Date(entry.start_time),
      new Date(entry.end_time),
    )
      .replace(/hrs|hr/g, "h")
      .replace(/mins|min/g, "m")
      .replace(/secs|sec/g, "s");
    return time;
  }
}

const Container = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const Title = styled.div``;

const TitleInfo = styled.div`
  color: ${(props) => props.theme.colors.greyscale[3]};
  font-weight: ${(props) => props.theme.fonts.weight.L};
  letter-spacing: -0.2px;
`;

const Time = styled.div`
  color: ${(props) => props.theme.colors.greyscale[3]};
`;

const TimeText = styled.span`
  margin-left: 10px;
`;

const Expand = styled.div`
  text-align: right;
  cursor: pointer;
`;

const ScreenshotLink = styled.a`
  padding: 15px;
  display: flex;
  margin-right: auto;
  cursor: pointer;
`;

const Screenshot = styled.img`
  max-width: 300px;
  max-height: 600px;
  height: auto;
`;

type PropsType = {
  entry: any;
  showScreenShots: boolean;
};

export default function LogEntry(props: PropsType) {
  const [expanded, setExpanded] = useState(false);
  const { entry, showScreenShots } = props;
  return (
    <Container onClick={() => setExpanded(!expanded)}>
      <SerialLayout>
        <Row>
          <ParallelLayout>
            <Column grid={4}>
              <Title>{entry.title}</Title>
            </Column>
            <Column grid={4}>
              <TitleInfo>{entry.title_info}</TitleInfo>
            </Column>
            <Column grid={3}>
              {getDuration(entry) != "" ? (
                <Time>
                  <Icon name="time" />
                  <TimeText>{getDuration(entry)}</TimeText>
                </Time>
              ) : null}
            </Column>
            <Column grid={1}>
              {!!entry.params ? (
                <Expand>
                  {expanded ? (
                    <Icon name="arrow-up" onClick={() => setExpanded(false)} />
                  ) : (
                    <Icon name="arrow-down" onClick={() => setExpanded(true)} />
                  )}
                </Expand>
              ) : null}
            </Column>
          </ParallelLayout>
        </Row>
        {entry.response != null ? (
          <Row>{getLogBody("Response", entry.response)}</Row>
        ) : null}
        {entry.params != null && expanded ? (
          <Row>{getLogBody("Params", entry.params)}</Row>
        ) : null}

        {showScreenShots && entry.screen_shot != null ? (
          <Row>
            <ScreenshotLink
              target="blank"
              href={CommonUtils.getScreenshotForLog(
                entry.session_id,
                entry.log_id,
              )}
            >
              <Screenshot
                src={CommonUtils.getScreenshotForLog(
                  entry.session_id,
                  entry.log_id,
                )}
              />
            </ScreenshotLink>
          </Row>
        ) : null}
      </SerialLayout>
    </Container>
  );
}
