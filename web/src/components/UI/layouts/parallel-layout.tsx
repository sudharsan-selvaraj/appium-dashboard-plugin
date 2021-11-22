import { JSXElement } from "@babel/types";
import React from "react";
import styled from "styled-components";

const GIRD_SIZE = 100 / 12;
const ColumnContainer = styled.div<{
  grid: number;
  scrollable?: boolean;
  padding?: string;
}>`
  flex-basis: ${(props) => GIRD_SIZE * props.grid}%;
  width: ${(props) => GIRD_SIZE * props.grid}%;
  display: flex;
  height: 100%;
  ${(props) => (props.scrollable ? "overflow: auto" : "")};
  padding: ${(props) => props.padding};

  & > * {
    height: 100%;
    width: 100%;
  }
`;

type ColumnProps = {
  children: JSX.Element | null;
  className?: string;
  grid: number;
  scrollable?: boolean;
  padding?: string;
};

export function Column(props: ColumnProps) {
  const { children, className, grid, scrollable, padding } = props;
  return (
    <ColumnContainer
      className={className}
      grid={grid}
      scrollable={scrollable}
      padding={padding}
    >
      {children}
    </ColumnContainer>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

type ParallelLayoutType = {
  className?: string;
  children: JSX.Element[] | JSX.Element;
};

export default function ParallelLayout(props: ParallelLayoutType) {
  const { children, className } = props;
  return <Container className={className}>{children}</Container>;
}
