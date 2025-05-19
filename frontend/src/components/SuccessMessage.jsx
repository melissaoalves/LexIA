import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  color: #2d2d2d;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
`;

export default function SuccessMessage() {
  return (
    <Container>
      <Title>Petição Inicial Pronta!</Title>
      <Description>
        Os dados foram processados e a petição está disponível para download.
      </Description>
    </Container>
  );
}