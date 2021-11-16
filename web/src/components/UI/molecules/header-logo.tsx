import React from "react";
import styled from "styled-components";
import Icon from "../atoms/icon";

const Container = styled.div`
  padding: 10px 10px;
`;

const Header = styled.h3``;

const IconContainer = styled.span`
  vertical-align: middle;
`;

const Title = styled.span`
  vertical-align: middle;
`;

export default function HeaderLogo() {
  return (
    <Container>
      <Header>
        <IconContainer>
          <Icon name="home" />
        </IconContainer>
        <Title>Dashboard</Title>
      </Header>
    </Container>
  );
}
