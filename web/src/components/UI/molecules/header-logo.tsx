import React from "react";
import styled from "styled-components";
import Icon, { Sizes } from "../atoms/icon";

const Container = styled.div`
  padding: 12px 10px;
  border-right: 1px solid ${(props) => props.theme.colors.border};
`;

const Header = styled.h3``;

const IconContainer = styled.span`
  position: relative;
  top: 2px;
`;

const Title = styled.span`
  vertical-align: middle;
  font-size: 18px;
  margin-left: 10px;
  font-weight: 700;
`;

export default function HeaderLogo() {
  return (
    <Container>
      <Header>
        <IconContainer>
          <Icon name="home" size={Sizes.XL} />
        </IconContainer>
        <Title>Dashboard</Title>
      </Header>
    </Container>
  );
}
