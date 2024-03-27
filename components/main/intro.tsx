import { Box, Divider, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import PortfolioContext from "../../context/context";
import { useAppSelector } from "../../context/redux/hooks";
import Link from "next/link";

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
    transform: translateX(5%);
  }
  to {
    transform: translateX(0);
  }
`;
const slideToUpAnimation = keyframes`
  from {
    transform: translateY(-20%);
  }
  to {
    transform: translateY(0);
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
const IntroSectionReverse = styled.div<{ $isVisible: boolean }>`
  text-align: right;
  font-size: 2rem;
  transition: all 0.5s;
  animation: ${(props) =>
    props.$isVisible
      ? css`
          ${slideToLeftAnimation} 1s ease-in-out forwards
        `
      : "none"};
`;
const TitleSection = styled.div<{ $isVisible: boolean }>`
  font-size: 2rem;
  transition: all 0.5s;
  animation: ${(props) =>
    props.$isVisible
      ? css`
          ${slideToUpAnimation} 1s ease-in-out forwards
        `
      : "none"};
`;
const PageFrame = styled.div`
  opacity: 0;
  transition: all 0.5s;
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
  const { prefix }: any = useContext(PortfolioContext);
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 16 : 32;

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
      <Box sx={{ textAlign: "center" }}>
        <TitleSection $isVisible={isVisible}>
          <Typography
            style={{
              marginBottom: smallMode ? "0.2rem" : "0.5rem",
              fontSize: smallMode ? fontSize * 1.8 : fontSize * 1.3,
              fontWeight: "bold",
            }}
          >
            문제 해결을 위한 여정
          </Typography>
          <Typography
            fontSize={smallMode ? fontSize * 0.8 : fontSize * 0.5}
            style={{ marginBottom: smallMode ? "0.3rem" : "0" }}
          >
            ※ 기존 프로젝트를 보고싶다면?{" "}
            <Link href={"https://sonjuhy.github.io/MyHomeVer1/"}>
              <span
                style={{
                  color: "#5cd8e1",
                  fontSize: smallMode ? fontSize : fontSize * 0.5,
                }}
              >
                Click!
              </span>
            </Link>
          </Typography>
        </TitleSection>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div
          style={{
            width: "80%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="overline"
              fontSize={smallMode ? fontSize * 1.3 : fontSize}
            >
              Stability
            </Typography>
          </Box>
          <Box>
            <IntroSection $isVisible={isVisible}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: smallMode ? fontSize : fontSize * 1.1,
                }}
              >
                Unstable server status
              </Typography>
              <Typography
                style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
              >
                잦은 정전으로 인한 서버 불안정
              </Typography>
            </IntroSection>
            <IntroSectionReverse $isVisible={isVisible}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: smallMode ? fontSize : fontSize * 1.1,
                }}
              >
                Client-oriented programming
              </Typography>
              <Typography
                style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
              >
                클라이언트 위주 프로그래밍으로 인한 문제
              </Typography>
            </IntroSectionReverse>
            <IntroSection $isVisible={isVisible}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: smallMode ? fontSize : fontSize * 1.1,
                }}
              >
                Vulnerable Security
              </Typography>
              <Typography
                style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
              >
                어떠한 보안도 없던 위험한 상황
              </Typography>
            </IntroSection>
            <IntroSectionReverse $isVisible={isVisible}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: smallMode ? fontSize : fontSize * 1.1,
                }}
              >
                Expanding the size of the service
              </Typography>
              <Typography
                style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
              >
                서비스 확대에 대해 대응 필요
              </Typography>
            </IntroSectionReverse>
            <IntroSection $isVisible={isVisible}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: smallMode ? fontSize : fontSize * 1.1,
                }}
              >
                For Easy Maintenance
              </Typography>
              <Typography
                style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
              >
                유지 보수 및 업데이트가 까다로움
              </Typography>
            </IntroSection>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="overline"
              fontSize={smallMode ? fontSize * 1.3 : fontSize}
            >
              New Feature
            </Typography>
          </Box>

          <Box>
            <IntroSection $isVisible={isVisible}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: smallMode ? fontSize : fontSize * 1.1,
                }}
              >
                Lack Of Accessibility
              </Typography>
              <Typography
                style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
              >
                서비스 접근성이 안드로이드로 제한
              </Typography>
            </IntroSection>
            <IntroSectionReverse $isVisible={isVisible}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: smallMode ? fontSize : fontSize * 1.1,
                }}
              >
                Lack of detail in service
              </Typography>
              <Typography
                style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
              >
                유저 입장에서 서비스에 대한 디테일이 부족
              </Typography>
            </IntroSectionReverse>
            <IntroSection $isVisible={isVisible}>
              <Typography
                style={{
                  fontWeight: "bold",
                  fontSize: smallMode ? fontSize : fontSize * 1.1,
                }}
              >
                Difficulty Checking Logs
              </Typography>
              <Typography
                style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
              >
                로그를 관리하는 시스템이 필요
              </Typography>
            </IntroSection>
          </Box>
        </div>
      </Box>
    </PageFrame>
  );
}
