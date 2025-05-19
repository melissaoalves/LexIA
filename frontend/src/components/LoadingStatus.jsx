import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const LoadingBar = styled.div`
  margin-top: 1rem;
  height: 10px;
  width: 100%;
  background-color: #eee;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 30%;
    background-color: #2d2d2d;
    animation: loadingAnim 1.2s infinite;
  }

  @keyframes loadingAnim {
    0% { left: -30%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }
`;

export default function LoadingStatus({ text }) {
  return (
    <Container>
      <Message>{text}</Message>
      <LoadingBar />
    </Container>
  );
}