import { useContext, useEffect, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import PortfolioContext from "../../context/context";
import { useAppSelector } from "../../context/redux/hooks";
import SvgPath from "../../public/image/svg/SvgPath";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Divider,
  Modal,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

const PageFrame = styled.div`
  opacity: 0;
  transition: all 0.5s;
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
const ExplainDevSection = styled.div<{ $isVisible: boolean }>`
  font-size: 2rem;
  transition: all 0.5s;
  animation: ${(props) =>
    props.$isVisible
      ? css`
          ${slideToRightAnimation} 1s ease-in-out forwards
        `
      : "none"};
`;
const ExplainDevSectionReverse = styled.div<{ $isVisible: boolean }>`
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

  const [fullScreen, setFullScreen] = useState(false);

  const closeImageModal = () => {
    setFullScreen(!fullScreen);
  };

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
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open={fullScreen}
        onClose={closeImageModal}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ textAlign: "right", backgroundColor: "#fff", padding: "1rem" }}
        >
          <IconButton aria-label="close" onClick={closeImageModal}>
            <CloseIcon />
          </IconButton>
          <img
            src={`${prefix}/image/image/log_structure.png`}
            style={{ maxHeight: "80vh", maxWidth: "80vw" }}
          />
        </Box>
      </Modal>
      <TitleSection $isVisible={isVisible}>
        <Typography
          style={{
            marginBottom: smallMode ? "2rem" : "5rem",
            fontSize: smallMode ? fontSize * 1.8 : fontSize * 1.3,
            fontWeight: "bold",
          }}
          textAlign={"center"}
        >
          프로젝트 소개[개발]
        </Typography>
      </TitleSection>
      <ExplainDevSection $isVisible={isVisible}>
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
              src={`${prefix}/image/image/MockUpNoteBook.png`}
              width={smallMode ? 200 : 300}
              height={smallMode ? 200 : 300}
              alt={""}
              style={{ marginBottom: smallMode ? "2rem" : "0" }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <ExplainDevSection
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
                  Skill Set
                </Typography>
                <Grid
                  container
                  style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
                >
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Typography>▪ Spring Boot</Typography>
                    <Typography>▪ JWT</Typography>
                    <Typography>▪ Kafka(zookeeper)</Typography>
                    <Typography>▪ MariaDB</Typography>
                    <Typography>▪ MongoDB</Typography>
                    <Typography>▪ Docker</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Typography>▪ Spring Security</Typography>
                    <Typography>▪ JPA</Typography>
                    <Typography>▪ MQTT</Typography>
                    <Typography>▪ NextJS</Typography>
                    <Typography>▪ Jenkins</Typography>
                  </Grid>
                </Grid>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: smallMode ? fontSize : fontSize * 1.1,
                  }}
                >
                  Environment & IDE
                </Typography>
                <Grid
                  container
                  style={{ marginBottom: smallMode ? "1.3rem" : "0.5rem" }}
                >
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Typography>▪ Ubuntu 20.04 LTS</Typography>
                    <Typography>▪ ESP8266</Typography>
                    <Typography>▪ Intelli J</Typography>
                    <Typography>▪ PyCharm</Typography>
                    <Typography>▪ Android Studio</Typography>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6}>
                    <Typography>▪ Android SDK 34</Typography>
                    <Typography>▪ Nginx</Typography>
                    <Typography>▪ VSC</Typography>
                    <Typography>▪ Arduino</Typography>
                  </Grid>
                </Grid>
                <Typography
                  style={{
                    fontWeight: "bold",
                    fontSize: smallMode ? fontSize : fontSize * 1.1,
                  }}
                >
                  Structure
                </Typography>
                <Typography style={{ marginBottom: "0.5rem" }}>
                  ※ 클릭시 확대됩니다.
                </Typography>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeImageModal}
                  style={{ cursor: "pointer" }}
                >
                  <Paper style={{ padding: "1rem" }}>
                    <img
                      src={`${prefix}/image/image/log_structure.png`}
                      width={smallMode ? 300 : 500}
                      height={smallMode ? 300 : 500}
                      alt={""}
                    />
                  </Paper>
                </motion.div>
              </Box>
            </ExplainDevSection>
          </Grid>
        </Grid>
      </ExplainDevSection>
    </PageFrame>
  );
}
