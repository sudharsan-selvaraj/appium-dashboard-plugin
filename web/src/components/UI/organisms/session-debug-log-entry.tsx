import React from "react";
import "./debug-log-entry.css";
import ArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Moment from "react-moment";
import CodeViewer from "../../../../../widgets/code-viewer/code-viewer";
import styled from "styled-components";
import { useState } from "react";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import Icon from "../atoms/icon";

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 2px;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div``;

const Time = styled.div`
  font-size: 11px;
  min-width: 150px;
  font-style: italic;
  color: grey;
`;

const Message = styled.div`
  font-size: 11px;
  margin-left: 15px;
`;

const Expand = styled.div``;

const CodeViewerWrapper = styled.div`
  width: 90%;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  border: 1px solid #ced8e1;
  background: #f9f9f9;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 5px;
  max-height: 200px;
  overflow: scroll;
`;

type PropsType = {
  entry: any;
};

export default function SessionDebugLogEntry(props: PropsType) {
  const { entry } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Container>
      <Header>
        <ParallelLayout>
          <Column grid={11}>
            <>
              <Time>
                <Moment format="DD-MM-YYYY HH:mm:ss">
                  {entry.timestamp}
                </Moment>
              </Time>
              <Message>
                {entry.message}
              </Message>
            </>
          </Column>
          <Column grid={11}>
            {entry.args && (
            <Expand>
              {isExpanded ? (
                <Icon name="arrow-up" onClick={() => setIsExpanded(false)} />
              ) : (
                <Icon name="arrow-down" onClick={() => setIsExpanded(false)} />
              )}
            </Expand>
          )}
          </Column>
        </ParallelLayout>
      </Header>
      <Content>
        {entry.args && isExpanded && (
          <CodeViewerWrapper>
            <CodeViewer
              code={JSON.stringify(entry.args, null, 2)}
              language={"json"}
            />
          </CodeViewerWrapper>
        )}          
      </Content>
    </Container>
  );
}
