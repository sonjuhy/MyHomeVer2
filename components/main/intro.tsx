import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const slideToRightAnimation = keyframes`
  from {
    transform: translateX(-3%);
  }
  to {
    transform: translateX(0);
  }
`;
const slideToLeftAnimation = keyframes`
  from {
    transform: translateX(-3%);
  }
  to {
    transform: translateX(0);
  }
`;
const IntroSection = styled.div<{ $isVisible: boolean }>`
  font-size: 2rem;
  transition: all 0.5s;
  animation: ${(props) =>
    props.$isVisible
      ? css`
          ${slideToRightAnimation} 1s ease-in-out forwards
        `
      : "none"};
`;
const PageFrame = styled.div`
  opacity: 0,
  transition: all 0.5s,
`;

const Trapezoid = styled.div`
  height: 100%;
  background-image: linear-gradient(135deg, #111 0%, #001 100%);
  color: white;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);

  @media (prefers-color-scheme: dark) {
    background-image: linear-gradient(135deg, #eef 0%, #eee 100%);
    color: black;
  }
`;

/**
 * 서비스 안정화 하는 이유
 * 1. 서버 정전 너무 잦음
 * 2. api 및 코드 변경 필요시 클라이언트 위주 프로그래밍은 안좋음
 * 3. 보안이 너무 취약함
 * 4. 서비스 규모가 커짐에 따라 대응 필요
 * 5. 이런 내용들을 업데이트할때 좀 더 쉽게 하고싶음
 * 기능 추가
 * 1. 웹 서비스 추가
 *
 */
export default function Home() {
  const target = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(
        ([e]) => {
          const target = e.target as HTMLElement;
          if (e.isIntersecting) {
            target.style.opacity = "1";
            setIsVisible(true);
          } else {
            target.style.opacity = "0";
            setIsVisible(false);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(target.current as Element);
    }
  }, [target]);
  return (
    <PageFrame ref={target}>
      <Typography>문제 해결을 위한 여정</Typography>
      <Typography>기존 프로젝트를 보고싶다면?</Typography>
      <IntroSection $isVisible={isVisible}>
        <p>Intro Section2</p>
      </IntroSection>
      <IntroSection $isVisible={isVisible}>
        <p>Intro Section3</p>
      </IntroSection>
    </PageFrame>
  );
}
