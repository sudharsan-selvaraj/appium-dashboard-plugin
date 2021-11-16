import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Centered = styled.div``;

type PropsType = {
  children: string | JSX.Element;
};

export default function Banner(props: PropsType) {
  const { children } = props;
  return (
    <Container>
      <Centered>
        {children}
      </Centered>
    </Container>
  );
}
