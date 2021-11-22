import React from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/github";

const Pre = styled.pre`
  text-align: left;
  margin: 5px 0;
  background: transparent !important;
`;

export default class CodeViewer extends React.Component<any, any> {
  render() {
    return (
      <Highlight
        {...defaultProps}
        theme={theme}
        code={this.props.code}
        language={this.props.language}
      >
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
      </Highlight>
    );
  }
}
