import { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import PortfolioContext from "../../context/context";
import { useAppSelector } from "../../context/redux/hooks";
import SvgPath from "../../public/image/svg/SvgPath";
import { Box, Grid, Paper, Stack, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";

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
const TargetSection = styled.div<{ $isVisible: boolean }>`
  font-size: 2rem;
  transition: all 0.5s;
  animation: ${(props) =>
    props.$isVisible
      ? css`
          ${slideToRightAnimation} 1s ease-in-out forwards
        `
      : "none"};
`;
const TargetSectionReverse = styled.div<{ $isVisible: boolean }>`
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
/**
 * 1. stability
 * 2. security
 * 3. maintenance
 */
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
    <PageFrame ref={target} style={{ marginTop: smallMode ? "10vh" : "15vh" }}>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <TitleSection
            $isVisible={isVisible}
            style={{ marginBottom: smallMode ? "0.2rem" : "3rem" }}
          >
            <Typography
              style={{
                fontSize: smallMode ? fontSize * 1.8 : fontSize * 1.3,
                fontWeight: "bold",
              }}
            >
              프로젝트 목표
            </Typography>
          </TitleSection>
        </Box>
        <Grid container>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <Paper
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                    height: smallMode ? "20vh" : "30vh",
                  }}
                  elevation={smallMode ? 8 : 12}
                >
                  <Stack>
                    <svg
                      id="puzzle"
                      xmlns="http://www.w3.org/2000/svg"
                      width={smallMode ? "120" : "150"}
                      height={smallMode ? "120" : "150"}
                      viewBox="0 0 24 24"
                    >
                      <path d={SvgPath.puzzlePath} />
                    </svg>
                    <Typography
                      style={{
                        marginTop: "1rem",
                        fontSize: smallMode ? fontSize * 1.5 : fontSize * 0.8,
                        fontWeight: "bold",
                      }}
                    >
                      안정성
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <Paper
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "80%",
                    height: smallMode ? "20vh" : "30vh",
                  }}
                  elevation={smallMode ? 8 : 12}
                >
                  <Stack>
                    <svg
                      id="security"
                      xmlns="http://www.w3.org/2000/svg"
                      width={smallMode ? "120" : "150"}
                      height={smallMode ? "120" : "150"}
                      viewBox="0 0 24 24"
                    >
                      <path d={SvgPath.securityPath} />
                    </svg>
                    <Typography
                      style={{
                        marginTop: "1rem",
                        fontSize: smallMode ? fontSize * 1.5 : fontSize * 0.8,
                        fontWeight: "bold",
                      }}
                    >
                      보안성
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <Paper
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: smallMode ? "90%" : "80%",
                    height: smallMode ? "20vh" : "30vh",
                  }}
                  elevation={smallMode ? 8 : 12}
                >
                  <Stack>
                    <svg
                      id="rebuilding"
                      width={smallMode ? "120" : "150"}
                      height={smallMode ? "120" : "150"}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d={SvgPath.rebuildingPath} />
                    </svg>
                    <Typography
                      style={{
                        marginTop: "1rem",
                        fontSize: smallMode ? fontSize * 1.5 : fontSize * 0.8,
                        fontWeight: "bold",
                      }}
                    >
                      유지보수
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </PageFrame>
  );
}
