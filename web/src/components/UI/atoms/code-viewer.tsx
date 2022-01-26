import React from "react";
import styled from "styled-components";
import Highlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";

const Pre = styled.pre`
  text-align: left;
  margin: 5px 0;
  background: transparent !important;

  & {
    .token-line {
      white-space: break-spaces;
      word-break: break-all;
    }
  }
`;

const Container = styled(Highlight)``;

type PropsType = {
  code: string;
  language: Language;
};

export default function CodeViewer(props: PropsType) {
  const { code, language } = props;

  return (
    <Container {...defaultProps} theme={theme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Container>
  );
}
