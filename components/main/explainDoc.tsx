import { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import PortfolioContext from "../../context/context";
import { useAppSelector } from "../../context/redux/hooks";
import { Box, Grid, Typography } from "@mui/material";

const PageFrame = styled.div`
  opacity: 0;
  transition: all 0.5s;
  height: 70vh;
`;
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
const ExplainDocSection = styled.div<{ $isVisible: boolean }>`
  font-size: 2rem;
  transition: all 0.5s;
  animation: ${(props) =>
    props.$isVisible
      ? css`
          ${slideToRightAnimation} 1s ease-in-out forwards
        `
      : "none"};
`;
const ExplainDocSectionReverse = styled.div<{ $isVisible: boolean }>`
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

export default function Home() {
  const { prefix }: any = useContext(PortfolioContext);
  const smallMode = useAppSelector((state) => state.page.smallMode);
  const fontSize = smallMode ? 16 : 32;

  const target = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target) {
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
    <PageFrame ref={target} style={{ marginTop: smallMode ? "3vh" : "5vh" }}>
      <TitleSection $isVisible={isVisible}>
        <Typography
          style={{
            marginBottom: smallMode ? "2rem" : "5rem",
            fontSize: smallMode ? fontSize * 1.8 : fontSize * 1.3,
            fontWeight: "bold",
          }}
          textAlign={"center"}
        >
          프로젝트 소개[기본]
        </Typography>
      </TitleSection>
      <ExplainDocSection $isVisible={isVisible}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <img
              src={`${prefix}/image/image/MockUpMobile.png`}
              width={smallMode ? 100 : 200}
              height={smallMode ? 100 : 200}
              alt={""}
              style={{ marginBottom: smallMode ? "2rem" : "0" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <ExplainDocSection
              $isVisible={isVisible}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: smallMode ? "80%" : "50%" }}>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: smallMode ? fontSize : fontSize * 1.1,
                  }}
                >
                  Project Type
                </Typography>
                <Typography
                  style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
                >
                  ▪ 개인 프로젝트
                </Typography>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: smallMode ? fontSize : fontSize * 1.1,
                  }}
                >
                  Period
                </Typography>
                <Typography
                  style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
                >
                  ▪ 2023.01 ~ 2023.07
                </Typography>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: smallMode ? fontSize : fontSize * 1.1,
                  }}
                >
                  Core Functions
                </Typography>
                <Typography>
                  ▪ 백엔드 리팩토링 (PHP → Spring Boot, Python → Django)
                </Typography>
                <Typography>▪ Docker 적용</Typography>
                <Typography>▪ 자동 CI/CD 적용 (with Jenkins)</Typography>
                <Typography>▪ Web 서비스 추가 (Next JS)</Typography>
                <Typography>▪ 클라이언트 위주 → 서버 위주 변경</Typography>
                <Typography>▪ 로그 시스템 구축</Typography>
                <Typography
                  style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
                >
                  ▪ Android UI & 레거시 코드 업데이트
                </Typography>
              </Box>
            </ExplainDocSection>
          </Grid>
        </Grid>
      </ExplainDocSection>
    </PageFrame>
  );
}
