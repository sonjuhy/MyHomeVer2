import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const slideRightAnimation = keyframes`
  from {
    transform: translateX(-3%);
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const WelcomeSection = styled.div`
  margin-top: 400px;
  height: 100vh;
  text-align: center;
  font-size: 2rem;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
  animation: ${slideRightAnimation} 1.5s ease-in-out forwards;
`;

export default function Home() {
  return (
    <WelcomeSection>
      <p>Welcome Section</p>
    </WelcomeSection>
  );
}
