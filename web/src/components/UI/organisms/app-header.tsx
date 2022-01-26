import React from "react";
import styled from "styled-components";
import ParallelLayout, { Column } from "../layouts/parallel-layout";
import HeaderLogo from "../molecules/header-logo";

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

export default function AppHeader() {
  return (
    <Container>
      <ParallelLayout>
        <Column grid={3}>
          <HeaderLogo />
        </Column>
      </ParallelLayout>
    </Container>
  );
}
